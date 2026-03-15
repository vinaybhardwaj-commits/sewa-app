import { useState } from 'react';
import { createRequest } from '../api';
import { Toast } from './Toast';

/**
 * Person View Component
 * Personalized feedback/reporting page for specific staff members
 */
export const PersonView = ({ config, onShowToast }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [freeText, setFreeText] = useState('');
  const [name, setName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!roomNumber.trim()) newErrors.roomNumber = 'Room number is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (selectedCategories.length === 0)
      newErrors.categories = 'Please select at least one category';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      onShowToast('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const categoryNames = selectedCategories
        .map((id) => {
          const cat = config.categories.find((c) => c.id === id);
          return cat?.name || id;
        })
        .join(', ');

      const firstCat = config.categories.find((c) => c.id === selectedCategories[0]);
      const dept = firstCat?.dept || 'Service';
      const assignee = config.name;
      const slaMin = firstCat?.slaMin || 60;

      const description = freeText.trim()
        ? `${categoryNames}\n\nDetails: ${freeText}`
        : categoryNames;

      await createRequest({
        service: description,
        hub: `To: ${config.name}`,
        dept,
        assignee,
        slaMin,
        source: `Person QR: ${config.name}`,
        customerName: name,
        customerRoom: roomNumber,
        customerPhone: phone,
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
          Message Sent
        </h1>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
          {config.name} will review your message shortly.
        </p>
        <div
          style={{
            background: `${config.color}15`,
            border: `2px solid ${config.color}`,
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
              color: config.color,
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
      {/* Header with Person Info */}
      <div
        style={{
          background: `linear-gradient(135deg, ${config.color}15 0%, ${config.color}08 100%)`,
          borderBottom: `4px solid ${config.color}`,
          padding: '32px 16px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '56px', marginBottom: '12px' }}>
          {config.icon}
        </div>
        <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '700' }}>
          {config.name}
        </h1>
        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#666' }}>
          {config.title}
        </p>
        <p
          style={{
            margin: '0',
            fontSize: '13px',
            fontStyle: 'italic',
            color: config.color,
            lineHeight: '1.4',
          }}
        >
          {config.introMessage}
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 16px' }}>
        {/* Categories */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700' }}>
            What's your concern?
          </h2>
          {errors.categories && (
            <div style={{ fontSize: '12px', color: '#dc2626', marginBottom: '8px' }}>
              {errors.categories}
            </div>
          )}
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
                    ? config.color
                    : 'white',
                  color: selectedCategories.includes(cat.id) ? 'white' : '#333',
                  border: `2px solid ${config.color}`,
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
              💬 Tell us more (optional)
            </h2>
            <textarea
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              placeholder="Add any additional details..."
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

        {/* Identification (Required) */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700' }}>
            👤 Your Information *
          </h2>
          <div style={{ marginBottom: '12px' }}>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, name: '' }));
                }
              }}
              placeholder="Your Name *"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.name ? '2px solid #dc2626' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '13px',
                boxSizing: 'border-box',
              }}
            />
            {errors.name && (
              <div style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>
                {errors.name}
              </div>
            )}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <input
              type="text"
              value={roomNumber}
              onChange={(e) => {
                setRoomNumber(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, roomNumber: '' }));
                }
              }}
              placeholder="Room Number *"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.roomNumber ? '2px solid #dc2626' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '13px',
                boxSizing: 'border-box',
              }}
            />
            {errors.roomNumber && (
              <div style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>
                {errors.roomNumber}
              </div>
            )}
          </div>
          <div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, phone: '' }));
                }
              }}
              placeholder="Phone Number *"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.phone ? '2px solid #dc2626' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '13px',
                boxSizing: 'border-box',
              }}
            />
            {errors.phone && (
              <div style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>
                {errors.phone}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: loading ? '#d1d5db' : config.color,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {loading ? 'Sending...' : 'Send Message'}
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

export default PersonView;
