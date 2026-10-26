import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 text-center max-w-lg">
        <span className="text-brand text-sm font-bold uppercase tracking-[0.4em]">
          404
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter">
          This page took a different route.
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          The page you are looking for does not exist or has moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-brand-strong px-8 py-4 text-brand-deep font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>
      </div>
    </main>
  );
}
