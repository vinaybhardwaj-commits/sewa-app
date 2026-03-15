import { useState } from 'react';
import { createRequest } from '../api';
import { Toast } from './Toast';

/**
 * Location View Component
 * Custom page for location-specific QR codes
 * Allows feedback and issue reporting for specific locations
 */
export const LocationView = ({ config, onShowToast }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [freeText, setFreeText] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (selectedCategories.length === 0) {
      onShowToast('Please select at least one category');
      return;
    }

    if (config.requireIdentification && (!name.trim() || !phone.trim())) {
      onShowToast('Please provide your name and phone number');
      return;
    }

    setLoading(true);

    try {
      // Get category names for service description
      const categoryNames = selectedCategories
        .map((id) => {
          const cat = config.categories.find((c) => c.id === id);
          return cat?.name || id;
        })
        .join(', ');

      // Get department and assignee from first selected category
      const firstCat = config.categories.find((c) => c.id === selectedCategories[0]);
      const dept = firstCat?.dept || 'Service';
      const assignee = firstCat?.assignee || 'Amit';
      const slaMin = firstCat?.slaMin || 60;

      const description = freeText.trim()
        ? `${categoryNames}\n\nDetails: ${freeText}`
        : categoryNames;

      await createRequest({
        service: description,
        hub: config.name,
        dept,
        assignee,
        slaMin,
        source: `Location QR: ${config.name}`,
        ...(config.requireIdentification && {
          customerName: name,
          customerPhone: phone,
        }),
      });

      const newTicket = Math.floor(2000 + Math.random() * 1000);
      setTicketNumber(newTicket);
      setSubmitted(true);
      onShowToast(`Request submitted! Ticket #${newTicket}`);
    } catch (error) {
      console.error('Error submitting request:', error);
      onShowToast('Error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          maxWidth: '480px',
          margin: '0 auto',
          background: '#fff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
          Request Submitted
        </h1>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
          Thank you for reporting. We'll address this shortly.
        </p>
        <div
          style={{
            background: config.bg || '#f0f9ff',
            border: `2px solid ${config.color || '#0369a1'}`,
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            width: '100%',
          }}
        >
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            Ticket Number
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: config.color || '#0369a1',
            }}
          >
            #{ticketNumber}
          </div>
        </div>
        <p style={{ fontSize: '12px', color: '#999' }}>
          Keep this number for your records
        </p>
        <div
          style={{
            marginTop: '32px',
            fontSize: '12px',
            color: '#999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          Powered by Sewa | Even Healthcare
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '480px',
        margin: '0 auto',
        background: '#fff',
        minHeight: '100vh',
        paddingBottom: '80px',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: config.bg || '#f0f9ff',
          borderBottom: `4px solid ${config.color || '#0369a1'}`,
          padding: '24px 16px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>
          {config.icon}
        </div>
        <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: '700' }}>
          {config.name}
        </h1>
        <p style={{ margin: '0', fontSize: '13px', color: '#666' }}>
          {config.subtitle}
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 16px' }}>
        {/* Categories */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700' }}>
            What's the issue?
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
            }}
          >
            {config.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                style={{
                  background: selectedCategories.includes(cat.id)
                    ? config.color || '#0369a1'
                    : 'white',
                  color: selectedCategories.includes(cat.id) ? 'white' : '#333',
                  border: `2px solid ${config.color || '#0369a1'}`,
                  borderRadius: '8px',
                  padding: '12px',
                  minHeight: '56px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '20px' }}>{cat.icon}</span>
                <span style={{ lineHeight: '1.2' }}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Photo Upload */}
        {config.allowPhoto && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700' }}>
              📸 Add a Photo (optional)
            </h2>
            <label
              style={{
                display: 'block',
                background: '#f3f4f6',
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    borderRadius: '6px',
                  }}
                />
              ) : (
                <>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>📷</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Tap to take a photo or upload
                  </div>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        )}

        {/* Free Text */}
        {config.allowFreeText && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700' }}>
              💬 Additional Details (optional)
            </h2>
            <textarea
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              placeholder="Describe the issue..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '13px',
                fontFamily: 'inherit',
                minHeight: '80px',
                boxSizing: 'border-box',
                resize: 'vertical',
              }}
            />
          </div>
        )}

        {/* Identification */}
        {config.requireIdentification && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700' }}>
              👤 Your Information
            </h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '13px',
                marginBottom: '12px',
                boxSizing: 'border-box',
              }}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '13px',
                boxSizing: 'border-box',
              }}
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={selectedCategories.length === 0 || loading}
          style={{
            width: '100%',
            padding: '14px',
            background:
              selectedCategories.length === 0 || loading
                ? '#d1d5db'
                : config.color || '#0369a1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: selectedCategories.length === 0 || loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </div>

      {/* Footer */}
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
    </div>
  );
};

export default LocationView;
