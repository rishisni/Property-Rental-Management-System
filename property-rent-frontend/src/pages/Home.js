import React, { useState, useEffect } from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

const slides = [
  {
    id: 1,
    image: "/images/slide11.webp",
    title: "Find Your Dream Home",
    description: "Explore a wide range of properties tailored to your needs.",
  },
  {
    id: 2,
    image: "/images/slide21.webp",
    title: "Affordable Rentals",
    description: "Properties that fit your budget without compromising quality.",
  },
  {
    id: 3,
    image: "/images/slide31.webp",
    title: "Easy Booking Process",
    description: "Book your dream property in just a few clicks.",
  },
];

const preloadImages = (images) =>
  Promise.all(
    images.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        })
    )
  );

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        await preloadImages(slides.map((slide) => slide.image));
        setIsLoaded(true);
      } catch (err) {
        console.error("Failed to preload images", err);
      }
    };
    loadImages();
  }, []);

  if (!isLoaded) {
    return <div className="text-center my-5">Loading carousel...</div>;
  }

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <MDBCarousel showControls showIndicators dark fade>
        {slides.map((slide, index) => (
          <MDBCarouselItem
            key={slide.id}
            className={`w-100 d-block ${index === 0 ? "active" : ""}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                background: "rgba(0, 0, 0, 0.5)",
                textAlign: "center",
                padding: "0 20px",
              }}
            >
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
            </div>
          </MDBCarouselItem>
        ))}
      </MDBCarousel>
    </div>
  );
};

export default Home;
