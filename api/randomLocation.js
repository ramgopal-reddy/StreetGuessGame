// // /api/randomLocation.js

// export default async function handler(req, res) {
//   const locations = [
//     { lat: 48.8584, lng: 2.2945, place: "Eiffel Tower, Paris, France" },
//     { lat: 40.6892, lng: -74.0445, place: "Statue of Liberty, New York, USA" },
//     { lat: 35.6586, lng: 139.7454, place: "Tokyo Tower, Tokyo, Japan" },
//     { lat: -22.9519, lng: -43.2105, place: "Christ the Redeemer, Rio, Brazil" },
//     { lat: 51.5007, lng: -0.1246, place: "Big Ben, London, UK" },
//   ];

//   const random = locations[Math.floor(Math.random() * locations.length)];

//   res.status(200).json({
//     lat: random.lat,
//     lng: random.lng,
//     answer: random.place,
//   });
// }
// // This API endpoint returns a random location with latitude, longitude, and place name.
