/**
 * SLA Progress Bar Component
 * Shows remaining time with color coding (green > yellow > red)
 */
export const SLABar = ({ deadline, slaMinutes, raisedAt }) => {
  const now = new Date();
  const minutesPassed = Math.floor((now - raisedAt) / 60000);
  const minutesRemaining = Math.max(0, slaMinutes - minutesPassed);
  const slaPercent = Math.max(0, minutesRemaining / slaMinutes);

  // Color coding: green > 50%, yellow 25-50%, red < 25%
  const slaColor = slaPercent > 0.5 ? '#10b981' : slaPercent > 0.25 ? '#f59e0b' : '#dc2626';

  return (
    <div style={{ marginBottom: '12px' }}>
      <div
        style={{
          background: '#e5e7eb',
          height: '6px',
          borderRadius: '3px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: slaColor,
            width: `${slaPercent * 100}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#666' }}>
        {minutesRemaining} min remaining · Updated {minutesPassed} min ago
      </p>
    </div>
  );
};

export default SLABar;
