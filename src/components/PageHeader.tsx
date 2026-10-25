export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="container-x pt-40 pb-16">
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h1 className="display max-w-[16ch] text-[clamp(2.6rem,7vw,6rem)]">{title}</h1>
      {children && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{children}</p>}
    </header>
  );
}
