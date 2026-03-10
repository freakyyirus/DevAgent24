'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, MapPin, Calendar, Clock, Sparkles, Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

interface Itinerary {
  destination: string;
  days: { day: number; title: string; activities: string[] }[];
}

const SAMPLE_ITINERARY: Itinerary = {
  destination: 'San Francisco, CA',
  days: [
    { day: 1, title: 'Arrival & Tech District',
      activities: ['Check in at hotel near SoMa', 'Walk through SOMA tech district', 'Visit the Computer History Museum (optional)', 'Dinner at a local favorite near Union Square'] },
    { day: 2, title: 'Interview Day',
      activities: ['Morning prep with DevAgent mock interview', 'On-site interview at company HQ', 'Debrief walk along Embarcadero', 'Celebrate at a rooftop bar'] },
    { day: 3, title: 'Explore & Depart',
      activities: ['Golden Gate Bridge morning walk', 'Brunch in the Mission District', 'Last-minute shopping', 'Airport transfer'] },
  ],
};

export default function TravelPage() {
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('tech-interview');
  const [days, setDays] = useState('3');
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  const handleGenerate = async () => {
    if (!destination.trim()) { toast.error('Please enter a destination'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 2500));
    setItinerary({ ...SAMPLE_ITINERARY, destination: destination || 'San Francisco, CA' });
    setLoading(false);
    toast.success('Itinerary generated!');
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 4 }}>
          <Plane size={28} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 10, color: '#10b981' }} />
          Interview Travel Planner
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>AI-powered itinerary for your on-site interviews. AgentVerse feature.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Input */}
        <div className="glass-card" style={{ padding: 28 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><MapPin size={18} color="#10b981" /> Plan Your Trip</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Destination</label>
              <input type="text" placeholder="e.g. San Francisco, CA" value={destination} onChange={e => setDestination(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Purpose</label>
              <select value={purpose} onChange={e => setPurpose(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                <option value="tech-interview" style={{ background: '#1a1a2e' }}>Tech Interview</option>
                <option value="conference" style={{ background: '#1a1a2e' }}>Tech Conference</option>
                <option value="hackathon" style={{ background: '#1a1a2e' }}>Hackathon</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Number of Days</label>
              <input type="number" min="1" max="14" value={days} onChange={e => setDays(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none' }} />
            </div>
            <button onClick={handleGenerate} className="btn-primary" style={{ marginTop: 8 }} disabled={loading}>
              {loading ? <><Loader2 size={16} style={{ animation: 'spin-slow 1s linear infinite' }} /> Generating...</> : <><Sparkles size={16} /> Generate Itinerary</>}
            </button>
          </div>
        </div>

        {/* Result */}
        <div>
          {itinerary ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: 28 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 4 }}>{itinerary.destination}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 20 }}>{itinerary.days.length}-day itinerary • Tech Interview Trip</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {itinerary.days.map(day => (
                  <div key={day.day}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#34d399' }}>{day.day}</div>
                      <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>{day.title}</h4>
                    </div>
                    <div style={{ paddingLeft: 36, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {day.activities.map((a, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-muted)', flexShrink: 0 }} />
                          {a}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="glass-card" style={{ padding: 60, textAlign: 'center', color: 'var(--text-muted)' }}>
              <Plane size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
              <p>Enter your destination and generate an AI-powered itinerary.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
