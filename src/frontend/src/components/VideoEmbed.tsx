import { Play } from "lucide-react";
import { useState } from "react";

interface VideoEmbedProps {
  videoUrl: string;
  thumbnailUrl?: string;
  title: string;
  /** When true, renders an inline iframe immediately (for modals) */
  autoPlay?: boolean;
}

function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    // YouTube
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      const videoId =
        u.searchParams.get("v") ??
        (u.hostname === "youtu.be" ? u.pathname.slice(1) : null);
      if (videoId)
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    // Vimeo
    if (u.hostname.includes("vimeo.com")) {
      const videoId = u.pathname.split("/").filter(Boolean).pop();
      if (videoId)
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    // Direct video file
    return null;
  } catch {
    return null;
  }
}

function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

export default function VideoEmbed({
  videoUrl,
  thumbnailUrl,
  title,
  autoPlay = false,
}: VideoEmbedProps) {
  const [playing, setPlaying] = useState(autoPlay);
  const embedUrl = getEmbedUrl(videoUrl);
  const direct = isDirectVideo(videoUrl);

  if (playing) {
    if (embedUrl) {
      return (
        <div className="relative aspect-video bg-foreground/10 rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      );
    }
    if (direct) {
      return (
        <div className="relative aspect-video bg-foreground/10 rounded-lg overflow-hidden">
          <video
            src={videoUrl}
            title={title}
            controls
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
          >
            <track kind="captions" />
          </video>
        </div>
      );
    }
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden group cursor-pointer block"
      aria-label={`Play video: ${title}`}
      data-ocid="video.play_button"
    >
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={`${title} thumbnail`}
          className="absolute inset-0 w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
      )}
      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/25 transition-smooth" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-accent shadow-lg flex items-center justify-center transition-smooth group-hover:scale-110 group-hover:bg-accent/90">
          <Play
            className="w-6 h-6 text-accent-foreground ml-0.5"
            fill="currentColor"
          />
        </div>
      </div>
    </button>
  );
}
