import { useState } from "react";

export default function SliderAbout({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-12">
      {/* Grid Background */}
      <div
        className="absolute inset-0 grid grid-cols-12 grid-rows-12"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(200, 200, 200, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(200, 200, 200, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main Content */}
      <div className="relative aspect-[16/9] w-full">
        {/* BEFORE label - moved to bottom */}
        <div className="absolute left-0 bottom-20 z-20">
          <div className="bg-rose-600 text-white rounded-full w-24 h-24 max-md:w-16 max-md:h-16 max-md:text-sm flex items-center justify-center text-lg font-semibold">
            BEFORE
          </div>
        </div>

        {/* AFTER label - moved to bottom */}
        <div className="absolute right-0 bottom-20 z-20 ">
          <div className="bg-rose-600 text-white rounded-full max-md:w-16 max-md:h-16 max-md:text-sm w-24 h-24 flex items-center justify-center text-lg font-semibold">
            AFTER
          </div>
        </div>

        {/* All slides are rendered but only one is visible */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={image.url}
              alt={image.alt || `Posture comparison slide ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}

        {/* Vertical Alignment Lines */}
        <div className="absolute left-[30%] top-0 w-0.5 h-full bg-red-500" />
        <div className="absolute right-[30%] top-0 w-0.5 h-full bg-red-500" />

        {/* Progress Arrow */}
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 transform -translate-x-1/2">
          <svg width="100" height="40" className="fill-rose-600">
            <path d="M0,20 Q40,20 45,20 T90,20 L90,25 L100,20 L90,15 L90,20" />
          </svg>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-end mr-12 mb-12 gap-3 mt-6">
        <div className="flex gap-2 pb-2 px-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div key={index} className="relative group ">
              <button
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                  currentSlide === index
                    ? "bg-rose-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
