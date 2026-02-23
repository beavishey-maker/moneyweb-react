interface SectionHeadingProps {
  label: string;
  title: string;
  desc?: string;
}

export default function SectionHeading({ label, title, desc }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <span className="section-heading__label">{label}</span>
      <h2 className="section-heading__title" dangerouslySetInnerHTML={{ __html: title }} />
      {desc && <p className="section-heading__desc">{desc}</p>}
      <span className="section-heading__line" aria-hidden="true" />
    </div>
  );
}
