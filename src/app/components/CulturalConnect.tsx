"use client";

import React, { useState } from "react";
import { LocalConnection } from "../api/explore/simulatedData";
import { Mail, Calendar, Users, Send, CheckCircle2, MessageSquare } from "lucide-react";

interface CulturalConnectProps {
  connections: LocalConnection[];
}

export default function CulturalConnect({ connections }: CulturalConnectProps) {
  const [selectedHost, setSelectedHost] = useState<LocalConnection | null>(null);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHost || !date) return;

    setSending(true);
    // Simulate API connection request
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedHost(null);
        setDate("");
        setGuests("1");
        setMessage("");
      }, 3500);
    }, 1500);
  };

  if (!connections || connections.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-sand-200 p-6">
        <MessageSquare className="w-12 h-12 text-sand-300 mx-auto mb-3" />
        <h3 className="font-semibold text-lg text-sand-800">No local hosts registered in this region yet.</h3>
        <p className="text-sm text-sand-500 max-w-md mx-auto mt-1">
          We are currently working with regional tourism councils to register heritage keepers and local guides.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-serif text-sand-900">Connect with Authentic Hosts</h2>
        <p className="text-sand-600 text-sm mt-1">
          Support local micro-economies directly. Book workshops, lessons, and walking tours curated by local cultural keepers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Host cards */}
        {connections.map((host) => (
          <div 
            key={host.id}
            className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-sand-200/50 bg-white"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-3xl shadow-inner">
                  <span role="img" aria-label={host.role}>{host.avatar}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-sand-900">{host.name}</h3>
                  <span className="inline-block px-2.5 py-0.5 bg-primary-50 border border-primary-200 text-xs font-semibold text-primary-600 rounded-full">
                    {host.role}
                  </span>
                </div>
              </div>

              <p className="text-sm text-sand-600 leading-relaxed italic">
                "{host.bio}"
              </p>

              <div className="pt-3 border-t border-sand-100">
                <span className="text-xs font-semibold uppercase tracking-wider text-sand-400">Offered Experience</span>
                <p className="text-sm font-bold text-sand-800 mt-0.5">{host.experienceType}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-sand-500">
                  <span>Price: <strong className="text-sand-800 font-semibold">{host.price}</strong></span>
                  <span className="text-secondary-600 font-semibold">✓ Local direct compensation</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedHost(host)}
              className="mt-6 w-full py-2.5 bg-secondary-500 text-white font-semibold text-sm rounded-xl hover:bg-secondary-600 active:bg-secondary-700 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-secondary-500 shadow-md shadow-secondary-500/5"
            >
              <Mail className="w-4 h-4" />
              Request Booking Connection
            </button>
          </div>
        ))}
      </div>

      {/* Booking Connection Modal */}
      {selectedHost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md overflow-hidden bg-white rounded-2xl shadow-2xl border border-sand-200 animate-fade-in flex flex-col p-6 space-y-5">
            {success ? (
              <div className="text-center py-8 space-y-3 animate-fade-in">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto text-secondary-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-sand-900">Connection Requested!</h3>
                <p className="text-sm text-sand-600 max-w-xs mx-auto">
                  A verification email has been sent. {selectedHost.name} will review your request and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start border-b border-sand-100 pb-3">
                  <div>
                    <h3 className="font-bold text-lg text-sand-900">Connect with {selectedHost.name}</h3>
                    <p className="text-xs text-sand-500">Experience: {selectedHost.experienceType}</p>
                  </div>
                  <button
                    onClick={() => setSelectedHost(null)}
                    className="p-1 rounded-full text-sand-400 hover:bg-sand-100 hover:text-sand-700 transition-colors focus:ring-2 focus:ring-primary-500"
                    aria-label="Close form"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleConnectSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="booking-date" className="block text-xs font-bold text-sand-600 uppercase tracking-wider mb-1">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-sand-400" />
                      <input
                        id="booking-date"
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-sand-200 rounded-xl text-sm focus:border-primary-500 focus:outline-none bg-sand-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-guests" className="block text-xs font-bold text-sand-600 uppercase tracking-wider mb-1">
                      Number of Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-2.5 w-4 h-4 text-sand-400" />
                      <select
                        id="booking-guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-sand-200 rounded-xl text-sm focus:border-primary-500 focus:outline-none bg-sand-50/50 appearance-none"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5+">5+ People</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-message" className="block text-xs font-bold text-sand-600 uppercase tracking-wider mb-1">
                      Introduce Yourself & Message
                    </label>
                    <textarea
                      id="booking-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="E.g., Hello, I am eager to learn about your craft and share standard customs. I would love to join your class..."
                      className="w-full p-3 border border-sand-200 rounded-xl text-sm focus:border-primary-500 focus:outline-none bg-sand-50/50 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3 bg-primary-500 text-white font-semibold text-sm rounded-xl hover:bg-primary-600 active:bg-primary-700 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Request Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
