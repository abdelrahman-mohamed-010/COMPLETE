import { useEffect, useRef } from "react";

const Slider = ({ speed = 1, treatments }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let animationFrameId;
    let scrollPos = 0;

    const scroll = () => {
      scrollPos += 1;
      if (scrollPos >= slider.scrollWidth / 2) {
        scrollPos = 0;
      }
      slider.scrollLeft = scrollPos;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed]);

  return (
    <section className="overflow-hidden mb-12">
      <div className="relative bg-darkpurple py-6">
        <div
          ref={sliderRef}
          className="flex whitespace-nowrap overflow-hidden"
          style={{ scrollBehavior: "auto" }}
        >
          {[...Array(2)].map((_, setIndex) => (
            <div key={`set-${setIndex}`} className="flex">
              {treatments.map((treatment, index) => (
                <div
                  key={`${setIndex}-${index}`}
                  className="flex items-center min-w-max px-2"
                >
                  <div className="px-4">
                    <img
                      src="/star.webp"
                      alt="Star icon"
                      className="w-12 h-12 object-contain mr-3"
                    />
                  </div>
                  <h3 className="text-white font-bold text-2xl tracking-wide px-4">
                    {treatment}
                  </h3>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;
