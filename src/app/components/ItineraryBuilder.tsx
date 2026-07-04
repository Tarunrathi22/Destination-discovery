"use client";

import React, { useState } from "react";
import { Trash2, Calendar, ClipboardCheck, Share2, Printer, MapPin, Plus } from "lucide-react";

interface ItineraryItem {
  id: string;
  name: string;
  type: string;
  location: string;
  day: number;
  note?: string;
}

interface ItineraryBuilderProps {
  items: ItineraryItem[];
  onRemoveItem: (id: string) => void;
  onUpdateItemDay: (id: string, day: number) => void;
  onUpdateItemNote: (id: string, note: string) => void;
  onAddCustomItem: (name: string, type: string) => void;
}

export default function ItineraryBuilder({
  items,
  onRemoveItem,
  onUpdateItemDay,
  onUpdateItemNote,
  onAddCustomItem
}: ItineraryBuilderProps) {
  const [customName, setCustomName] = useState("");
  const [customType, setCustomType] = useState("Heritage");
  const [showAddForm, setShowAddForm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tripDays, setTripDays] = useState(3);

  // Group items by day
  const maxDay = items.reduce((acc, curr) => Math.max(acc, curr.day), 1);
  const totalDays = Math.max(tripDays, maxDay);
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  const handleShare = () => {
    if (typeof window === "undefined") return;
    
    // Construct a sharing URL representing the itinerary state
    const params = new URLSearchParams();
    items.forEach((item, idx) => {
      params.append(`i_${idx}`, `${item.name}|${item.type}|${item.day}`);
    });
    
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    onAddCustomItem(customName.trim(), customType);
    setCustomName("");
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 border-b border-sand-200 pb-5">
        <div>
          <h2 className="text-xl font-bold font-serif text-sand-900 flex items-center gap-2">
            <Calendar className="w-5.5 h-5.5 text-primary-500" />
            Your Cultural Itinerary
          </h2>
          <p className="text-sand-600 text-xs mt-1 leading-relaxed">
            Build your travel timeline. Add details, reorganize days, and share your path.
          </p>

          {/* Trip Duration Selector */}
          <div className="flex items-center justify-between bg-sand-50 p-2.5 rounded-xl border border-sand-200/60 print:hidden mt-3.5">
            <span className="text-xs font-bold text-sand-700 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary-500" />
              Trip Duration
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setTripDays(prev => Math.max(1, prev - 1))}
                disabled={totalDays <= 1}
                className="w-7 h-7 rounded-lg border border-sand-300 bg-white hover:bg-sand-50 disabled:opacity-30 disabled:hover:bg-white flex items-center justify-center text-sm font-bold text-sand-800 transition-colors cursor-pointer"
                aria-label="Decrease days"
              >
                -
              </button>
              <span className="w-14 text-center text-xs font-bold text-sand-900">{totalDays} {totalDays === 1 ? "Day" : "Days"}</span>
              <button
                type="button"
                onClick={() => setTripDays(prev => Math.min(14, prev + 1))}
                disabled={totalDays >= 14}
                className="w-7 h-7 rounded-lg border border-sand-300 bg-white hover:bg-sand-50 disabled:opacity-30 disabled:hover:bg-white flex items-center justify-center text-sm font-bold text-sand-800 transition-colors cursor-pointer"
                aria-label="Increase days"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full">
          <button
            onClick={handleShare}
            className="flex-1 min-w-[90px] flex items-center justify-center gap-1.5 px-2 py-2 border border-sand-300 rounded-xl text-xs font-semibold text-sand-700 bg-white hover:bg-sand-50 transition-colors focus:ring-2 focus:ring-primary-500 cursor-pointer shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? "Copied!" : "Share"}
          </button>
          
          <button
            onClick={handlePrint}
            className="flex-1 min-w-[90px] flex items-center justify-center gap-1.5 px-2 py-2 border border-sand-300 rounded-xl text-xs font-semibold text-sand-700 bg-white hover:bg-sand-50 transition-colors focus:ring-2 focus:ring-primary-500 cursor-pointer shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            Export
          </button>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex-1 min-w-[90px] flex items-center justify-center gap-1.5 px-2 py-2 bg-primary-500 text-white rounded-xl text-xs font-semibold hover:bg-primary-600 transition-colors focus:ring-2 focus:ring-primary-500 cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Spot
          </button>
        </div>
      </div>

      {/* Add Custom Spot Form */}
      {showAddForm && (
        <form onSubmit={handleAddCustom} className="bg-white border border-sand-200 rounded-xl p-4 space-y-3 animate-fade-in max-w-md">
          <h3 className="font-semibold text-sm text-sand-800">Add Custom Activity</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="custom-name" className="sr-only">Spot Name</label>
              <input
                id="custom-name"
                type="text"
                placeholder="e.g. Local Craft Shop"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                required
                className="w-full p-2 border border-sand-200 rounded-lg text-xs focus:outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="custom-type" className="sr-only">Activity Type</label>
              <select
                id="custom-type"
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                className="w-full p-2 border border-sand-200 rounded-lg text-xs focus:outline-none focus:border-primary-500"
              >
                <option value="Heritage">Heritage</option>
                <option value="Culinary">Culinary</option>
                <option value="Craft">Craft</option>
                <option value="Living Art">Living Art</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 text-xs pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-2.5 py-1.5 border border-sand-200 rounded-md text-sand-500 hover:bg-sand-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2.5 py-1.5 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              Add to Itinerary
            </button>
          </div>
        </form>
      )}

      {/* Itinerary Timeline */}
      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-sand-200 p-6">
          <MapPin className="w-12 h-12 text-sand-300 mx-auto mb-3" />
          <h3 className="font-semibold text-lg text-sand-800">Your itinerary is empty.</h3>
          <p className="text-sm text-sand-500 max-w-md mx-auto mt-1">
            Explore cultural recommendations above and click **"Add to Itinerary"** on spots, hidden gems, and events to draft your travel timeline!
          </p>
        </div>
      ) : (
        <div className="space-y-8 print:space-y-6">
          {days.map((day) => {
            const dayItems = items.filter((item) => item.day === day);

            return (
              <div key={day} className="relative pl-6 border-l-2 border-primary-200">
                {/* Day Indicator Dot */}
                <div className="absolute -left-2 top-0.5 w-4.5 h-4.5 rounded-full bg-primary-500 border-4 border-sand-50 flex items-center justify-center"></div>

                <h3 className="text-lg font-bold font-serif text-sand-900 mb-4">
                  Day {day}
                </h3>

                {dayItems.length === 0 ? (
                  <p className="text-sm text-sand-400 italic">No activities planned for this day.</p>
                ) : (
                  <div className="space-y-4">
                    {dayItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-sand-200/60 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 shadow-sm hover:border-primary-100 transition-colors"
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                              item.type === "Heritage" ? "bg-indigo-50 text-indigo-700 border border-indigo-150" :
                              item.type === "Culinary" ? "bg-amber-50 text-amber-700 border border-amber-150" :
                              item.type === "Craft" ? "bg-emerald-50 text-emerald-700 border border-emerald-150" :
                              "bg-purple-50 text-purple-700 border border-purple-150"
                            }`}>
                              {item.type}
                            </span>
                            <span className="text-xs text-sand-400 font-medium">{item.location}</span>
                          </div>
                          
                          <h4 className="font-bold text-base text-sand-900">{item.name}</h4>
                          
                          {/* Note Input */}
                          <input
                            type="text"
                            placeholder="Add planning notes (e.g., Book tickets, Wear comfortable shoes)..."
                            value={item.note || ""}
                            onChange={(e) => onUpdateItemNote(item.id, e.target.value)}
                            className="w-full text-xs text-sand-500 bg-transparent border-b border-transparent hover:border-sand-200 focus:border-primary-500 focus:outline-none py-0.5"
                          />
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2 self-end sm:self-start">
                          <label htmlFor={`day-select-${item.id}`} className="sr-only">Change Day</label>
                          <select
                            id={`day-select-${item.id}`}
                            value={item.day}
                            onChange={(e) => onUpdateItemDay(item.id, Number(e.target.value))}
                            className="p-1 border border-sand-200 rounded-lg text-xs focus:outline-none focus:border-primary-500 bg-sand-50"
                          >
                            {days.map((d) => (
                              <option key={d} value={d}>Day {d}</option>
                            ))}
                          </select>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 text-sand-400 hover:text-red-500 transition-colors focus:ring-2 focus:ring-red-500 rounded-md"
                            aria-label={`Remove ${item.name} from itinerary`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
