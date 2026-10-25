export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="container-x pt-36 pb-14 md:pt-44 md:pb-20">
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h1 className="display t-hero max-w-[15ch]">{title}</h1>
      {children && <p className="lede mt-7 max-w-2xl">{children}</p>}
    </header>
  );
}
