interface PurchaseLink {
  platform: string;
  label: string;
  url: string;
  isActive: boolean;
}

interface PurchaseLinkButtonProps {
  link: PurchaseLink;
}

export function PurchaseLinkButton({ link }: PurchaseLinkButtonProps) {
  if (!link.isActive) return null;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 h-10 px-6 text-sm border border-neutral-300 text-neutral-600 hover:border-neutral-500 hover:text-neutral-800 transition-colors rounded-sm"
    >
      {link.label}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
      </svg>
    </a>
  );
}
