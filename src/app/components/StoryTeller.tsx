"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  X, Play, Square, Volume2, VolumeX, Sparkles, Loader2, BookOpen
} from "lucide-react";

interface StoryTellerProps {
  location: string;
  attractionName: string;
  onClose: () => void;
}

const NARRATORS = [
  {
    role: "Local Historian / Guardian",
    name: "Heritage Guardian",
    avatar: "🕌",
    desc: "Focuses on ancestral history, spiritual meanings, and architectural secrets."
  },
  {
    role: "Street Food Artisan / Cook",
    name: "Culinary Host",
    avatar: "🍲",
    desc: "Narrates from the sensory perspective of local dishes, open-fire cooking, and markets."
  },
  {
    role: "Master Artisan / Weaver",
    name: "Craft Preservationist",
    avatar: "🧶",
    desc: "Shares details of centuries-old weaving, carving, or pottery techniques."
  }
];

export default function StoryTeller({ location, attractionName, onClose }: StoryTellerProps) {
  const [selectedNarrator, setSelectedNarrator] = useState(NARRATORS[0]);
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(false);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check for Web Speech API support
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setTtsSupported(true);
    }
    
    // Cleanup speech on unmount
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Fetch story on narrator change or on mount
  useEffect(() => {
    generateStory();
    // Stop any ongoing speech when switching narrators
    stopSpeech();
  }, [selectedNarrator]);

  const generateStory = async () => {
    setLoading(true);
    setError("");
    setStory("");
    
    try {
      const res = await fetch("/api/explore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location,
          action: "story",
          details: {
            narrator: selectedNarrator.role,
            attractionName
          }
        })
      });

      if (!res.ok) throw new Error("Failed to generate story.");
      const resData = await res.json();
      setStory(resData.story);
    } catch (err: any) {
      setError(err?.message || "Something went wrong generating the story.");
    } finally {
      setLoading(false);
    }
  };

  const startSpeech = () => {
    if (!ttsSupported || !story) return;

    window.speechSynthesis.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(story);
    
    // Attempt to pick a pleasant voice
    const voices = window.speechSynthesis.getVoices();
    
    // Prefer English voices that sound warm, or standard local accent if possible
    let preferredVoice = voices.find(v => v.lang.startsWith("en") && v.name.includes("Natural"));
    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.lang.startsWith("en"));
    }
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 0.95; // Slightly slower for storytelling pacing
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    speechUtteranceRef.current = utterance;
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (ttsSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-title"
    >
      <div className="relative w-full max-w-3xl overflow-hidden glass-panel rounded-2xl shadow-2xl border border-white/20 animate-fade-in max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-sand-200 bg-sand-100/50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-500" />
            <h2 id="story-title" className="text-xl font-semibold font-serif text-sand-900">
              Immersive Cultural Tales
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-sand-500 hover:bg-sand-200 hover:text-sand-900 transition-colors focus:ring-2 focus:ring-primary-500"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Target Attraction */}
          <div className="bg-primary-50 border border-primary-200/50 rounded-xl p-4">
            <span className="text-xs uppercase font-semibold text-primary-600 tracking-wider">Landmark / Spot</span>
            <h3 className="text-lg font-bold text-primary-900">{attractionName}</h3>
            <p className="text-sm text-sand-600 mt-1">Discover the living memory of this location through first-hand perspectives.</p>
          </div>

          {/* Narrator Selector */}
          <div>
            <h4 className="text-sm font-semibold text-sand-700 mb-3">Choose Your Storyteller:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {NARRATORS.map((n) => (
                <button
                  key={n.name}
                  onClick={() => setSelectedNarrator(n)}
                  className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                    selectedNarrator.name === n.name
                      ? "bg-primary-500 text-white border-primary-600 shadow-md shadow-primary-500/10"
                      : "bg-white text-sand-800 border-sand-200 hover:border-primary-200 hover:bg-primary-50/20"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl" role="img" aria-label={n.name}>{n.avatar}</span>
                    <span className={`font-semibold text-sm ${selectedNarrator.name === n.name ? "text-white" : "text-sand-900"}`}>
                      {n.name}
                    </span>
                  </div>
                  <span className={`text-xs ${selectedNarrator.name === n.name ? "text-primary-100" : "text-sand-500"}`}>
                    {n.role}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-sand-500 italic mt-2">
              * Choosing a different narrator shifts the perspective and reveals a unique dimension of the landmark.
            </p>
          </div>

          {/* Story Content Area */}
          <div className="min-h-[220px] bg-white border border-sand-200 rounded-xl p-6 relative flex flex-col justify-between">
            {loading && (
              <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center rounded-xl z-10">
                <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-2" />
                <p className="text-sm text-primary-700 font-medium">Invoking Gen AI story weaving...</p>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg border border-red-100">
                {error}
                <button onClick={generateStory} className="block mt-2 font-semibold text-primary-600 underline">
                  Try Again
                </button>
              </div>
            )}

            {story && !loading && (
              <div className="space-y-4 animate-fade-in font-serif text-sand-800 leading-relaxed text-base whitespace-pre-line">
                {story}
              </div>
            )}

            {/* Audio Controls */}
            {story && !loading && (
              <div className="mt-6 pt-4 border-t border-sand-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {isSpeaking ? (
                    <button
                      onClick={stopSpeech}
                      className="flex items-center gap-1.5 px-4 py-2 bg-sand-900 text-white rounded-lg text-sm font-semibold hover:bg-sand-800 transition-colors focus:ring-2 focus:ring-sand-900"
                    >
                      <Square className="w-4 h-4 fill-white" />
                      Stop Reading
                    </button>
                  ) : (
                    <button
                      disabled={!ttsSupported}
                      onClick={startSpeech}
                      className={`flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors focus:ring-2 focus:ring-primary-500 ${
                        !ttsSupported ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <Play className="w-4 h-4 fill-white" />
                      Listen to Story
                    </button>
                  )}
                  
                  {ttsSupported ? (
                    <span className="text-xs text-sand-500 flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5 text-sand-400" />
                      Audio narration ready
                    </span>
                  ) : (
                    <span className="text-xs text-red-500 flex items-center gap-1">
                      <VolumeX className="w-3.5 h-3.5" />
                      Audio not supported in browser
                    </span>
                  )}
                </div>

                {isSpeaking && (
                  <div className="flex items-center gap-1" aria-hidden="true">
                    <span className="w-1 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1 h-5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    <span className="w-1 h-4 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "450ms" }}></span>
                    <span className="w-1 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sand-200 bg-sand-50 text-center flex items-center justify-between text-xs text-sand-500">
          <div className="flex items-center gap-1 text-primary-600 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Gen AI storytelling
          </div>
          <span>Support local cultural storytelling and voice preservation.</span>
        </div>

      </div>
    </div>
  );
}
