import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_MAPS_API_KEY = "AIzaSyDrjySHgzLoRv2p05yuu2Lw7ksCLW8h-pA";

function App() {
  const streetViewRef = useRef(null);
  const [guess, setGuess] = useState("");
  const [actualPlace, setActualPlace] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: [],
    });

    loader.load().then(() => {
      const locations = [
        { lat: 48.8584, lng: 2.2945, place: "Eiffel Tower, Paris, France" },
        {
          lat: 40.6892,
          lng: -74.0445,
          place: "Statue of Liberty, New York, USA",
        },
        { lat: 35.6586, lng: 139.7454, place: "Tokyo Tower, Tokyo, Japan" },
        {
          lat: -22.9519,
          lng: -43.2105,
          place: "Christ the Redeemer, Rio, Brazil",
        },
        { lat: 51.5007, lng: -0.1246, place: "Big Ben, London, UK" },
      ];

      const random = locations[Math.floor(Math.random() * locations.length)];
      setActualPlace(random.place);

      new window.google.maps.StreetViewPanorama(streetViewRef.current, {
        position: { lat: random.lat, lng: random.lng },
        pov: { heading: 100, pitch: 0 },
        zoom: 1,
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
