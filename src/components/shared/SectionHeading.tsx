interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center">
      <h2 className="font-serif text-2xl md:text-3xl text-neutral-800 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
