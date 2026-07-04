"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  MapPin, 
  BookOpen, 
  Loader2,
  Sparkles,
  Award,
  Info,
  CalendarCheck
} from "lucide-react";
import { ExploreResponse } from "./api/explore/simulatedData";
import DestinationExplorer from "./components/DestinationExplorer";
import ItineraryBuilder from "./components/ItineraryBuilder";
import StoryTeller from "./components/StoryTeller";

const PRESETS = ["Kyoto, Japan", "Oaxaca, Mexico", "Cairo, Egypt", "Rome, Italy", "Marrakesh, Morocco"];

const PROFILES = [
  { id: "all", label: "All Paths", emoji: "🌍" },
  { id: "culinary", label: "Culinary Explorer", emoji: "🍲" },
  { id: "craft", label: "Art & Craft Lover", emoji: "🧶" },
  { id: "heritage", label: "History Buff", emoji: "🕌" }
];

interface ItineraryItem {
  id: string;
  name: string;
  type: string;
  location: string;
  day: number;
  note?: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [showPresets, setShowPresets] = useState(false);
  const [exploreData, setExploreData] = useState<ExploreResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Custom travel profile
  const [activeProfile, setActiveProfile] = useState("all");

  // Storyteller modal trigger
  const [storytellerSpot, setStorytellerSpot] = useState<string | null>(null);

  // Itinerary planner state with lazy initialization from URL parameters
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sharedItems: ItineraryItem[] = [];
      let idx = 0;
      
      while (params.has(`i_${idx}`)) {
        const itemStr = params.get(`i_${idx}`);
        if (itemStr) {
          const [name, type, dayStr] = itemStr.split("|");
          sharedItems.push({
            id: `shared-${idx}-${Date.now()}`,
            name,
            type: type || "Heritage",
            location: "Imported Plan",
            day: Number(dayStr) || 1,
            note: "Shared with you"
          });
        }
        idx++;
      }
      if (sharedItems.length > 0) {
        return sharedItems;
      }
    }
    return [];
  });

  const fetchDestination = async (destinationName: string) => {
    setLoading(true);
    setError("");
    setShowPresets(false);
    
    try {
      const res = await fetch("/api/explore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: destinationName,
          action: "explore"
        })
      });

      if (!res.ok) throw new Error("Could not load cultural profile.");
      const resData = await res.json();
      
      setExploreData(resData.data);
      setQuery(resData.data.location); // Set input to resolved location
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Something went wrong loading recommendations.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchDestination(query.trim());
  };

  // Itinerary Action Handlers
  const handleAddToItinerary = (item: { name: string; type: string }) => {
    if (!exploreData) return;
    
    // Avoid duplicates
    if (itinerary.some((i) => i.name === item.name)) return;

    const newItem: ItineraryItem = {
      id: `${item.name.replace(/\s+/g, "-")}-${Date.now()}`,
      name: item.name,
      type: item.type,
      location: exploreData.location.split(",")[0],
      day: 1
    };

    setItinerary([...itinerary, newItem]);
  };

  const handleRemoveItineraryItem = (id: string) => {
    setItinerary(itinerary.filter((i) => i.id !== id));
  };

  const handleUpdateItemDay = (id: string, day: number) => {
    setItinerary(
      itinerary.map((item) => (item.id === id ? { ...item, day } : item))
    );
  };

  const handleUpdateItemNote = (id: string, note: string) => {
    setItinerary(
      itinerary.map((item) => (item.id === id ? { ...item, note } : item))
    );
  };

  const handleAddCustomItem = (name: string, type: string) => {
    const newItem: ItineraryItem = {
      id: `custom-${Date.now()}`,
      name,
      type,
      location: exploreData ? exploreData.location.split(",")[0] : "Custom",
      day: 1
    };
    setItinerary([...itinerary, newItem]);
  };

  // Filter exploreData by traveler profile
  const getFilteredExploreData = () => {
    if (!exploreData) return null;
    if (activeProfile === "all") return exploreData;

    // Filter attractions based on active profile tag mapping
    const filteredAttractions = exploreData.attractions.filter((item) => {
      if (activeProfile === "culinary") return item.type === "Culinary";
      if (activeProfile === "craft") return item.type === "Craft";
      if (activeProfile === "heritage") return item.type === "Heritage" || item.type === "Living Art";
      return true;
    });

    return {
      ...exploreData,
      attractions: filteredAttractions
    };
  };

  const filteredData = getFilteredExploreData();

  return (
    <div className="min-h-screen flex flex-col bg-sand-50/50">
      
      {/* 1. Header/Navigation */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-sand-200 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-600 flex items-center justify-center text-white font-serif font-black text-xl shadow-lg shadow-primary-500/20">
            C
          </div>
          <div>
            <span className="text-lg font-extrabold font-serif text-sand-900 leading-none block">CultureQuest</span>
            <span className="text-[10px] text-primary-600 font-bold uppercase tracking-wider">AI Heritage Portal</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-sand-600">
          <a href="#dashboard" className="hover:text-primary-500 transition-colors">Explorer Portal</a>
          <a href="#itinerary" className="hover:text-primary-500 transition-colors flex items-center gap-1">
            <CalendarCheck className="w-4 h-4 text-primary-500" />
            My Planner ({itinerary.length})
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-secondary-50 border border-secondary-200 text-secondary-700 text-xs font-semibold rounded-full">
            <Award className="w-3.5 h-3.5" />
            Ethical Tourism Standard
          </div>
        </div>
      </header>

      {/* 2. Hero Search Section */}
      <section className="bg-gradient-to-b from-white to-sand-100/30 pt-10 pb-8 px-6 md:px-12 flex flex-col items-center text-center">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 border border-primary-150 rounded-full text-xs font-semibold text-primary-600 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Travelers with Generative AI
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black font-serif text-sand-900 tracking-tight leading-tight">
            Discover the World&apos;s <span className="text-primary-500">Living Heritage</span>
          </h1>
          <p className="text-sm sm:text-base text-sand-600 max-w-lg mx-auto">
            Search any city to uncover hidden architectural wonders, taste ancestral culinary secrets, and connect directly with local guides.
          </p>
        </div>

        {/* Search Bar with Presets */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-xl mt-8 relative space-y-2">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-sand-400" />
            <input
              type="text"
              placeholder="Enter destination (e.g. Kyoto, Oaxaca, Marrakesh)..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowPresets(true);
              }}
              onFocus={() => setShowPresets(true)}
              className="w-full pl-12 pr-28 py-3.5 bg-white border border-sand-200 rounded-2xl text-sm font-medium shadow-md shadow-sand-250/20 focus:border-primary-500 focus:outline-none placeholder:text-sand-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 text-xs font-bold rounded-xl transition-all shadow-md shadow-primary-500/10 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Discover"}
            </button>
          </div>

          {/* Autocomplete / Preset Dropdown */}
          {showPresets && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-sand-200 rounded-2xl shadow-xl z-30 p-2 text-left animate-fade-in">
              <span className="block text-[10px] font-bold text-sand-400 uppercase tracking-wider px-3 py-1.5 border-b border-sand-100">
                Popular Cultural Capitals
              </span>
              <div className="mt-1 divide-y divide-sand-50">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => fetchDestination(p)}
                    className="w-full px-3 py-2.5 hover:bg-primary-50/50 hover:text-primary-700 transition-colors flex items-center gap-2 rounded-lg text-xs font-semibold text-sand-700 text-left"
                  >
                    <MapPin className="w-4 h-4 text-primary-400 shrink-0" />
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </form>

        {/* Preset quick tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-semibold text-sand-500">
          <span>Try popular:</span>
          {PRESETS.slice(0, 3).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => fetchDestination(p)}
              className="px-2.5 py-1 border border-sand-200 rounded-lg hover:border-primary-300 hover:text-primary-600 transition-colors bg-white"
            >
              {p.split(",")[0]}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Main Dashboard Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Loading overlay for panel updates */}
        {loading && !exploreData && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-sand-200">
            <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-3" />
            <p className="font-semibold text-sand-800">Weaving local heritage data...</p>
            <p className="text-xs text-sand-500">Retrieving attractions, hidden stories, and etiquette guides.</p>
          </div>
        )}

        {error && (
          <div className="flex-1 p-6 bg-red-50 border border-red-100 rounded-3xl text-center space-y-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-red-950">Could not retrieve destination data</h3>
            <p className="text-sm text-red-700 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => fetchDestination("Kyoto, Japan")}
              className="px-4 py-2 bg-primary-500 text-white rounded-xl text-xs font-semibold"
            >
              Reset to Kyoto
            </button>
          </div>
        )}

        {/* Welcome State */}
        {!exploreData && !loading && (
          <div className="flex-1 max-w-4xl mx-auto space-y-12 py-10 animate-fade-in">
            {/* Features intro grid */}
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h2 className="text-2xl font-bold font-serif text-sand-800">Start Your Immersive Adventure</h2>
              <p className="text-sm text-sand-500">
                Choose one of our hand-crafted cultural capitals below or type any city in the search bar above to begin your journey.
              </p>
            </div>

            {/* Popular presets grid with large visual cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Kyoto, Japan", tag: "Tradition & Zen", desc: "Explore split-bamboo crafts, quiet shrines, and tea ceremonies.", bg: "from-rose-500/10 to-orange-500/10", border: "hover:border-rose-300", badge: "bg-rose-50 text-rose-700", emoji: "🌸" },
                { name: "Oaxaca, Mexico", tag: "Artisans & Spice", desc: "Discover Zapotec hand-weaving, natural cochineal dyeing, and Mole Negro cooking.", bg: "from-amber-500/10 to-red-500/10", border: "hover:border-amber-300", badge: "bg-amber-50 text-amber-700", emoji: "🌵" },
                { name: "Rajasthan, India", tag: "Forts & Puppetry", desc: "Immerse in desert sandstones, traditional block print dyeing, and Kathputli puppetry.", bg: "from-orange-500/10 to-yellow-500/10", border: "hover:border-orange-300", badge: "bg-orange-50 text-orange-700", emoji: "🕌" }
              ].map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => fetchDestination(preset.name)}
                  className={`glass-card p-6 rounded-2xl border border-sand-200/60 bg-gradient-to-br ${preset.bg} text-left flex flex-col justify-between space-y-4 hover:shadow-xl ${preset.border} hover:scale-[1.02] active:scale-98 transition-all cursor-pointer group`}
                >
                  <div className="space-y-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${preset.badge}`}>
                      {preset.tag}
                    </span>
                    <h3 className="text-xl font-bold font-serif text-sand-900 flex items-center gap-1.5 pt-1">
                      <span>{preset.emoji}</span>
                      {preset.name}
                    </h3>
                    <p className="text-xs text-sand-600 leading-relaxed pt-1">
                      {preset.desc}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-primary-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-4">
                    Explore Destination &rarr;
                  </div>
                </button>
              ))}
            </div>

            {/* Feature badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-sand-200/50">
              {[
                { title: "Generative AI Recommendations", desc: "Discover hidden historic gems and craft guilds instantly.", icon: Sparkles, color: "text-amber-500 bg-amber-50" },
                { title: "Immersive Audio Stories", desc: "Listen to local guides and master weavers share their lineage.", icon: BookOpen, color: "text-indigo-500 bg-indigo-50" },
                { title: "Interactive Itinerary Builder", desc: "Add activities, organize days, and export print-ready PDFs.", icon: CalendarCheck, color: "text-emerald-500 bg-emerald-50" },
                { title: "Ethical Travel Guidelines", desc: "Access verified respect standards and local terminology.", icon: Info, color: "text-rose-500 bg-rose-50" }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="space-y-2 text-center p-3">
                    <div className={`w-10 h-10 rounded-2xl ${feat.color} flex items-center justify-center mx-auto shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-xs text-sand-800 leading-snug">{feat.title}</h4>
                    <p className="text-[11px] text-sand-500 leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {filteredData && !loading && (
          <>
            {/* Left Column: AI Recommendations */}
            <section id="dashboard" className="flex-1 lg:max-w-[65%] space-y-8 scroll-mt-20">
              
              {/* Profile Filters */}
              <div className="bg-white border border-sand-200 rounded-2xl p-4 flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase text-sand-400 tracking-wider">Filter Experience:</span>
                <div className="flex flex-wrap gap-1.5">
                  {PROFILES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveProfile(p.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 border ${
                        activeProfile === p.id
                          ? "bg-primary-500 border-primary-600 text-white font-bold"
                          : "bg-sand-50 border-sand-200 text-sand-600 hover:bg-sand-100"
                      }`}
                    >
                      <span>{p.emoji}</span>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Core Tabs Explorer */}
              <DestinationExplorer
                data={filteredData}
                addedItineraryIds={itinerary.map((i) => i.name)}
                onAddToItinerary={handleAddToItinerary}
                onOpenStoryteller={(spot) => setStorytellerSpot(spot)}
              />
            </section>

            {/* Right Column: Personal Travel Itinerary */}
            <section id="itinerary" className="w-full lg:w-[35%] bg-white border border-sand-200 rounded-3xl p-6 shadow-sm self-start lg:sticky lg:top-24 max-h-[80vh] overflow-y-auto scroll-mt-24">
              <ItineraryBuilder
                items={itinerary}
                onRemoveItem={handleRemoveItineraryItem}
                onUpdateItemDay={handleUpdateItemDay}
                onUpdateItemNote={handleUpdateItemNote}
                onAddCustomItem={handleAddCustomItem}
              />
            </section>
          </>
        )}
      </main>

      {/* 4. Immersive Storyteller Dialog */}
      {storytellerSpot && exploreData && (
        <StoryTeller
          location={exploreData.location}
          attractionName={storytellerSpot}
          onClose={() => setStorytellerSpot(null)}
        />
      )}

      {/* 5. Footer */}
      <footer className="bg-sand-900 text-white mt-12 py-10 px-6 border-t border-sand-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-serif font-black text-xl tracking-tight">CultureQuest</span>
            <p className="text-xs text-sand-400 mt-1">Connecting travel to cultural heritage preservation.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs text-sand-300 font-medium">
            <span className="text-secondary-400">✓ 100% Carbon Offset Plan</span>
            <span>✓ Respect & Consent Standard</span>
            <span>✓ Powered by Google Gemini AI</span>
          </div>

          <p className="text-[10px] text-sand-500">
            &copy; {new Date().getFullYear()} CultureQuest. Built for Sustainable Travel Challenge.
          </p>
        </div>
      </footer>

      {/* Background click closing presets */}
      {showPresets && (
        <div 
          onClick={() => setShowPresets(false)}
          className="fixed inset-0 z-20 transparent cursor-default"
        ></div>
      )}
    </div>
  );
}
