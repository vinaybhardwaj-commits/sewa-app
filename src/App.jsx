import { useState, useEffect, useCallback } from 'react';
import { PatientView } from './components/PatientView';
import { StaffView } from './components/StaffView';
import { AdminView } from './components/AdminView';
import { Toast } from './components/Toast';
import { useInterval } from './hooks/useInterval';
import { SERVICE_HUBS } from './config';

/**
 * Main App Component
 * Manages all views (Patient, Staff, Admin) and shared state
 */
function App() {
  // View state
  const [currentView, setCurrentView] = useState('patient');

  // Request state
  const [requests, setRequests] = useState([]);
  const [nextRequestId, setNextRequestId] = useState(2000);

  // Toast notification
  const [toast, setToast] = useState(null);

  // Time ticker for SLA updates
  const [now, setNow] = useState(new Date());

  // Initialize with demo requests
  useEffect(() => {
    const demoRequests = [
      {
        id: 2000,
        service: 'Coffee',
        hub: 'Food & Drinks',
        dept: 'FnB',
        assignee: 'Rohit Singh',
        status: 'NEW',
        createdAt: new Date(now.getTime() - 12 * 60000),
        slaMin: 30,
        comments: [],
      },
      {
        id: 2001,
        service: 'Washroom Cleaning',
        hub: 'My Room',
        dept: 'HK',
        assignee: 'Abu',
        status: 'IN_PROGRESS',
        createdAt: new Date(now.getTime() - 28 * 60000),
        slaMin: 45,
        comments: [
          {
            user: 'Abu',
            text: 'Starting the cleaning now',
            time: new Date(now.getTime() - 20 * 60000),
          },
        ],
      },
      {
        id: 2002,
        service: 'Fresh Bedsheet',
        hub: 'My Room',
        dept: 'HK',
        assignee: 'Abu',
        status: 'RESOLVED',
        createdAt: new Date(now.getTime() - 3600000),
        resolvedAt: new Date(now.getTime() - 1800000),
        slaMin: 30,
        rating: 4,
        comments: [],
      },
    ];
    setRequests(demoRequests);
    setNextRequestId(2003);
  }, []);

  // SLA countdown ticker - updates every 30 seconds
  useInterval(() => {
    setNow(new Date());
  }, 30000);

  // Show toast notification
  const showToast = useCallback((message) => {
    setToast(message);
  }, []);

  // Submit a new service request
  const submitRequest = useCallback(
    (serviceName, hub) => {
      // Find service details from all hubs
      let service = null;
      for (const h of SERVICE_HUBS) {
        const found = h.services.find((s) => s.name === serviceName || s.id === serviceName);
        if (found) {
          service = found;
          break;
        }
      }

      if (!service) return;

      const newReq = {
        id: nextRequestId,
        service: serviceName,
        hub,
        dept: service.dept,
        assignee: service.assignee,
        status: 'NEW',
        createdAt: new Date(),
        slaMin: service.slaMin,
        comments: [],
      };

      setRequests((r) => [newReq, ...r]);
      setNextRequestId((n) => n + 1);
      showToast(`✅ Request submitted! Ticket #${newReq.id}`);
    },
    [nextRequestId, showToast]
  );

  // Accept and start a task (Staff)
  const acceptTask = useCallback((reqId) => {
    setRequests((r) =>
      r.map((req) =>
        req.id === reqId ? { ...req, status: 'IN_PROGRESS', acceptedAt: new Date() } : req
      )
    );
    showToast('Task started!');
  }, [showToast]);

  // Mark task as resolved (Staff)
  const resolveTask = useCallback((reqId) => {
    setRequests((r) =>
      r.map((req) =>
        req.id === reqId ? { ...req, status: 'RESOLVED', resolvedAt: new Date() } : req
      )
    );
    showToast('Task marked as resolved!');
  }, [showToast]);

  // Add comment to a request
  const addComment = useCallback(
    (reqId, user, text) => {
      if (!text.trim()) return;
      setRequests((r) =>
        r.map((req) =>
          req.id === reqId
            ? {
                ...req,
                comments: [
                  ...req.comments,
                  { user, text, time: new Date() },
                ],
              }
            : req
        )
      );
      showToast('Comment added!');
    },
    [showToast]
  );

  // Rate a resolved request
  const rateRequest = useCallback(
    (reqId, rating) => {
      setRequests((r) =>
        r.map((req) => (req.id === reqId ? { ...req, rating } : req))
      );
      showToast(`Thank you! Rated ${rating} stars`);
    },
    [showToast]
  );

  return (
    <div
      style={{
        maxWidth: '480px',
        margin: '0 auto',
        background: '#fff',
        minHeight: '100vh',
        position: 'relative',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: '16px',
        lineHeight: '1.5',
      }}
    >
      {/* View Selector Bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          padding: '12px',
        }}
      >
        <button
          onClick={() => setCurrentView('patient')}
          style={{
            padding: '8px 16px',
            background: currentView === 'patient' ? '#1a6bf0' : '#f3f4f6',
            color: currentView === 'patient' ? 'white' : '#666',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '13px',
          }}
        >
          👤 Patient
        </button>
        <button
          onClick={() => setCurrentView('staff')}
          style={{
            padding: '8px 16px',
            background: currentView === 'staff' ? '#1a6bf0' : '#f3f4f6',
            color: currentView === 'staff' ? 'white' : '#666',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '13px',
          }}
        >
          👨‍💼 Staff
        </button>
        <button
          onClick={() => setCurrentView('admin')}
          style={{
            padding: '8px 16px',
            background: currentView === 'admin' ? '#1a6bf0' : '#f3f4f6',
            color: currentView === 'admin' ? 'white' : '#666',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '13px',
          }}
        >
          ⚙️ Admin
        </button>
      </div>

      {/* View Content */}
      {currentView === 'patient' && (
        <PatientView requests={requests} onAddRequest={submitRequest} now={now} />
      )}
      {currentView === 'staff' && (
        <StaffView
          requests={requests}
          onAcceptTask={acceptTask}
          onResolveTask={resolveTask}
          onAddComment={addComment}
          now={now}
        />
      )}
      {currentView === 'admin' && <AdminView />}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
