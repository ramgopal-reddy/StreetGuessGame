import React, { useEffect, useRef, useState } from "react";

const GOOGLE_MAPS_API_KEY = "AIzaSyDcXGi6WXlz7W1v_mb_dGvfj4obn_ZxS9A"; // Replace with your real key

function App() {
  const streetViewRef = useRef(null);
  const [guess, setGuess] = useState("");
  const [actualPlace, setActualPlace] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {
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
