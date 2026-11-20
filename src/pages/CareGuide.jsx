import { Link } from "react-router-dom";

/* All care content lives in these arrays, so it's easy to edit. */

const SECTIONS = [
  {
    id: "food",
    title: "Food and water",
    intro:
      "Most of a pet parrot's diet should be good-quality pellets, topped up with fresh vegetables and a little fruit. Seeds are fatty, so treat them as a snack rather than the main meal.",
    points: [
      "Aim for pellets to make up around half or more of the daily diet.",
      "Offer fresh vegetables every day: leafy greens, carrot, broccoli, bell pepper and cooked sweet potato are good choices.",
      "Fruit is a treat. Apple (without seeds), berries and melon work well.",
      "Offer seeds and nuts sparingly, as rewards or for foraging.",
      "Change water at least once a day, and any time it gets dirty.",
      "Switch a seed-only bird to pellets slowly, over weeks. Birds can be very stubborn about new food, and some will refuse to eat if changed too fast.",
      "Wash all fresh food well and remove uneaten fresh food before it spoils.",
    ],
  },
  {
    id: "housing",
    title: "Cage and home",
    intro:
      "Buy the biggest cage you can fit. Your bird should be able to spread its wings fully and move around without touching the sides.",
    points: [
      "Choose bar spacing that suits your species. Small birds can get their heads stuck in bars that are too wide.",
      "Offer perches of different widths and materials so feet get exercise. Avoid sandpaper perch covers.",
      "Place the cage in a quiet, social room of the house, away from the kitchen, direct sunlight, and heating or cooling vents.",
      "Avoid drafts and sudden temperature changes.",
      "Put food and water dishes where droppings can't fall into them.",
    ],
  },
  {
    id: "sleep",
    title: "Sleep and daily routine",
    intro:
      "Birds need a lot of dark, quiet sleep, usually around 10 to 12 hours a night. Tired birds can become noisy, grumpy and more prone to illness.",
    points: [
      "Keep a regular bedtime and cover the cage, or move the bird to a dark, quiet room.",
      "Close the curtains so streetlights and night lights don't wake your bird.",
      "Give daily time out of the cage in a bird-safe room, so your bird can fly and stretch.",
      "Spend time with your bird every day. Parrots are social and bond with their people.",
    ],
  },
  {
    id: "enrichment",
    title: "Play and enrichment",
    intro: "A bored bird can start screaming, chewing feathers or becoming aggressive. Variety keeps their minds busy.",
    points: [
      "Provide safe chew toys made of untreated wood, paper or palm leaves, and replace them when worn.",
      "Rotate toys every week or two so they stay interesting.",
      "Hide treats in foraging toys or wrapped in paper so your bird has to work for them.",
      "Talk, sing and train with positive rewards. Short daily sessions work best.",
    ],
  },
  {
    id: "hygiene",
    title: "Cleaning",
    intro: "A clean cage prevents bacteria, mould and parasites. Little and often is easier than one huge clean.",
    points: [
      "Daily: replace cage paper, wash food and water dishes, and remove spoiled food.",
      "Weekly: wash perches and toys, and wipe down the cage bars and tray.",
      "Regularly: do a deeper clean of the whole cage with a bird-safe cleaner, then rinse and dry fully.",
      "Never use strong-smelling household sprays or cleaners near your bird.",
      "Offer a shallow bath or a gentle mist of clean water. Many birds enjoy it and it helps feather condition.",
    ],
  },
];

const SAFE_FOODS = [
  "Leafy greens (kale, spinach, bok choy)",
  "Carrot, broccoli, cooked sweet potato",
  "Bell pepper and chilli (birds don't feel the heat)",
  "Apple without seeds or core, berries, melon",
  "Cooked brown rice, quinoa, plain cooked beans",
  "Good-quality pellets for your species",
];

const TOXIC_FOODS = [
  "Avocado",
  "Chocolate",
  "Caffeine (tea, coffee, energy drinks)",
  "Alcohol",
  "Onion and garlic",
  "Apple seeds and fruit pits",
  "Very salty or fatty foods",
  "Anything containing xylitol",
];

const HAZARDS = [
  ["Non-stick cookware", "Fumes from overheated Teflon (PTFE) pans can kill birds quickly. Avoid non-stick pans, or keep birds far from the kitchen."],
  ["Smoke and sprays", "Cigarette smoke, aerosols, incense, scented candles and plug-in air fresheners can damage a bird's delicate lungs."],
  ["Cleaning products", "Bleach, ammonia, oven cleaner, paint, glue and nail polish remover give off harmful fumes."],
  ["Kitchens and fans", "Keep birds out of the kitchen when cooking, and make sure ceiling fans are off when they are out of the cage."],
  ["Windows, doors, mirrors", "Close windows and doors before out-of-cage time. Birds can fly into glass or escape in seconds."],
  ["Cords and small objects", "Chewed electrical cords and swallowed small parts are dangerous. Supervise free time."],
];

const WARNING_SIGNS = [
  "Fluffed-up feathers with sleepiness or low energy",
  "Sitting on the cage floor",
  "Breathing with an open beak, tail bobbing or noisy breathing",
  "Discharge from the eyes or nostrils",
  "Bleeding or an injury",
  "Not eating for a day or more",
  "A big change in droppings",
];

const SPECIES = [
  {
    id: "sun-conure",
    name: "Sun Conure",
    life: "Often 15 to 30 years",
    text: "Playful, loud and very social. Sun conures need lots of attention, daily out-of-cage time and plenty of toys to chew. Expect noisy calls, especially at dawn and dusk. They love to bathe and often like to sleep in a cosy spot.",
  },
  {
    id: "cockatiel",
    name: "Cockatiel",
    life: "Often 15 to 25 years",
    text: "Gentle and friendly, and great with patient new owners. Cockatiels produce a fine powder from their feathers, so keep their space well ventilated and clean. Their crest shows mood: upright means alert, flat can mean angry or scared.",
  },
  {
    id: "lovebirds",
    name: "Lovebirds",
    life: "Often 10 to 15 years",
    text: "Small, energetic and strongly bonded. Lovebirds can be kept alone only if you can give them lots of daily time, otherwise a compatible companion helps. They can be nippy when stressed or territorial around their nest.",
  },
];

const TOC = [
  ...SECTIONS.map((s) => [s.id, s.title]),
  ["hazards", "Household dangers"],
  ["health", "Health and vets"],
  ["species", "Our species"],
];

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl bg-white/60 p-6 ring-1 ring-forest/10 md:p-8 ${className}`}>{children}</div>;
}

export default function CareGuide() {
  return (
    <main>
      {/* ============ HEADER ============ */}
      <section className="bg-sage/60 px-6 pb-16 pt-36 lg:pt-44">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Bird care guide
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-forest/80">
            The basics of keeping pet parrots, including sun conures,
            cockatiels and lovebirds, healthy and happy. This is general
            advice. Every bird is different, so talk to an avian vet about
            your own bird.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[14rem_1fr]">
        {/* ============ CONTENTS ============ */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-lg font-semibold">On this page</h2>
          <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {TOC.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-block rounded-full bg-sand px-4 py-1.5 text-sm transition hover:bg-sage lg:bg-transparent lg:px-0 lg:py-1 lg:hover:bg-transparent lg:hover:text-moss"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="space-y-10">
          {/* ============ MAIN SECTIONS ============ */}
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id}>
              <Card>
                <h2 className="font-display text-3xl font-semibold">{s.title}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-forest/80">{s.intro}</p>
                <ul className="mt-5 max-w-2xl list-disc space-y-2 pl-5 leading-7 marker:text-leaf">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>

                {s.id === "food" && (
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-sage/50 p-5">
                      <h3 className="font-display text-xl font-semibold">Good choices</h3>
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 marker:text-moss">
                        {SAFE_FOODS.map((f) => <li key={f}>{f}</li>)}
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-sand p-5">
                      <h3 className="font-display text-xl font-semibold">Never feed</h3>
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 marker:text-forest">
                        {TOXIC_FOODS.map((f) => <li key={f}>{f}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
              </Card>
            </section>
          ))}

          {/* ============ HAZARDS ============ */}
          <section id="hazards">
            <Card>
              <h2 className="font-display text-3xl font-semibold">Household dangers</h2>
              <p className="mt-3 max-w-2xl leading-7 text-forest/80">
                Birds have very sensitive lungs, so things that seem harmless
                to us can be dangerous to them.
              </p>
              <dl className="mt-6 grid gap-4 md:grid-cols-2">
                {HAZARDS.map(([term, text]) => (
                  <div key={term} className="rounded-2xl bg-linen p-5">
                    <dt className="font-display text-lg font-semibold">{term}</dt>
                    <dd className="mt-1 text-sm leading-6 text-forest/75">{text}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </section>

          {/* ============ HEALTH ============ */}
          <section id="health">
            <Card className="bg-moss text-linen ring-0">
              <h2 className="font-display text-3xl font-semibold">Health and vets</h2>
              <p className="mt-3 max-w-2xl leading-7 text-linen/85">
                Birds hide illness until they are quite sick, so small changes
                matter. Find an avian vet before you need one, and book a
                check-up about once a year.
              </p>
              <h3 className="mt-6 font-display text-xl font-semibold">See an avian vet quickly if you notice:</h3>
              <ul className="mt-3 max-w-2xl list-disc space-y-1.5 pl-5 leading-7 marker:text-sage">
                {WARNING_SIGNS.map((w) => <li key={w}>{w}</li>)}
              </ul>
              <p className="mt-5 max-w-2xl leading-7 text-linen/85">
                While you arrange care, keep your bird warm and calm. Birds can
                go downhill fast, so act within hours, not days.
              </p>
            </Card>
          </section>

          {/* ============ SPECIES ============ */}
          <section id="species">
            <h2 className="font-display text-3xl font-semibold">Our species</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {SPECIES.map((s) => (
                <article key={s.id} id={s.id} className="rounded-3xl bg-sand p-6">
                  <h3 className="font-display text-2xl font-semibold">{s.name}</h3>
                  <p className="mt-1 text-sm font-medium text-moss">{s.life}</p>
                  <p className="mt-3 text-sm leading-6 text-forest/80">{s.text}</p>
                </article>
              ))}
            </div>
          </section>

          <p className="max-w-2xl text-sm leading-6 text-forest/65">
            This guide is for general information and does not replace advice
            from a qualified avian vet. Lifespans are typical ranges and vary
            by bird.
          </p>

          <Link to="/" className="inline-block rounded-full bg-forest px-7 py-3.5 font-medium text-linen transition hover:bg-moss">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}