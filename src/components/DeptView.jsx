import { useState } from 'react';
import { createRequest } from '../api';
import { Toast } from './Toast';

/**
 * Department View Component
 * Internal staff reporting for department-specific needs
 */
export const DeptView = ({ config, onShowToast }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [freeText, setFreeText] = useState('');
  const [staffName, setStaffName] = useState('');
  const [department, setDepartment] = useState('');
  const [employeeId, setEmployeeId] = useState('');
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

    if (!staffName.trim()) newErrors.staffName = 'Name is required';
    if (!department.trim()) newErrors.department = 'Department is required';
    if (!employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
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
      const deptAssigned = firstCat?.dept || 'Service';
      const assignee = firstCat?.assignee || 'Amit';
      const slaMin = firstCat?.slaMin || 60;

      const description = freeText.trim()
        ? `${categoryNames}\n\nDetails: ${freeText}`
        : categoryNames;

      await createRequest({
        service: description,
        hub: config.name,
        dept: deptAssigned,
        assignee,
        slaMin,
        source: `Dept QR: ${config.name}`,
        staffName,
        staffDept: department,
        staffEmployeeId: employeeId,
      });

      const newTicket = Math.floor(2000 + Math.random() * 1000);
      setTicketNumber(newTicket);
      setSubmitted(true);
      onShowToast(`Report submitted! Ticket #${newTicket}`);
    } catch (error) {
      console.error('Error submitting report:', error);
      onShowToast('Error submitting report. Please try again.');
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
          Report Submitted
        </h1>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
          Your internal report has been logged.
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
          Reference for tracking
        </p>
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
          background: `linear-gradient(135deg, ${config.color}20 0%, ${config.color}10 100%)`,
          borderBottom: `4px solid ${config.color}`,
          padding: '24px 16px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
          Internal Report
        </div>
        <div style={{ fontSize: '40px', marginBottom: '8px' }}>
          {config.icon}
        </div>
        <h1 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '700' }}>
          {config.name}
        </h1>
        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
          {config.subtitle}
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 16px' }}>
        {/* Categories */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700' }}>
            What do you need?
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
              📸 Attach Photo (optional)
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
                    Tap to attach a photo
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
              💬 Additional Notes (optional)
            </h2>
            <textarea
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              placeholder="Add details..."
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

        {/* Staff Identification */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700' }}>
            👤 Your Details *
          </h2>
          <div style={{ marginBottom: '12px' }}>
            <input
              type="text"
              value={staffName}
              onChange={(e) => {
                setStaffName(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, staffName: '' }));
                }
              }}
              placeholder="Your Name *"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.staffName ? '2px solid #dc2626' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '13px',
                boxSizing: 'border-box',
              }}
            />
            {errors.staffName && (
              <div style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>
                {errors.staffName}
              </div>
            )}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <input
              type="text"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, department: '' }));
                }
              }}
              placeholder="Your Department *"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.department ? '2px solid #dc2626' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '13px',
                boxSizing: 'border-box',
              }}
            />
            {errors.department && (
              <div style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>
                {errors.department}
              </div>
            )}
          </div>
          <div>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => {
                setEmployeeId(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, employeeId: '' }));
                }
              }}
              placeholder="Employee ID *"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.employeeId ? '2px solid #dc2626' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '13px',
                boxSizing: 'border-box',
              }}
            />
            {errors.employeeId && (
              <div style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>
                {errors.employeeId}
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
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </div>
    </div>
  );
};

export default DeptView;
