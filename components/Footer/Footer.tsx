import Link from "next/link";
import { navigation, siteConfig, socialLinks } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  return (
    <footer className="border-t border-dark/5 bg-off-white">
      <div className="container-page flex flex-col gap-10 py-14 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <Logo variant="brand" />
          <p className="mt-5 text-sm leading-relaxed text-muted">
            {siteConfig.description}
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted transition hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <Link href="/privacy" className="text-muted transition hover:text-primary">
            Privacy Policy
          </Link>
        </nav>

        <div className="flex gap-3">
          {socialLinks.map((link) => {
            const Icon = link.icon === "facebook" ? FacebookIcon : InstagramIcon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-dark/10 text-body transition hover:border-accent hover:text-accent"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="border-t border-dark/5">
        <div className="container-page flex flex-col gap-2 py-6 text-xs tracking-wide text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="wordmark text-[10px] text-primary/80">{siteConfig.wordmark}</p>
        </div>
      </div>
    </footer>
  );
}
