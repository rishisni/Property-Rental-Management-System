import React, { useState, useEffect } from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

const slides = [
  {
    id: 1,
    image: "/images/image1.jpg",
    title: "Find Your Dream Home",
    description: "Explore a wide range of properties tailored to your needs.",
  },
  {
    id: 2,
    image: "/images/image2.jpg",
    title: "Affordable Rentals",
    description: "Properties that fit your budget without compromising quality.",
  },
  {
    id: 3,
    image: "/images/image3.jpg",
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
              transition: "background-image 1s ease-in-out",
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
                transition: "background 1s ease-in-out",
              }}
            >
              <h1
                style={{
                  fontSize: "3rem",
                  fontWeight: "700",
                  textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)",
                  letterSpacing: "2px",
                  marginBottom: "15px",
                }}
              >
                {slide.title}
              </h1>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "300",
                  letterSpacing: "1px",
                  lineHeight: "1.5",
                  marginBottom: "20px",
                }}
              >
                {slide.description}
              </p>
              <div>
                <button
                  style={{
                    backgroundColor: "#ff6f61",
                    border: "none",
                    color: "white",
                    padding: "12px 30px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: "25px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#ff4f3b")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#ff6f61")}
                >
                  Explore Now
                </button>
              </div>
            </div>
          </MDBCarouselItem>
        ))}
      </MDBCarousel>
    </div>
  );
};

export default Home;
