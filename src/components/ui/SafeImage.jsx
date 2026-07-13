import { useEffect, useState } from "react";

/**
 * Renders a photo with graceful degradation:
 *   1. Try `src` (e.g. your own local photo in /public/images/...)
 *   2. If that fails to load, try `fallbackSrc` (e.g. a backup hotlinked photo)
 *   3. If that also fails, show `fallbackEmoji` instead of a broken-image icon
 */
export default function SafeImage({
  src,
  fallbackSrc,
  alt,
  fallbackEmoji,
  className = "",
  emojiClassName = "",
}) {
  const [stage, setStage] = useState(src ? "primary" : "emoji");

  // Reset when the requested image changes (e.g. switching between products)
  useEffect(() => {
    setStage(src ? "primary" : "emoji");
  }, [src]);

  const handleError = () => {
    if (stage === "primary" && fallbackSrc) {
      setStage("fallback");
    } else {
      setStage("emoji");
    }
  };

  if (stage === "emoji") {
    return (
      <div
        className={`flex items-center justify-center bg-basil-50 ${className} ${emojiClassName}`}
      >
        <span aria-hidden="true">{fallbackEmoji}</span>
      </div>
    );
  }

  return (
    <img
      src={stage === "fallback" ? fallbackSrc : src}
      alt={alt}
      loading="lazy"
      onError={handleError}
      className={className}
    />
  );
}
