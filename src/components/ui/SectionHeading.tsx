interface Props {
  /** New API */
  en?: string;
  jp?: string;
  center?: boolean;
  /** Legacy API (backward compat) */
  label?: string;
  title?: string;
  /** Shared */
  desc?: string;
}

export default function SectionHeading({ en, jp, desc, center = false, label, title }: Props) {
  const enText = en ?? label ?? '';
  const jpText = jp ?? title ?? '';
  const isLegacy = !en && !jp && !!title;

  if (isLegacy) {
    return (
      <div className="section-heading">
        {enText && <span className="section-heading__label">{enText}</span>}
        <h2 className="section-heading__title" dangerouslySetInnerHTML={{ __html: jpText }} />
        {desc && <p className="section-heading__desc">{desc}</p>}
        <span className="section-heading__line" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`section-head${center ? ' section-head--center' : ''}`}>
      {enText && <p className="section-head__en">{enText}</p>}
      <h2 className="section-head__jp">{jpText}</h2>
      {desc && <p className="section-head__desc">{desc}</p>}
    </div>
  );
}
