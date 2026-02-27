import "./CategoryCarousel.css";
import { useRef } from "react";

function CategoryCarousel({ title, children }) {
  const trackRef = useRef(null);

  const scrollByAmount = (dir) => {
    const el = trackRef.current;
    if (!el) return;


    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="carousel">
      <div className="carousel__header">
        <p className="carousel__title">{title}</p>
      </div>

      <div className="carousel__wrap">
        <button
          className="carousel__nav carousel__nav--left"
          type="button"
          aria-label={`Voltar em ${title}`}
          onClick={() => scrollByAmount(-1)}
        >
          ‹
        </button>

        <div className="carousel__track" ref={trackRef}>
          {children}
        </div>

        <button
          className="carousel__nav carousel__nav--right"
          type="button"
          aria-label={`Avançar em ${title}`}
          onClick={() => scrollByAmount(1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default CategoryCarousel;