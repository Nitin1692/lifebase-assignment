"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation'
import { io, Socket } from "socket.io-client";
import axios from "axios";

interface Commentary {
  over: number;
  ball: number;
  eventType: string;
  description: string;
}

interface Match {
  teamA: string;
  teamB: string;
}

export default function MatchPage() {
  const { id } = useParams();
  const router = useRouter()

  const [match, setMatch] = useState<Match | null>(null);
  const [commentary, setCommentary] = useState<Commentary[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!id) return;
    const matchId = Number(id);

    // Fetch match details
    axios
      .get(`http://localhost:4000/matches/${id}`)
      .then((res) => setMatch(res.data.match))
      .catch((err) => console.error("Error fetching match:", err));

    // Socket connection
    const socket: Socket = io("http://localhost:4000", {
      transports: ['websocket'], // Force websocket transport
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket, ID:", socket.id);
      setIsConnected(true);
      
      // Join the match room after connection
      socket.emit("joinMatch", { matchId });
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket");
      setIsConnected(false);
    });

    // Listen for room join confirmation (optional)
    socket.on("joinedRoom", (data) => {
      console.log("✅ Successfully joined room:", data.room);
    });

    // Listen for commentary updates
    socket.on("commentaryUpdate", (data: Commentary) => {
      console.log("📺 Received commentary:", data);
      setCommentary((prev) => [...prev, data]);
    });

    // Error handling
    socket.on("connect_error", (error) => {
      console.error("❌ Connection error:", error);
    });

    return () => {
      console.log("🔌 Disconnecting socket");
      socket.disconnect();
    };
  }, [id]);


  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <button
        onClick={() => router.push("/")}
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          cursor: "pointer",
          borderRadius: "6px",
          border: "1px solid #ddd",
        }}
      >
        ⬅ Back
      </button>

      {/* Connection status indicator */}
      <div style={{ 
        marginBottom: "10px", 
        padding: "5px 10px", 
        borderRadius: "4px",
        backgroundColor: isConnected ? "#d4edda" : "#f8d7da",
        color: isConnected ? "#155724" : "#721c24",
        fontSize: "12px"
      }}>
        WebSocket: {isConnected ? "Connected ✅" : "Disconnected ❌"}
      </div>

      {match ? (
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#171717" }}>
          {match.teamA} 🆚 {match.teamB}
        </h2>
      ) : (
        <p>Loading match details...</p>
      )}

      <h3 style={{ marginBottom: "10px" }}>Live Commentary:</h3>
      {commentary.length === 0 ? (
        <p style={{ color: "gray" }}>No commentary yet...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {commentary.map((c, idx) => (
            <li
              key={idx}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <strong>
                Over {c.over} Ball {c.ball} - {c.eventType}
              </strong>
              <br />
              <span>{c.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}