import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <main className="gutter flex min-h-[100svh] flex-col justify-between py-6">
      <div className="label flex justify-between border-b border-line pb-4 text-mute">
        <span>Error</span>
        <span>404</span>
      </div>
      <div>
        <p className="display text-[clamp(6rem,30vw,28rem)]">404</p>
        <p className="mt-6 max-w-[40ch] font-mono text-sm text-mute">
          This page doesn't exist — or hasn't been built yet.
        </p>
      </div>
      <Link to="/" className="label link-draw w-fit">
        ← Back to the index
      </Link>
    </main>
  );
}
