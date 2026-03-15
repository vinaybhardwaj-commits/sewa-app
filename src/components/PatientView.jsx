import { useState } from 'react';
import { SERVICE_HUBS, EMERGENCY_SERVICE } from '../config';
import { BottomSheet } from './BottomSheet';
import { SLABar } from './SLABar';

/**
 * Patient View Component
 * Allows patients to request services and view their requests
 */
export const PatientView = ({ requests, onAddRequest, now, roomInfo, hideToggle, onShowToast }) => {
  const [selectedHubTab, setSelectedHubTab] = useState(null);
  const [otherText, setOtherText] = useState('');

  const activeRequests = requests.filter(
    (r) => r.status === 'NEW' || r.status === 'IN_PROGRESS'
  );
  const resolvedRequests = requests.filter((r) => r.status === 'RESOLVED');

  // Find selected hub data
  const selectedHub = SERVICE_HUBS.find((h) => h.name === selectedHubTab);

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1a6bf0 0%, #0c4dba 100%)',
          color: 'white',
          padding: '24px 16px 16px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '4px' }}>💙</div>
        <h1 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '700' }}>
          Even Healthcare
        </h1>
        <p style={{ margin: '0 0 12px', fontSize: '14px', opacity: 0.9 }}>
          {roomInfo ? `Room ${roomInfo.room} · Bengaluru` : 'Room 215a · Bengaluru'}
        </p>
        <select
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          <option>English</option>
          <option>हिन्दी</option>
          <option>ಕನ್ನಡ</option>
        </select>
      </div>

      {/* Emergency Button */}
      <div style={{ padding: '12px 16px' }}>
        <button
          onClick={() => {
            onAddRequest(EMERGENCY_SERVICE.name, EMERGENCY_SERVICE.hub);
          }}
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            animation: 'pulse-emergency 2s infinite',
          }}
        >
          🆘 I Need Help Now
        </button>
      </div>

      {/* Service Hubs Grid */}
      <div style={{ padding: '16px' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '700' }}>
          Service Hubs
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          {SERVICE_HUBS.map((hub) => (
            <button
              key={hub.id}
              onClick={() => setSelectedHubTab(hub.name)}
              style={{
                background: 'white',
                border: `4px solid ${hub.color}`,
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                minHeight: '120px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '32px' }}>{hub.icon}</div>
              <h3 style={{ margin: '0', fontSize: '14px', fontWeight: '700' }}>
                {hub.name}
              </h3>
              <p style={{ margin: '0', fontSize: '12px', color: '#666', lineHeight: '1.3' }}>
                {hub.description}
              </p>
            </button>
          ))}
        </div>

        {/* Custom Request Section */}
        <div style={{ padding: '16px', background: 'white', borderRadius: '12px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700' }}>
            💬 Something else?
          </h3>
          <textarea
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder="Tell us what you need..."
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit',
              marginBottom: '12px',
              minHeight: '80px',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={() => {
              if (otherText.trim()) {
                onAddRequest(otherText, 'Other');
                setOtherText('');
              }
            }}
            style={{
              width: '100%',
              padding: '12px',
              background: '#1a6bf0',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Send Request
          </button>
        </div>
      </div>

      {/* Bottom Sheet for Service Selection */}
      <BottomSheet
        isOpen={!!selectedHubTab}
        onClose={() => setSelectedHubTab(null)}
        title={selectedHubTab || ''}
      >
        {selectedHub && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              padding: '12px',
            }}
          >
            {selectedHub.services.map((svc) => (
              <button
                key={svc.id}
                onClick={() => {
                  onAddRequest(svc.name, selectedHubTab);
                  setSelectedHubTab(null);
                }}
                style={{
                  background: '#f5f5f5',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontSize: '12px',
                  minHeight: '60px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '24px' }}>{svc.icon}</span>
                <span style={{ fontWeight: '600' }}>{svc.name}</span>
              </button>
            ))}
          </div>
        )}
      </BottomSheet>

      {/* Footer for QR mode */}
      {hideToggle && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            maxWidth: '480px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '12px',
            fontSize: '11px',
            color: '#999',
            background: 'white',
            borderTop: '1px solid #e5e7eb',
          }}
        >
          Powered by Sewa | Even Healthcare
        </div>
      )}
    </div>
  );
};

export default PatientView;
