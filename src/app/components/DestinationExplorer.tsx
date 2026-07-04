"use client";

import React, { useState, useRef } from "react";
import { 
  ExploreResponse, 
  Attraction, 
  HiddenGem 
} from "../api/explore/simulatedData";
import { 
  Compass, 
  MapPin, 
  Bookmark, 
  Heart, 
  Volume2, 
  Sparkles, 
  AlertCircle,
  Plus,
  Check,
  Languages,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import CulturalConnect from "./CulturalConnect";

interface DestinationExplorerProps {
  data: ExploreResponse;
  addedItineraryIds: string[];
  onAddToItinerary: (item: { name: string; type: string }) => void;
  onOpenStoryteller: (attractionName: string) => void;
}

type TabType = "explore" | "etiquette" | "workshops" | "connect";

export default function DestinationExplorer({
  data,
  addedItineraryIds,
  onAddToItinerary,
  onOpenStoryteller
}: DestinationExplorerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("explore");
  const attractionsRef = useRef<HTMLDivElement | null>(null);

  const tabList = [
    { id: "explore", label: "Heritage & Gems", icon: Compass },
    { id: "etiquette", label: "Etiquette & Phrases", icon: Languages },
    { id: "workshops", label: "Traditions & Events", icon: BookOpen },
    { id: "connect", label: "Local Connections", icon: Heart }
  ];

  return (
    <div className="space-y-6">
      {/* Destination Meta Header */}
      <div className="bg-gradient-to-r from-primary-900 to-secondary-700 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-primary-500/10 rounded-full blur-2xl"></div>
        
        <div className="relative space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-primary-200">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wider uppercase">Destination Portal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif">{data.location}</h1>
          <p className="text-sand-100 text-sm md:text-base leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>

      {/* Tab Navigation (Aria-compliant) */}
      <div className="border-b border-sand-200" role="tablist" aria-label="Cultural dashboard sections">
        <div className="flex flex-wrap gap-2 -mb-px">
          {tabList.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`${tab.id}-panel`}
                id={`${tab.id}-tab`}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-t-xl ${
                  isActive
                    ? "border-primary-500 text-primary-600 bg-primary-50/50"
                    : "border-transparent text-sand-500 hover:text-sand-900 hover:border-sand-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="py-4">
        {/* Tab 1: Explore Attractions & Hidden Gems */}
        <div
          id="explore-panel"
          role="tabpanel"
          aria-labelledby="explore-tab"
          hidden={activeTab !== "explore"}
          className="space-y-8 animate-fade-in"
        >
          {/* Attractions */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-serif text-sand-900">Cultural Highlights</h2>
              <span className="text-xs text-sand-400 font-medium">Must-visit historical sites</span>
            </div>
            
            <div className="relative group/scroll-container">
              {/* Left Navigation Arrow */}
              <button 
                onClick={() => attractionsRef.current?.scrollBy({ left: -330, behavior: "smooth" })}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-sand-200 rounded-full flex items-center justify-center text-sand-650 hover:text-primary-500 hover:border-primary-300 shadow-md transition-all opacity-0 group-hover/scroll-container:opacity-100 focus:opacity-100 cursor-pointer hidden md:flex"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Navigation Arrow */}
              <button 
                onClick={() => attractionsRef.current?.scrollBy({ left: 330, behavior: "smooth" })}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-sand-200 rounded-full flex items-center justify-center text-sand-650 hover:text-primary-500 hover:border-primary-300 shadow-md transition-all opacity-0 group-hover/scroll-container:opacity-100 focus:opacity-100 cursor-pointer hidden md:flex"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Horizontal Scroll list */}
              <div 
                ref={attractionsRef}
                className="flex overflow-x-auto gap-6 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-thin w-full"
              >
                {data.attractions.map((attraction, idx) => {
                  const isAdded = addedItineraryIds.includes(attraction.name);
                  return (
                    <div 
                      key={idx} 
                      className="glass-card rounded-2xl flex flex-col justify-between border border-sand-200/50 bg-white w-[290px] sm:w-[325px] shrink-0 snap-start overflow-hidden hover:border-primary-200/60 hover:shadow-lg transition-all duration-350"
                    >
                      {/* Accent Header Stripe */}
                      <div className={`h-1.5 w-full ${
                        attraction.type === "Heritage" ? "bg-indigo-500" :
                        attraction.type === "Culinary" ? "bg-amber-500" :
                        attraction.type === "Craft" ? "bg-emerald-500" :
                        "bg-purple-500"
                      }`} />

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className={`px-2.5 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider ${
                              attraction.type === "Heritage" ? "bg-indigo-50 text-indigo-700 border border-indigo-100" :
                              attraction.type === "Culinary" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                              attraction.type === "Craft" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                              "bg-purple-50 text-purple-700 border border-purple-100"
                            }`}>
                              {attraction.type}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-bold font-serif text-sand-900 line-clamp-1">{attraction.name}</h3>
                          <p className="text-xs text-sand-500 leading-relaxed line-clamp-3">
                            {attraction.description}
                          </p>
                          
                          <div className="bg-sand-50 border border-sand-100 rounded-xl p-3.5">
                            <h4 className="text-[9px] font-bold uppercase text-sand-400 tracking-wider">Heritage Context</h4>
                            <p className="text-xs text-primary-900 italic mt-1 leading-relaxed">
                              "{attraction.culturalSignificance}"
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => onOpenStoryteller(attraction.name)}
                            className="flex-1 py-2.5 px-3 border border-primary-200 text-[11px] font-bold text-primary-600 rounded-xl hover:bg-primary-50 transition-colors flex items-center justify-center gap-1 cursor-pointer focus:ring-2 focus:ring-primary-500"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            Story
                          </button>
                          
                          <button
                            onClick={() => onAddToItinerary({ name: attraction.name, type: attraction.type })}
                            disabled={isAdded}
                            className={`flex-1 py-2.5 px-3 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer focus:ring-2 focus:ring-primary-500 ${
                              isAdded
                                ? "bg-secondary-50 text-secondary-600 border border-secondary-200 cursor-default"
                                : "bg-primary-500 hover:bg-primary-600 text-white shadow-md shadow-primary-500/10 active:scale-97"
                            }`}
                          >
                            {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            {isAdded ? "Added" : "Add to Plan"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Hidden Gems */}
          <div className="space-y-5 pt-4 border-t border-sand-200">
            <div>
              <h2 className="text-2xl font-bold font-serif text-sand-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-500" />
                Off the Beaten Path
              </h2>
              <p className="text-sand-600 text-sm mt-0.5">Lesser-known treasures, sacred sanctuaries, and private local ateliers.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.hiddenGems.map((gem, idx) => {
                const isAdded = addedItineraryIds.includes(gem.name);
                return (
                  <div key={idx} className="glass-card border-l-4 border-l-gold-500 rounded-2xl p-6 bg-white flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 bg-gold-50 border border-gold-200 text-[10px] font-bold text-gold-700 rounded-full uppercase tracking-wider">
                          Hidden Gem
                        </span>
                        <span className="text-[10px] text-sand-400 font-medium">Sustainable Explorer</span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-sand-900">{gem.name}</h3>
                        <p className="text-sm text-sand-600 leading-relaxed mt-1">
                          {gem.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-sand-100 text-xs">
                        <div>
                          <h4 className="font-bold text-sand-500 uppercase tracking-wider text-[10px]">How to discover sustainably</h4>
                          <p className="text-sand-600 mt-1">{gem.locationDetails}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-sand-500 uppercase tracking-wider text-[10px]">Respect Protocol</h4>
                          <p className="text-primary-800 italic mt-1 font-medium">{gem.respectEtiquette}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        onClick={() => onOpenStoryteller(gem.name)}
                        className="py-2 px-4 border border-sand-200 text-xs font-bold text-sand-700 rounded-xl hover:bg-sand-50 transition-colors flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-primary-500"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                        Uncover Story
                      </button>
                      <button
                        onClick={() => onAddToItinerary({ name: gem.name, type: "Heritage" })}
                        disabled={isAdded}
                        className={`py-2 px-4 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-primary-500 ${
                          isAdded
                            ? "bg-secondary-50 text-secondary-600 border border-secondary-200"
                            : "bg-primary-500 hover:bg-primary-600 text-white"
                        }`}
                      >
                        {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        {isAdded ? "Added to Plan" : "Add to Plan"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab 2: Etiquette & Phrases */}
        <div
          id="etiquette-panel"
          role="tabpanel"
          aria-labelledby="etiquette-tab"
          hidden={activeTab !== "etiquette"}
          className="space-y-8 animate-fade-in"
        >
          {/* Etiquette Rules */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary-500" />
              <h2 className="text-2xl font-bold font-serif text-sand-900">Cultural Protocols & Respect</h2>
            </div>
            <p className="text-sand-600 text-sm max-w-2xl">
              Be a respectful traveler. Understanding these fundamental social guidelines ensures pleasant interactions and supports heritage conservation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.etiquette.map((rule, idx) => (
                <div key={idx} className="bg-white border border-sand-200/80 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-lg font-bold text-primary-600 shrink-0">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sand-900 text-sm">{rule.rule}</h3>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-sand-100 text-sand-500 uppercase tracking-wider">
                        {rule.category}
                      </span>
                    </div>
                    <p className="text-xs text-sand-500 leading-relaxed">
                      {rule.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phrases / Glossary */}
          <div className="space-y-4 pt-6 border-t border-sand-200">
            <h2 className="text-2xl font-bold font-serif text-sand-900">Local Language Bridge</h2>
            <p className="text-sand-600 text-sm max-w-2xl">
              Connect at a human level. Even a simple attempt to speak local expressions creates immediate goodwill.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {data.phrases.map((phrase, idx) => (
                <div key={idx} className="bg-sand-100/50 border border-sand-200/60 rounded-2xl p-5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-primary-900 tracking-wide font-serif">{phrase.original}</span>
                    <span className="text-[10px] text-sand-400 font-semibold uppercase">Pronunciation</span>
                  </div>
                  
                  <div className="text-xs space-y-1">
                    <p className="text-sand-600 font-bold">Phonetic: <span className="text-primary-600 font-mono">/{phrase.phonetic}/</span></p>
                    <p className="text-sand-700">Translation: <strong className="text-sand-900 font-bold">"{phrase.translation}"</strong></p>
                  </div>

                  <div className="pt-2 border-t border-sand-200/50 text-[11px] text-sand-500 leading-relaxed italic">
                    <strong>Context:</strong> {phrase.culturalContext}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab 3: Traditions, Workshops & Events */}
        <div
          id="workshops-panel"
          role="tabpanel"
          aria-labelledby="workshops-tab"
          hidden={activeTab !== "workshops"}
          className="space-y-6 animate-fade-in"
        >
          <div>
            <h2 className="text-2xl font-bold font-serif text-sand-900">Seasonal Traditions & Local Workshops</h2>
            <p className="text-sand-600 text-sm mt-1">
              Participate directly in regional culture. Learn historic skills from master craftsmen or witness vibrant seasonal ceremonies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.events.map((event, idx) => {
              const isAdded = addedItineraryIds.includes(event.name);
              return (
                <div key={idx} className="glass-card bg-white border border-sand-200 rounded-2xl p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 bg-secondary-50 border border-secondary-200 text-[10px] font-bold text-secondary-600 rounded-full uppercase tracking-wider">
                        {event.type}
                      </span>
                      <span className="text-xs text-sand-500 font-semibold">{event.season}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-sand-900">{event.name}</h3>
                      <p className="text-sm text-sand-600 leading-relaxed mt-1">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToItinerary({ name: event.name, type: "Living Art" })}
                    disabled={isAdded}
                    className={`mt-6 w-full py-2 bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-primary-500 ${
                      isAdded ? "bg-secondary-50 text-secondary-600 border border-secondary-200 cursor-default" : ""
                    }`}
                  >
                    {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    {isAdded ? "Scheduled in Itinerary" : "Add to Travel Itinerary"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tab 4: Connect with Local Hosts */}
        <div
          id="connect-panel"
          role="tabpanel"
          aria-labelledby="connect-tab"
          hidden={activeTab !== "connect"}
          className="animate-fade-in"
        >
          <CulturalConnect connections={data.connections} />
        </div>
      </div>
    </div>
  );
}
