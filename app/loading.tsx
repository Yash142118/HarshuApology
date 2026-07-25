export default function Loading() {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-4 bg-void">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-rose/30 border-t-rose" />
      <p className="font-display text-sm tracking-[0.3em] text-white/40">
        LOADING
      </p>
    </div>
  );
}
