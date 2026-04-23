import { useProfile } from "@/hooks/useProfile";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Github, Linkedin } from "lucide-react";

// Inline Kaggle "K" SVG icon (react-icons/si does not export SiKaggle in v5)
function KaggleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.358 0C7.324 0 0 7.163 0 16s7.324 16 16.358 16C25.39 32 32 25.163 32 16S25.39 0 16.358 0zm3.498 22.44l-4.47-5.002-1.29 1.274V22.4H10.5V9.6h3.596v5.49l5.43-5.49h4.387l-5.82 5.78 6.103 7.06h-4.34z" />
    </svg>
  );
}

export default function Footer() {
  const { data: profile } = useProfile();
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  const socials = [
    {
      label: "LinkedIn",
      href: profile?.socialLinks?.linkedin || "https://linkedin.com",
      Icon: Linkedin,
      ocid: "footer.linkedin_link",
    },
    {
      label: "GitHub",
      href: profile?.socialLinks?.github || "https://github.com",
      Icon: Github,
      ocid: "footer.github_link",
    },
    {
      label: "Kaggle",
      href: profile?.socialLinks?.kaggle || "https://kaggle.com",
      Icon: KaggleIcon,
      ocid: "footer.kaggle_link",
    },
  ];

  return (
    <footer
      className="bg-card border-t border-border mt-auto"
      data-ocid="footer"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display font-bold text-lg text-foreground">
              ML<span className="text-accent">.</span>Portfolio
            </span>
            <span className="text-xs text-muted-foreground">
              © {year}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
                data-ocid="footer.caffeine_link"
              >
                caffeine.ai
              </a>
            </span>
          </div>

          {/* Nav links */}
          <nav
            className="flex items-center gap-6 text-sm text-muted-foreground"
            data-ocid="footer.nav"
          >
            <Link
              to="/"
              className="hover:text-foreground transition-smooth"
              data-ocid="footer.home_link"
            >
              Home
            </Link>
            <Link
              to="/projects"
              className="hover:text-foreground transition-smooth"
              data-ocid="footer.projects_link"
            >
              Projects
            </Link>
            <Link
              to="/blog"
              className="hover:text-foreground transition-smooth"
              data-ocid="footer.blog_link"
            >
              Blog
            </Link>
            <Link
              to="/kaggle"
              className="hover:text-foreground transition-smooth"
              data-ocid="footer.kaggle_link"
            >
              Kaggle
            </Link>
            <Link
              to="/admin"
              className="hover:text-foreground transition-smooth"
              data-ocid="footer.admin_link"
            >
              Admin
            </Link>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3" data-ocid="footer.socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                data-ocid={s.ocid}
                className="w-9 h-9 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-smooth"
              >
                <s.Icon className="w-4 h-4" />
              </a>
            ))}
            {profile?.socialLinks?.email && (
              <a
                href={`mailto:${profile.socialLinks.email}`}
                aria-label="Email"
                data-ocid="footer.email_link"
                className="w-9 h-9 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-smooth"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
