import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

export const CHANNEL_URL = "https://www.youtube.com/@AZAviary-n7v";

const NAV = [
  { label: "Birds", to: "/#birds" },
  { label: "Videos", to: "/#videos" },
  { label: "Gallery", to: "/#gallery" },
  { label: "Care guide", to: "/care-guide", page: true },
  { label: "About", to: "/#about" },
];

// Scrolls to #section links, or to the top when a new page opens
function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // wait a tick so the page has rendered
      const t = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      }, 0);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-linen font-body text-forest">
      <ScrollHandler />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-forest/10 bg-linen/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-2xl font-semibold">
            Aviery
          </Link>

          <div className="hidden items-center gap-8 text-[15px] font-medium md:flex">
            {NAV.map((item) =>
              item.page ? (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `transition hover:text-moss ${isActive ? "text-moss" : "text-forest/75"}`
                  }
                >
                  {item.label}
                </NavLink>
              ) : (
                <Link key={item.label} to={item.to} className="text-forest/75 transition hover:text-moss">
                  {item.label}
                </Link>
              )
            )}
          </div>

          <Link
            to="/#contact"
            className="rounded-full bg-sage px-5 py-2 text-[15px] font-medium transition hover:bg-leaf"
          >
            Contact
          </Link>
        </nav>
      </header>

      <Outlet />

      <footer className="bg-forest px-6 py-8 text-linen/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <span className="font-display text-xl font-semibold text-linen">Aviery</span>
          <div className="flex gap-6">
            <Link to="/care-guide" className="underline-offset-4 hover:underline">
              Care guide
            </Link>
            <a href={CHANNEL_URL} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
              YouTube channel
            </a>
          </div>
          <p className="text-sm">Made with love for birds, 2026</p>
        </div>
      </footer>
    </div>
  );
}