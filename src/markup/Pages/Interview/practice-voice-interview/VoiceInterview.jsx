import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Bot, User } from "lucide-react";

export default function VoiceInterview({ formData, onBack }) {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [aiText, setAiText] = useState("");
  const [userText, setUserText] = useState("");
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);

  const recognitionRef = useRef(null);
  const manualStop = useRef(false);
  const isListening = useRef(false);
  const wsRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      toast.success("🎉 Your interview is completed!");
      setTimeout(() => (window.location.href = "/user/jobs-profile"), 2000);
    }
  }, [timeLeft]);

  // Format time mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Load voices
  useEffect(() => {
    function loadVoices() {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      const female = availableVoices.find((v) =>
        v.name.toLowerCase().includes("female")
      );
      setSelectedVoice(female);
    }
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  // WebSocket Setup
  useEffect(() => {
    const token = localStorage.getItem("jobSeekerLoginToken");
    const { jobTitle, location, experience, companyName } = formData;
    const params = new URLSearchParams({
      token,
      jobTitle,
      location,
      experience,
      companyName,
      interview_type: "practice",
    });
    const ws = new WebSocket(
      `wss://apiwl.novajobs.us/api/jobseeker/ws/interview/audio?${params.toString()}`
    );
    wsRef.current = ws;

    ws.onopen = () => console.log("✅ WebSocket connected");
    ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.type === "ai") {
        console.log("🤖 AI replied:", msg.text);
        setAiText(msg.text);
        speak(msg.text);
      }
    };
    ws.onerror = (err) => console.error("❌ WebSocket error:", err);

    return () => ws.close();
  }, [formData]);

  // Speech Recognition Setup
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("SpeechRecognition not supported in this browser!");
      return;
    }

    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setUserText(transcript);

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: "user", text: transcript }));
      }
    };

    recognition.onstart = () => {
      setUserSpeaking(true);
      isListening.current = true;
    };

    recognition.onend = () => {
      setUserSpeaking(false);
      isListening.current = false;
      if (!manualStop.current) {
        recognition.start();
        isListening.current = true;
      }
    };

    recognition.onerror = (e) => {
      console.error("⚠️ Recognition error:", e.error);
      isListening.current = false;
    };

    recognitionRef.current = recognition;
  }, []);

  // Speak AI Text
  function speak(text) {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      isListening.current = false;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.onstart = () => setAiSpeaking(true);
    utterance.onend = () => {
      setAiSpeaking(false);
      setTimeout(() => {
        if (
          !manualStop.current &&
          recognitionRef.current &&
          !isListening.current
        ) {
          recognitionRef.current.start();
          isListening.current = true;
        }
      }, 300);
    };

    window.speechSynthesis.speak(utterance);
  }

  // Buttons
  const startSpeaking = () => {
    manualStop.current = false;
    if (!isListening.current) {
      recognitionRef.current?.start();
      isListening.current = true;
    }
  };

  const stopSpeaking = () => {
    manualStop.current = true;
    if (isListening.current) {
      recognitionRef.current?.stop();
      isListening.current = false;
      toast.success("🎉 Your interview is completed!");
      setTimeout(() => (window.location.href = "/user/jobs-profile"), 2000);
    }
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="fw-bold text-primary mb-4">AI Voice Interview</h2>

      <div className="fs-5 fw-semibold text-danger mb-4">
        Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
      </div>

      {/* Icons Row */}
      <div className="row justify-content-center g-5 mb-4">
        <div className="col-6 col-md-3">
          <div
            className={`rounded-circle border border-4 shadow p-4 ${
              aiSpeaking
                ? "border-primary bg-light"
                : "border-secondary bg-white"
            }`}
          >
            <Bot
              size={64}
              className={aiSpeaking ? "text-primary" : "text-secondary"}
            />
            <p
              className={`mt-2 fw-semibold ${
                aiSpeaking ? "text-primary" : "text-muted"
              }`}
            >
              AI
            </p>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            className={`rounded-circle border border-4 shadow p-4 ${
              userSpeaking
                ? "border-success bg-light"
                : "border-secondary bg-white"
            }`}
          >
            <User
              size={64}
              className={userSpeaking ? "text-success" : "text-secondary"}
            />
            <p
              className={`mt-2 fw-semibold ${
                userSpeaking ? "text-success" : "text-muted"
              }`}
            >
              You
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-3">
        <button onClick={startSpeaking} className="btn btn-success px-4">
          Start
        </button>
        <button onClick={stopSpeaking} className="btn btn-danger px-4">
          Stop
        </button>
      </div>
    </div>
  );
}
