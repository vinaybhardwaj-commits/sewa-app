import { useState } from 'react';
import { STAFF_DIRECTORY } from '../config';

/**
 * Staff View Component
 * Allows staff to login, view assigned tasks, and update status
 */
export const StaffView = ({ requests, onAcceptTask, onResolveTask, onAddComment, now }) => {
  const [staffLoggedIn, setStaffLoggedIn] = useState(null);
  const [staffTab, setStaffTab] = useState('dashboard');
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [commentText, setCommentText] = useState('');

  // Login Screen
  if (!staffLoggedIn) {
    const selectableStaff = STAFF_DIRECTORY.slice(0, 6);

    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '24px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>💙</div>
          <h1 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: '700' }}>
            Even Healthcare
          </h1>
          <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
            Select your profile
          </p>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {selectableStaff.map((staff) => (
            <button
              key={staff.id}
              onClick={() => setStaffLoggedIn(staff)}
              style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <h3 style={{ margin: '0', fontSize: '15px', fontWeight: '700' }}>
                {staff.name}
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>
                {staff.dept} · {staff.role}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Get staff-specific requests
  const staffRequests = requests.filter((r) => r.assignee === staffLoggedIn.name);
  const pendingCount = staffRequests.filter((r) => r.status === 'NEW').length;
  const inProgCount = staffRequests.filter((r) => r.status === 'IN_PROGRESS').length;
  const escalatedCount = staffRequests.filter(
    (r) => Math.max(0, r.slaMin - Math.floor((now - r.createdAt) / 60000)) < 5
  ).length;

  const sortedRequests = staffRequests
    .filter((r) => r.status !== 'RESOLVED')
    .sort((a, b) => {
      const remA = Math.max(0, a.slaMin - Math.floor((now - a.createdAt) / 60000));
      const remB = Math.max(0, b.slaMin - Math.floor((now - b.createdAt) / 60000));
      return remA - remB;
    });

  // Task Detail View
  if (selectedRequestId) {
    const req = requests.find((r) => r.id === selectedRequestId);
    if (!req) return null;

    const minPassed = Math.floor((now - req.createdAt) / 60000);
    const minRemaining = Math.max(0, req.slaMin - minPassed);
    const slaPercent = Math.max(0, minRemaining / req.slaMin);
    const slaColor =
      slaPercent > 0.5 ? '#10b981' : slaPercent > 0.25 ? '#f59e0b' : '#dc2626';

    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', paddingBottom: '24px' }}>
        {/* Header */}
        <div
          style={{
            background: 'white',
            padding: '12px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <button
            onClick={() => setSelectedRequestId(null)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
            }}
          >
            ←
          </button>
          <h2 style={{ margin: '0', fontSize: '16px', fontWeight: '700' }}>
            {req.service}
          </h2>
        </div>

        <div style={{ padding: '16px' }}>
          {/* Details Section */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>
              Details
            </h3>
            <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
              <div>
                <span style={{ color: '#666' }}>Hub:</span>
                <span style={{ marginLeft: '8px', fontWeight: '600' }}>{req.hub}</span>
              </div>
              <div>
                <span style={{ color: '#666' }}>Ticket:</span>
                <span style={{ marginLeft: '8px', fontWeight: '600' }}>#{req.id}</span>
              </div>
              <div>
                <span style={{ color: '#666' }}>Raised:</span>
                <span style={{ marginLeft: '8px', fontWeight: '600' }}>{minPassed} min ago</span>
              </div>
            </div>
          </div>

          {/* SLA Section */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>
              SLA
            </h3>
            <div
              style={{
                background: '#e5e7eb',
                height: '8px',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '8px',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: slaColor,
                  width: `${slaPercent * 100}%`,
                }}
              />
            </div>
            <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
              {minRemaining} minutes remaining ({req.slaMin} min SLA)
            </p>
            {minRemaining < 5 && (
              <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#dc2626', fontWeight: '600' }}>
                ⚠️ Task is escalated!
              </p>
            )}
          </div>

          {/* Activity Section */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>
              Activity
            </h3>
            <div style={{ fontSize: '12px' }}>
              {req.comments.length === 0 ? (
                <p style={{ margin: '0', color: '#999' }}>No comments yet</p>
              ) : (
                req.comments.map((c, i) => (
                  <div key={i} style={{ marginBottom: '12px', paddingLeft: '16px', borderLeft: '2px solid #e5e7eb' }}>
                    <p style={{ margin: '0', fontWeight: '600' }}>{c.user}</p>
                    <p style={{ margin: '2px 0 0', color: '#666' }}>{c.text}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#999' }}>
                      {Math.floor((now - c.time) / 60000)} min ago
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Comment Section */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'inherit',
                marginBottom: '8px',
                minHeight: '60px',
                boxSizing: 'border-box',
              }}
            />
            <button
              onClick={() => {
                onAddComment(selectedRequestId, staffLoggedIn.name, commentText);
                setCommentText('');
              }}
              style={{
                width: '100%',
                padding: '10px',
                background: '#1a6bf0',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Post Comment
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {req.status === 'NEW' && (
              <button
                onClick={() => {
                  onAcceptTask(selectedRequestId);
                  setSelectedRequestId(null);
                }}
                style={{
                  padding: '12px',
                  background: '#1a6bf0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Accept & Start
              </button>
            )}

            {req.status === 'IN_PROGRESS' && (
              <button
                onClick={() => {
                  onResolveTask(selectedRequestId);
                  setSelectedRequestId(null);
                }}
                style={{
                  padding: '12px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Mark Resolved
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', paddingBottom: '24px' }}>
      {/* Header */}
      <div
        style={{
          background: 'white',
          padding: '16px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1 style={{ margin: '0', fontSize: '16px', fontWeight: '700' }}>
            {staffLoggedIn.name}
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>
            {staffLoggedIn.dept}
          </p>
        </div>
        <button
          onClick={() => setStaffLoggedIn(null)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
          }}
        >
          🚪
        </button>
      </div>

      {/* Stats */}
      <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <div style={{ background: '#dbeafe', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#1e40af' }}>
            {pendingCount}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#1e40af' }}>
            Pending
          </p>
        </div>
        <div style={{ background: '#fef3c7', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#92400e' }}>
            {inProgCount}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#92400e' }}>
            In Progress
          </p>
        </div>
        <div style={{ background: '#fee2e2', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#991b1b' }}>
            {escalatedCount}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#991b1b' }}>
            Escalated
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '0 16px', marginTop: '12px', gap: '12px', borderBottom: '1px solid #e5e7eb' }}>
        <button
          onClick={() => setStaffTab('dashboard')}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 0',
            fontSize: '13px',
            fontWeight: staffTab === 'dashboard' ? '700' : '500',
            color: staffTab === 'dashboard' ? '#1a6bf0' : '#666',
            borderBottom: staffTab === 'dashboard' ? '2px solid #1a6bf0' : 'none',
            cursor: 'pointer',
          }}
        >
          Active
        </button>
        <button
          onClick={() => setStaffTab('resolved')}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 0',
            fontSize: '13px',
            fontWeight: staffTab === 'resolved' ? '700' : '500',
            color: staffTab === 'resolved' ? '#1a6bf0' : '#666',
            borderBottom: staffTab === 'resolved' ? '2px solid #1a6bf0' : 'none',
            cursor: 'pointer',
          }}
        >
          Resolved
        </button>
      </div>

      {/* Task List */}
      <div style={{ padding: '16px' }}>
        {staffTab === 'dashboard' &&
          (sortedRequests.length > 0 ? (
            sortedRequests.map((req) => {
              const minPassed = Math.floor((now - req.createdAt) / 60000);
              const minRemaining = Math.max(0, req.slaMin - minPassed);
              const slaPercent = Math.max(0, minRemaining / req.slaMin);
              const slaColor =
                slaPercent > 0.5 ? '#10b981' : slaPercent > 0.25 ? '#f59e0b' : '#dc2626';

              return (
                <button
                  key={req.id}
                  onClick={() => setSelectedRequestId(req.id)}
                  style={{
                    width: '100%',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px',
                    marginBottom: '12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ margin: '0', fontSize: '14px', fontWeight: '700' }}>
                        {req.service}
                      </h4>
                      <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#666' }}>
                        #{req.id} · {minPassed} min ago
                      </p>
                    </div>
                    {minRemaining < 5 && (
                      <span
                        style={{
                          background: '#dc2626',
                          color: 'white',
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: '600',
                        }}
                      >
                        URGENT
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      background: '#e5e7eb',
                      height: '4px',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        background: slaColor,
                        width: `${slaPercent * 100}%`,
                      }}
                    />
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: '10px', color: '#666' }}>
                    {minRemaining} min SLA remaining
                  </p>
                </button>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 16px', color: '#999' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
              <p>All tasks completed!</p>
            </div>
          ))}

        {staffTab === 'resolved' && (
          <>
            {staffRequests
              .filter((r) => r.status === 'RESOLVED')
              .map((req) => (
                <div
                  key={req.id}
                  style={{
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '700' }}>
                    ✅ {req.service}
                  </h4>
                  <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
                    #{req.id} · TAT: {Math.floor((req.resolvedAt - req.createdAt) / 60000)} min
                  </p>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default StaffView;
