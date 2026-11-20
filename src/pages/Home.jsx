import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CHANNEL_URL } from "../components/Layout";
import sunconure from "../assets/sun conure.jpg";
import cockatiel from "../assets/Cockatiel.jpg";
import lovebirds from "../assets/lovebirds.jpg";

/* ------------------------------------------------------------------
   EDIT THESE

   CHANNEL_ID   Starts with "UC". On YouTube: your channel > About >
                Share channel > Copy channel ID. Shows ALL your uploads
                and updates by itself when you post new videos.

   GALLERY      Three ways to add photos:
                1. Use the "Add photos" button on the page (saved in
                   THIS browser only, see the note under the button).
                2. Put files in  src/assets/gallery/  (shown to everyone).
                3. Edit FALLBACK_GALLERY below.
------------------------------------------------------------------- */
const CHANNEL_ID = ""; // e.g. "UCxxxxxxxxxxxxxxxxxxxxxx"
const UPLOADS_PLAYLIST = CHANNEL_ID ? `UU${CHANNEL_ID.slice(2)}` : null;

/* Videos to show. The ID is the part after "v=" in a YouTube link.
   Add more IDs to this list and they appear as clickable thumbnails. */
const VIDEO_IDS = ["JutuOWbaIYU"];

const folderModules = import.meta.glob(
  "../assets/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" }
);
const FALLBACK_GALLERY = [sunconure, lovebirds, cockatiel];
const FOLDER_PHOTOS = (
  Object.keys(folderModules).length ? Object.values(folderModules) : FALLBACK_GALLERY
).map((src, i) => ({ id: `file-${i}`, src, alt: `Bird photo ${i + 1}`, uploaded: false }));

const BIRDS = [
  { name: "Sun Conure", description: "Bright, playful and affectionate parrots with big personalities.", image: sunconure },
  { name: "Cockatiel", description: "Friendly, gentle and intelligent birds that make great companions.", image: cockatiel },
  { name: "Lovebirds", description: "Social, cheerful little parrots known for their strong bonds.", image: lovebirds },
];

const CARE_TOPICS = [
  { title: "Food", text: "What a balanced bird diet looks like.", to: "/care-guide#food" },
  { title: "Home", text: "Cage size, perches and safe spots.", to: "/care-guide#housing" },
  { title: "Cleaning", text: "Keep cages and toys fresh.", to: "/care-guide#hygiene" },
  { title: "Health", text: "Warning signs and when to see a vet.", to: "/care-guide#health" },
];

/* ---------------- Photos you add yourself (saved in this browser) ---------------- */
const DB_NAME = "aviery-photos";
const STORE = "photos";

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () =>
      req.result.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function run(mode, action) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const request = action(t.objectStore(STORE));
    t.oncomplete = () => resolve(request?.result);
    t.onerror = () => reject(t.error);
  });
}

function useUploadedPhotos() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const rows = (await run("readonly", (s) => s.getAll())) || [];
      setPhotos((old) => {
        old.forEach((p) => URL.revokeObjectURL(p.src));
        return rows.reverse().map((r) => ({
          id: `up-${r.id}`,
          dbId: r.id,
          src: URL.createObjectURL(r.blob),
          alt: r.name || "Uploaded photo",
          uploaded: true,
        }));
      });
    } catch {
      setError("Photo uploads aren't available in this browser.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const add = async (fileList) => {
    setError("");
    const files = [...fileList].filter((f) => f.type.startsWith("image/"));
    if (!files.length) return setError("Please choose image files (JPG, PNG or WebP).");
    try {
      for (const f of files) await run("readwrite", (s) => s.add({ blob: f, name: f.name }));
      await load();
    } catch {
      setError("Couldn't save those photos. Try fewer or smaller files.");
    }
  };

  const remove = async (dbId) => {
    await run("readwrite", (s) => s.delete(dbId));
    await load();
  };

  return { photos, add, remove, error };
}

/* ------------------------------ Lightbox ------------------------------ */
function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-forest/85 p-4"
      onClick={onClose}
    >
      <div className="relative max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.alt} className="max-h-[85vh] rounded-2xl object-contain" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-linen/90 text-lg transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

/* -------------------------------- Page -------------------------------- */
export default function Home() {
  const [openPhoto, setOpenPhoto] = useState(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const { photos: uploaded, add, remove, error } = useUploadedPhotos();
  const gallery = [...uploaded, ...FOLDER_PHOTOS];

  const btnPrimary =
    "inline-block rounded-full bg-forest px-7 py-3.5 font-medium text-linen transition hover:bg-moss focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf";
  const btnSecondary =
    "inline-block rounded-full border border-forest/25 px-7 py-3.5 font-medium transition hover:border-forest hover:bg-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf";

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden px-6 pb-24 pt-36 lg:pt-44">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-sage/60" />
        <div aria-hidden="true" className="absolute -bottom-32 left-[-6rem] h-80 w-80 rounded-full bg-sand" />

        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            A little world made for birds.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-forest/80 md:text-xl">
            Meet our birds, watch their daily life on video, and learn how to
            keep your own feathered friends happy and healthy.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href="#birds" className={btnPrimary}>Meet the birds</a>
            <Link to="/care-guide" className={btnSecondary}>Read the care guide</Link>
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="bg-forest px-6 py-24 text-linen">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Learn about birds, care for them, enjoy them.
          </h2>
          <p className="mt-6 text-lg leading-8 text-linen/80">
            Aviery is a home for bird lovers. Find out about different species,
            understand what they need, and share the small moments that make
            life with birds so special.
          </p>
        </div>
      </section>

      {/* ============ BIRDS ============ */}
      <section id="birds" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="font-display text-4xl font-semibold md:text-5xl">Meet our birds</h2>
            <p className="mt-3 max-w-xl text-lg text-forest/75">A few of the birds you'll find at Aviery.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {BIRDS.map((bird) => (
              <article key={bird.name} className="overflow-hidden rounded-3xl bg-white/60 ring-1 ring-forest/10">
                <img src={bird.image} alt={bird.name} className="h-72 w-full object-cover" />
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold">{bird.name}</h3>
                  <p className="mt-2 leading-7 text-forest/75">{bird.description}</p>
                  <Link
                    to={`/care-guide#${bird.name.toLowerCase().replace(" ", "-")}`}
                    className="mt-4 inline-block font-medium text-moss underline-offset-4 hover:underline"
                  >
                    Care tips
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VIDEOS ============ */}
      <section id="videos" className="bg-sand px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-display text-4xl font-semibold md:text-5xl">From our YouTube channel</h2>
              <p className="mt-3 max-w-xl text-lg text-forest/75">
                Daily routines, feeding, health tips and lots of lovebirds.
              </p>
            </div>
            <a href={CHANNEL_URL} target="_blank" rel="noreferrer" className={btnPrimary}>
              Subscribe on YouTube
            </a>
          </div>

          <div className="aspect-video overflow-hidden rounded-3xl bg-forest shadow-xl shadow-forest/10">
            {VIDEO_IDS.length > 0 ? (
              <iframe
                key={VIDEO_IDS[activeVideo]}
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_IDS[activeVideo]}?rel=0`}
                title="Aviery video"
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : UPLOADS_PLAYLIST ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${UPLOADS_PLAYLIST}&rel=0`}
                title="Aviery YouTube videos"
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-linen">
                <p className="font-display text-2xl">Add a video ID to show your videos here</p>
                <a href={CHANNEL_URL} target="_blank" rel="noreferrer" className="mt-2 rounded-full bg-linen px-6 py-2.5 font-medium text-forest">
                  Open the channel
                </a>
              </div>
            )}
          </div>

          {VIDEO_IDS.length > 1 && (
            <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {VIDEO_IDS.map((id, i) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setActiveVideo(i)}
                    aria-label={`Play video ${i + 1}`}
                    aria-current={i === activeVideo}
                    className={`block w-full overflow-hidden rounded-2xl ring-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf ${
                      i === activeVideo ? "ring-moss" : "ring-transparent hover:ring-leaf"
                    }`}
                  >
                    <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt="" className="aspect-video w-full object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section id="gallery" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="font-display text-4xl font-semibold md:text-5xl">Photo gallery</h2>
              <p className="mt-3 text-lg text-forest/75">Tap any photo to see it bigger.</p>
            </div>

            <div className="md:max-w-sm md:text-right">
              <label className={`${btnPrimary} cursor-pointer focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-leaf`}>
                Add photos
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => {
                    add(e.target.files);
                    e.target.value = "";
                  }}
                />
              </label>
              <p className="mt-3 text-sm leading-6 text-forest/65">
                Photos you add are saved in this browser only. To show photos to
                every visitor, put the files in src/assets/gallery/.
              </p>
              {error && <p role="alert" className="mt-2 text-sm font-medium text-red-800">{error}</p>}
            </div>
          </div>

          <div className="columns-2 gap-4 md:columns-3">
            {gallery.map((photo) => (
              <div key={photo.id} className="group relative mb-4">
                <button
                  type="button"
                  onClick={() => setOpenPhoto(photo)}
                  className="block w-full overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="h-auto w-full transition duration-500 group-hover:scale-[1.03]"
                  />
                </button>
                {photo.uploaded && (
                  <button
                    type="button"
                    onClick={() => remove(photo.dbId)}
                    aria-label={`Remove ${photo.alt}`}
                    className="absolute right-2 top-2 rounded-full bg-linen/95 px-3 py-1 text-sm font-medium opacity-100 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-leaf md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CARE ============ */}
      <section id="care" className="bg-sage/60 px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
              Happy birds need proper care.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-forest/80">
              The basics of keeping your birds healthy, comfortable and entertained.
            </p>
            <Link to="/care-guide" className={`${btnPrimary} mt-8`}>Read the care guide</Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {CARE_TOPICS.map((item) => (
              <Link key={item.title} to={item.to} className="rounded-2xl bg-linen p-6 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-moss">
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-forest/75">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-moss px-8 py-16 text-center text-linen">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">Let's talk birds.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-linen/85">
            Looking for a feathered companion, or just curious? Send us a
            message and we'll get back to you.
          </p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-linen px-8 py-3.5 font-medium text-forest transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-linen"
          >
            Message us on YouTube
          </a>
        </div>
      </section>

      <Lightbox item={openPhoto} onClose={() => setOpenPhoto(null)} />
    </main>
  );
}