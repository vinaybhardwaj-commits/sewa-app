import { useState } from 'react';
import { ROOM_QR_MAP, LOCATION_QR_MAP, PERSON_QR_MAP, DEPT_QR_MAP } from '../qrConfig';

/**
 * QR Code Generator Component
 * Admin tool for generating and managing QR codes
 */
export const QRGenerator = () => {
  const [activeTab, setActiveTab] = useState('room');
  const [selectedId, setSelectedId] = useState('');

  // Get the base URL (adapt to your deployment)
  const baseUrl = window.location.origin;

  const getUrlForQr = (type, id) => {
    return `${baseUrl}?type=${type}&id=${id}`;
  };

  const getPreviewLabel = () => {
    if (activeTab === 'room') {
      const room = ROOM_QR_MAP[selectedId];
      return room ? room.room : 'Select a room';
    } else if (activeTab === 'location') {
      const loc = LOCATION_QR_MAP[selectedId];
      return loc ? loc.name : 'Select a location';
    } else if (activeTab === 'person') {
      const person = PERSON_QR_MAP[selectedId];
      return person ? person.name : 'Select a person';
    } else if (activeTab === 'dept') {
      const dept = DEPT_QR_MAP[selectedId];
      return dept ? dept.name : 'Select a department';
    }
    return '';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('URL copied to clipboard!');
  };

  const openInNewTab = (url) => {
    window.open(url, '_blank');
  };

  const TabContent = () => {
    if (activeTab === 'room') {
      return (
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700' }}>
            Select Room
          </h3>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              marginBottom: '16px',
              fontSize: '13px',
              fontFamily: 'inherit',
            }}
          >
            <option value="">Choose a room...</option>
            {Object.entries(ROOM_QR_MAP).map(([id, room]) => (
              <option key={id} value={id}>
                {room.room} - {room.type}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              const allRoomUrls = Object.entries(ROOM_QR_MAP)
                .map(([id]) => getUrlForQr('room', id))
                .join('\n');
              const link = document.createElement('a');
              link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(allRoomUrls);
              link.download = 'room-qr-codes.txt';
              link.click();
            }}
            style={{
              width: '100%',
              padding: '12px',
              background: '#1a6bf0',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '24px',
            }}
          >
            Print All Room QR Codes
          </button>
        </div>
      );
    } else if (activeTab === 'location') {
      return (
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700' }}>
            Select Location
          </h3>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              marginBottom: '16px',
              fontSize: '13px',
              fontFamily: 'inherit',
            }}
          >
            <option value="">Choose a location...</option>
            {Object.entries(LOCATION_QR_MAP).map(([id, loc]) => (
              <option key={id} value={id}>
                {loc.icon} {loc.name}
              </option>
            ))}
          </select>
        </div>
      );
    } else if (activeTab === 'person') {
      return (
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700' }}>
            Select Person
          </h3>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              marginBottom: '16px',
              fontSize: '13px',
              fontFamily: 'inherit',
            }}
          >
            <option value="">Choose a person...</option>
            {Object.entries(PERSON_QR_MAP).map(([id, person]) => (
              <option key={id} value={id}>
                {person.icon} {person.name}
              </option>
            ))}
          </select>
        </div>
      );
    } else if (activeTab === 'dept') {
      return (
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700' }}>
            Select Department
          </h3>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              marginBottom: '16px',
              fontSize: '13px',
              fontFamily: 'inherit',
            }}
          >
            <option value="">Choose a department...</option>
            {Object.entries(DEPT_QR_MAP).map(([id, dept]) => (
              <option key={id} value={id}>
                {dept.icon} {dept.name}
              </option>
            ))}
          </select>
        </div>
      );
    }
  };

  const url = selectedId ? getUrlForQr(activeTab, selectedId) : '';

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', paddingBottom: '24px' }}>
      {/* Header */}
      <div style={{ background: 'white', padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '700' }}>
          QR Code Generator
        </h2>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', fontSize: '12px' }}>
          {['room', 'location', 'person', 'dept'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedId('');
              }}
              style={{
                background: activeTab === tab ? '#1a6bf0' : 'white',
                color: activeTab === tab ? 'white' : '#666',
                border: activeTab === tab ? 'none' : '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '6px 12px',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? '600' : '500',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ background: 'white', margin: '16px' }}>
        <TabContent />

        {/* URL Preview & Actions */}
        {selectedId && (
          <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '700', color: '#666', textTransform: 'uppercase' }}>
              Generated URL
            </h3>

            <div
              style={{
                background: '#f3f4f6',
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '12px',
                fontSize: '11px',
                fontFamily: 'monospace',
                wordBreak: 'break-all',
                overflowY: 'auto',
                maxHeight: '80px',
                border: '1px solid #e5e7eb',
              }}
            >
              {url}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              <button
                onClick={() => copyToClipboard(url)}
                style={{
                  padding: '8px 12px',
                  background: '#1a6bf0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Copy URL
              </button>
              <button
                onClick={() => openInNewTab(url)}
                style={{
                  padding: '8px 12px',
                  background: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Open in New Tab
              </button>
            </div>

            <div style={{ background: '#f0f9ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '12px', fontSize: '12px', color: '#1e40af' }}>
              To generate a QR code: Use a QR code generator online (e.g., qr-code-generator.com) and paste the URL above. Print the QR code and place it at the location.
            </div>

            <h3 style={{ margin: '16px 0 12px', fontSize: '13px', fontWeight: '700', color: '#666', textTransform: 'uppercase' }}>
              Preview
            </h3>
            <div
              style={{
                background: '#f9fafb',
                padding: '12px',
                borderRadius: '6px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>
                {activeTab === 'room'
                  ? '🛏️'
                  : activeTab === 'location'
                  ? LOCATION_QR_MAP[selectedId]?.icon
                  : activeTab === 'person'
                  ? PERSON_QR_MAP[selectedId]?.icon
                  : DEPT_QR_MAP[selectedId]?.icon}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>
                {getPreviewLabel()}
              </div>
              <div style={{ fontSize: '11px', color: '#666' }}>
                {activeTab === 'room'
                  ? `Type: Room`
                  : activeTab === 'location'
                  ? `Type: Location`
                  : activeTab === 'person'
                  ? `Type: Person`
                  : `Type: Department`}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* All QR Codes List */}
      <div style={{ background: 'white', margin: '16px', borderRadius: '8px' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0', fontSize: '14px', fontWeight: '700' }}>
            All Configured QR Codes
          </h3>
        </div>

        <div style={{ padding: '16px' }}>
          {/* Rooms */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '700', color: '#666' }}>
              Rooms
            </h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              {Object.entries(ROOM_QR_MAP).map(([id, room]) => (
                <div
                  key={id}
                  style={{
                    background: '#f9fafb',
                    padding: '10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600' }}>{room.room}</div>
                    <div style={{ color: '#666', fontSize: '10px' }}>{room.type}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(getUrlForQr('room', id))}
                    style={{
                      padding: '4px 8px',
                      background: 'white',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '700', color: '#666' }}>
              Locations
            </h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              {Object.entries(LOCATION_QR_MAP).map(([id, loc]) => (
                <div
                  key={id}
                  style={{
                    background: '#f9fafb',
                    padding: '10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600' }}>
                      {loc.icon} {loc.name}
                    </div>
                    <div style={{ color: '#666', fontSize: '10px' }}>{loc.subtitle}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(getUrlForQr('location', id))}
                    style={{
                      padding: '4px 8px',
                      background: 'white',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* People */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '700', color: '#666' }}>
              People
            </h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              {Object.entries(PERSON_QR_MAP).map(([id, person]) => (
                <div
                  key={id}
                  style={{
                    background: '#f9fafb',
                    padding: '10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600' }}>
                      {person.icon} {person.name}
                    </div>
                    <div style={{ color: '#666', fontSize: '10px' }}>{person.title}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(getUrlForQr('person', id))}
                    style={{
                      padding: '4px 8px',
                      background: 'white',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Departments */}
          <div>
            <h4 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '700', color: '#666' }}>
              Departments
            </h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              {Object.entries(DEPT_QR_MAP).map(([id, dept]) => (
                <div
                  key={id}
                  style={{
                    background: '#f9fafb',
                    padding: '10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600' }}>
                      {dept.icon} {dept.name}
                    </div>
                    <div style={{ color: '#666', fontSize: '10px' }}>{dept.subtitle}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(getUrlForQr('dept', id))}
                    style={{
                      padding: '4px 8px',
                      background: 'white',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
