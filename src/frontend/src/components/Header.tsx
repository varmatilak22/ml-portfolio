import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useLocation } from "@tanstack/react-router";
import { Code2, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
];

export default function Header({ isDark, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, login, clear } = useInternetIdentity();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="header.logo_link"
          >
            <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center transition-smooth group-hover:scale-105">
              <Code2 className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-foreground">
              ML<span className="text-accent">.</span>Portfolio
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            data-ocid="header.nav"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`header.nav_link.${link.label.toLowerCase()}`}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActive(link.to)
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              data-ocid="header.nav_link.admin"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActive("/admin")
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Admin
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              data-ocid="header.theme_toggle"
              aria-label="Toggle theme"
              className="text-muted-foreground hover:text-foreground"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                data-ocid="header.logout_button"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={login}
                data-ocid="header.login_button"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-ocid="header.mobile_menu_toggle"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1"
          data-ocid="header.mobile_nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              data-ocid={`header.mobile_nav_link.${link.label.toLowerCase()}`}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActive(link.to)
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            data-ocid="header.mobile_nav_link.admin"
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
              isActive("/admin")
                ? "bg-accent/10 text-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Admin
          </Link>
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleTheme}
              data-ocid="header.mobile_theme_toggle"
              className="text-muted-foreground"
            >
              {isDark ? (
                <Sun className="w-4 h-4 mr-1" />
              ) : (
                <Moon className="w-4 h-4 mr-1" />
              )}
              {isDark ? "Light" : "Dark"} mode
            </Button>
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                data-ocid="header.mobile_logout_button"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={login}
                data-ocid="header.mobile_login_button"
                className="bg-accent text-accent-foreground"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
