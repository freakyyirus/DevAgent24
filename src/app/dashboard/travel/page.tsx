'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, MapPin, Calendar, Clock, Sparkles, Loader2, Send, CheckCircle2 } from 'lucide-react';
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
    if (!destination.trim()) {
      toast.error('Please enter a destination');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/travel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, days, purpose }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate itinerary');
      }

      const data = await response.json();
      setItinerary(data);
      toast.success('Itinerary generated!');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Failed to generate your itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
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

      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: 'var(--space-400)' 
        }}
      >
        {/* Input */}
        <div className="card-flat" style={{ padding: 'var(--space-400)' }}>
          <h3 style={{ fontWeight: 700, marginBottom: 'var(--space-300)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={18} color="#10b981" /> Plan Your Trip
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
            <div>
              <label style={{ fontSize: 'var(--size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-100)', display: 'block' }}>Destination</label>
              <input 
                type="text" 
                placeholder="e.g. San Francisco, CA" 
                value={destination} 
                onChange={e => setDestination(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  borderRadius: 'var(--radius-sm)', 
                  background: 'rgba(255,255,255,0.04)', 
                  border: '1px solid var(--color-border)', 
                  color: 'var(--color-text)', 
                  fontSize: 'var(--size-small)', 
                  outline: 'none' 
                }} 
              />
            </div>
            <div>
              <label style={{ fontSize: 'var(--size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-100)', display: 'block' }}>Purpose</label>
              <select 
                value={purpose} 
                onChange={e => setPurpose(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  borderRadius: 'var(--radius-sm)', 
                  background: 'rgba(255,255,255,0.04)', 
                  border: '1px solid var(--color-border)', 
                  color: 'var(--color-text)', 
                  fontSize: 'var(--size-small)' 
                }}
              >
                <option value="tech-interview" style={{ background: '#1a1a2e' }}>Tech Interview</option>
                <option value="conference" style={{ background: '#1a1a2e' }}>Tech Conference</option>
                <option value="hackathon" style={{ background: '#1a1a2e' }}>Hackathon</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 'var(--size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-100)', display: 'block' }}>Number of Days</label>
              <input 
                type="number" 
                min="1" 
                max="14" 
                value={days} 
                onChange={e => setDays(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  borderRadius: 'var(--radius-sm)', 
                  background: 'rgba(255,255,255,0.04)', 
                  border: '1px solid var(--color-border)', 
                  color: 'var(--color-text)', 
                  fontSize: 'var(--size-small)', 
                  outline: 'none' 
                }} 
              />
            </div>
            <button 
              onClick={handleGenerate} 
              className="btn-primary" 
              style={{ marginTop: 'var(--space-100)', padding: '12px' }} 
              disabled={loading}
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Generating...</> : <><Sparkles size={16} /> Generate Itinerary</>}
            </button>
          </div>
        </div>

        {/* Result */}
        <div style={{ minWidth: 0 }}>
          {itinerary ? (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="card-flat" style={{ padding: 'var(--space-400)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-300)' }}>
                <div>
                  <h3 style={{ fontSize: 'var(--size-h4)', fontWeight: 800 }}>{itinerary.destination}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--size-xs)' }}>{itinerary.days.length}-day itinerary • Tech Interview Trip</p>
                </div>
                <div style={{ padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'rgba(16,185,129,0.1)', color: '#10b981', fontSize: '10px', fontWeight: 700 }}>VERIFIED</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-300)' }}>
                {itinerary.days.map(day => (
                  <div key={day.day}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--space-150)' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--size-xs)', fontWeight: 800, color: '#10b981' }}>{day.day}</div>
                      <h4 style={{ fontWeight: 700, fontSize: 'var(--size-small)', letterSpacing: '-0.01em' }}>{day.title}</h4>
                    </div>
                    <div style={{ paddingLeft: 44, display: 'flex', flexDirection: 'column', gap: 'var(--space-100)' }}>
                      {day.activities.map((a, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'start', gap: 10, fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                          <CheckCircle2 size={14} style={{ marginTop: 2, flexShrink: 0, color: '#10b981', opacity: 0.5 }} />
                          {a}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="card-flat" style={{ padding: 'var(--space-800)', textAlign: 'center', color: 'var(--color-text-muted)', borderStyle: 'dashed' }}>
              <Plane size={48} style={{ marginBottom: 16, opacity: 0.2, margin: '0 auto' }} />
              <p style={{ fontSize: 'var(--size-small)' }}>Enter your destination and generate an AI-powered itinerary.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
