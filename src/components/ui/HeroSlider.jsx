import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SafeImage from "./SafeImage";

const AUTOPLAY_MS = 5500;

export default function HeroSlider({ slides }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (index) => setCurrent((index + slides.length) % slides.length),
    [slides.length]
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (paused || slides.length <= 1) return;
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [current, paused, next, slides.length]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const slide = slides[current];

  return (
    <section
      className="relative overflow-hidden bg-basil-50 px-3 pt-3 pb-6 sm:px-5 sm:pt-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      aria-roledescription="carousel"
      aria-label="Featured promotions"
    >
      <div className="relative h-[460px] sm:h-[500px] lg:h-[560px] rounded-3xl overflow-hidden shadow-elevated">
        {/* Background photo */}
        <div className="absolute inset-0">
          <SafeImage
            key={slide.image}
            src={slide.image}
            fallbackSrc={slide.imageFallback}
            alt=""
            className="w-full h-full object-cover"
            fallbackClassName="w-full h-full bg-basil-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-basil-900/85 via-basil-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-basil-900/30 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center px-6 sm:px-10 lg:px-14">
          <div
            className="glass-panel-dark backdrop-blur-xl max-w-lg w-full rounded-3xl p-6 sm:p-8 max-h-[calc(100%-2rem)] overflow-y-auto"
            role="group"
            aria-roledescription="slide"
            aria-label={`${current + 1} of ${slides.length}`}
          >
            <span className="market-tag inline-flex bg-mango-400 text-basil-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-soft">
              {slide.eyebrow}
            </span>
            <h1 className="mt-5 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-cream leading-tight">
              {slide.title}
            </h1>
            <p className="mt-4 text-cream/85 text-sm sm:text-base max-w-md line-clamp-3">
              {slide.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={slide.primaryCta.to}
                className="inline-flex items-center gap-2 bg-mango-400 text-basil-900 px-6 py-3 rounded-full font-medium hover:bg-mango-500 hover:shadow-glow transition-all"
              >
                {slide.primaryCta.label} <ArrowRight size={18} />
              </Link>
              {slide.secondaryCta && (
                <Link
                  to={slide.secondaryCta.to}
                  className="inline-flex items-center gap-2 bg-cream/10 text-cream border border-cream/30 px-6 py-3 rounded-full font-medium hover:bg-cream/20 transition-colors"
                >
                  {slide.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full glass-panel-dark backdrop-blur-md text-cream hover:scale-105 transition-transform"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full glass-panel-dark backdrop-blur-md text-cream hover:scale-105 transition-transform"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.eyebrow}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === current}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-6 bg-mango-400" : "w-2 bg-cream/50 hover:bg-cream/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
