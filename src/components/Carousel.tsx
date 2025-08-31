import React, { useState } from "react";
import "../styles/flat-for-rent.css";

interface CarouselProps {
  galleryImages?: string[];
}

const Carousel: React.FC<CarouselProps> = ({ galleryImages = [] }) => {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () =>
    setCurrent((current - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setCurrent((current + 1) % galleryImages.length);

  // Touch swipe logic
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.changedTouches[0].clientX);
    setTouchEndX(null);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.changedTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const dx = touchEndX - touchStartX;
      if (Math.abs(dx) > 40) {
        if (dx > 0) {
          prev(); // swipe right
        } else {
          next(); // swipe left
        }
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <>
      <div className="carousel">
        <button
          className="carousel-btn prev"
          aria-label="Previous image"
          onClick={prev}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="12"
              cy="12"
              r="11"
              fill="var(--primary)"
              stroke="var(--primary)"
            />
            <polyline
              points="14.5 8 10.5 12 14.5 16"
              fill="none"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          className="carousel-image-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            className="carousel-image"
            src={galleryImages[current] ?? ""}
            alt="Flat photo"
            style={{ cursor: "zoom-in" }}
            onClick={() => setFullscreen(true)}
          />
        </div>
        <button
          className="carousel-btn next"
          aria-label="Next image"
          onClick={next}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="12"
              cy="12"
              r="11"
              fill="var(--primary)"
              stroke="var(--primary)"
            />
            <polyline
              points="9.5 8 13.5 12 9.5 16"
              fill="none"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="carousel-indicators">
        {galleryImages.map((_, i) => (
          <button
            key={i}
            className={
              i === current ? "carousel-indicator active" : "carousel-indicator"
            }
            aria-label={`Go to image ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
      {fullscreen && (
        <div className="fullscreen-modal" onClick={() => setFullscreen(false)}>
          <div
            className="fullscreen-gallery"
            onClick={(e) => e.stopPropagation()}
          >
            {galleryImages.map((img, idx) => (
              <img
                key={img}
                className={
                  "fullscreen-image" + (idx === current ? " active" : "")
                }
                src={img}
                alt={`Flat photo fullscreen ${idx + 1}`}
                onClick={() => setCurrent(idx)}
                style={{
                  border:
                    idx === current ? "4px solid #6366f1" : "4px solid #fff",
                  opacity: idx === current ? 1 : 0.7,
                  cursor: idx === current ? "auto" : "pointer",
                }}
                onDoubleClick={() => setFullscreen(false)}
              />
            ))}
          </div>
          <button
            className="fullscreen-close"
            onClick={() => setFullscreen(false)}
            aria-label="Close fullscreen"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default Carousel;
