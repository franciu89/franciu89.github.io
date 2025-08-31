import React, { useState } from "react";
import "../styles/flat-for-rent.css";

interface CarouselProps {
  galleryImages?: string[];
}

const Carousel: React.FC<CarouselProps> = ({ galleryImages = [] }) => {
  const [current, setCurrent] = useState(0);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () =>
    setCurrent((current - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setCurrent((current + 1) % galleryImages.length);

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
        <div className="carousel-image-wrapper">
          <img
            className="carousel-image"
            src={galleryImages[current] ?? ""}
            alt="Flat photo"
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
    </>
  );
};

export default Carousel;
