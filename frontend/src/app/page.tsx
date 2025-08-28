"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Match {
  _id: string; // still from Mongo
  teamA: string;
  teamB: string;
}

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/matches") // backend API
      .then((res) => setMatches(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🏏 Ongoing Matches
      </h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading matches...</p>
      ) : matches.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No matches found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {matches.map((match, index) => (
            <li
              key={match._id}
              style={{
                margin: "10px 0",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
              }}
              onClick={() => (window.location.href = `/match/${index + 1}`)}
            >
              <strong>
                #{index + 1} – {match.teamA} 🆚 {match.teamB}
              </strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
