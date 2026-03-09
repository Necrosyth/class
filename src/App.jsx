import React, { useState, useEffect } from 'react';
import './index.css';

const VIBES = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'cool', emoji: '😎', label: 'Cool' },
  { id: 'energetic', emoji: '⚡', label: 'Energetic' },
  { id: 'chill', emoji: '☁️', label: 'Chill' },
  { id: 'loving', emoji: '🥰', label: 'Loving' },
  { id: 'productive', emoji: '🚀', label: 'Productive' },
  { id: 'tired', emoji: '😴', label: 'Tired' },
  { id: 'thoughtful', emoji: '🤔', label: 'Thoughtful' },
];

function App() {
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const savedVibe = localStorage.getItem('dailyVibe');
    const savedDate = localStorage.getItem('vibeDate');
    const today = new Date().toISOString().split('T')[0];

    if (savedVibe && savedDate === today) {
      setSelectedVibe(JSON.parse(savedVibe));
      setSelectedDate(savedDate);
    } else if (savedDate && savedDate !== today) {
      // Clear old vibe if it's a new day
      localStorage.removeItem('dailyVibe');
      localStorage.removeItem('vibeDate');
    }
  }, []);

  const handleSelectVibe = (vibe) => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedVibe(vibe);
    setSelectedDate(today);
    localStorage.setItem('dailyVibe', JSON.stringify(vibe));
    localStorage.setItem('vibeDate', today);
  };

  const handleReset = () => {
    setSelectedVibe(null);
    setSelectedDate(null);
    localStorage.removeItem('dailyVibe');
    localStorage.removeItem('vibeDate');
  };

  return (
    <div className="container">
      <header>
        <h1>Vibe Check</h1>
        <p className="subtitle">How are you feeling today?</p>
      </header>

      <main>
        <div className="emoji-grid">
          {VIBES.map((vibe) => (
            <button
              key={vibe.id}
              className={`emoji-btn ${selectedVibe?.id === vibe.id ? 'selected' : ''}`}
              onClick={() => handleSelectVibe(vibe)}
              aria-label={vibe.label}
              title={vibe.label}
            >
              {vibe.emoji}
            </button>
          ))}
        </div>

        <div className="status-card">
          <span className="status-label">Your Daily Vibe</span>
          <p className="status-text">
            {selectedVibe ? (
              <>
                You're feeling <span className="vibe-selected">{selectedVibe.label} {selectedVibe.emoji}</span>
                <br />
                <small style={{ color: 'var(--text-secondary)', fontWeight: 'normal', fontSize: '0.9rem' }}>
                  Selected on: {selectedDate}
                </small>
              </>
            ) : (
              "No vibe selected yet for today."
            )}
          </p>
        </div>

        {selectedVibe && (
          <button className="reset-btn" onClick={handleReset}>
            <span>🔄</span> Reset Vibe
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
