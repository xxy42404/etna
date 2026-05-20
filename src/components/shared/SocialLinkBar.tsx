interface SocialLink {
  platform: string;
  label: string;
  url: string;
  qrCode?: unknown;
}

interface SocialLinkBarProps {
  links: SocialLink[];
}

const platformIcons: Record<string, string> = {
  wechat: '微信',
  xiaohongshu: '小红书',
  douyin: '抖音',
};

export function SocialLinkBar({ links }: SocialLinkBarProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className="flex items-center gap-6">
      {links.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-400 hover:text-brand-500 transition-colors"
        >
          {link.label || platformIcons[link.platform] || link.platform}
        </a>
      ))}
    </div>
  );
}
