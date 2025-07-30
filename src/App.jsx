import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY";

function App() {
  const streetViewRef = useRef(null);
  const [guess, setGuess] = useState("");
  const [actualPlace, setActualPlace] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: [], // optional
    });

    loader.load().then(() => {
      fetch("/api/randomLocation")
        .then((res) => res.json())
        .then((data) => {
          setActualPlace(data.answer);

          const panorama = new window.google.maps.StreetViewPanorama(
            streetViewRef.current,
            {
              position: { lat: data.lat, lng: data.lng },
              pov: { heading: 100, pitch: 0 },
              zoom: 1,
            }
          );
        });
    });
  }, []);

  const handleSubmit = () => {
    if (!guess) return;
    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedAnswer = actualPlace.toLowerCase();
    const correct = normalizedAnswer.includes(normalizedGuess);
    setResult(correct ? "✅ Correct!" : `❌ Wrong! It was: ${actualPlace}`);
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1>GeoGuessr Clone</h1>
      <div
        id="street-view"
        ref={streetViewRef}
        style={{ width: "100%", height: "400px" }}
      />
      <input
        type="text"
        placeholder="Guess the place, city, or country"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        style={{ marginTop: 20, padding: 10, width: "300px" }}
      />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: 10, padding: 10 }}>
        Submit Guess
      </button>
      <p>{result}</p>
    </div>
  );
}

export default App;
