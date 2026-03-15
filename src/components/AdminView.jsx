import { useState } from 'react';
import { SERVICE_HUBS, STAFF_DIRECTORY, SLA_LEVELS, NOTIFICATION_CHANNELS } from '../config';
import { QRGenerator } from './QRGenerator';

/**
 * Admin View Component
 * Displays configuration and management dashboards
 */
export const AdminView = () => {
  const [adminTab, setAdminTab] = useState('routing');

  // Routing Tab
  const RoutingTab = () => (
    <div style={{ padding: '16px' }}>
      {SERVICE_HUBS.map((hub) => (
        <div key={hub.id} style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700' }}>
            {hub.name}
          </h3>
          <div style={{ display: 'grid', gap: '8px' }}>
            {hub.services.slice(0, 3).map((svc) => (
              <div
                key={svc.id}
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '12px',
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                  {svc.name}
                </div>
                <div style={{ color: '#666', fontSize: '11px' }}>
                  {svc.dept} → {svc.assignee} ({svc.slaMin}m SLA)
                </div>
              </div>
            ))}
            {hub.services.length > 3 && (
              <div style={{ color: '#999', fontSize: '11px', padding: '8px' }}>
                +{hub.services.length - 3} more services
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Staff Tab
  const StaffTab = () => (
    <div style={{ padding: '16px' }}>
      {STAFF_DIRECTORY.slice(0, 8).map((staff) => (
        <div
          key={staff.id}
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '12px',
            fontSize: '12px',
          }}
        >
          <h4 style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: '700' }}>
            {staff.name}
          </h4>
          <p style={{ margin: '2px 0 0', color: '#666', fontSize: '11px' }}>
            {staff.dept} · {staff.role}
          </p>
          <div style={{ marginTop: '8px', fontSize: '11px', display: 'flex', gap: '4px' }}>
            <span style={{ background: '#dbeafe', padding: '2px 6px', borderRadius: '3px' }}>
              ✓ Email
            </span>
            <span style={{ background: '#fef3c7', padding: '2px 6px', borderRadius: '3px' }}>
              ✗ SMS
            </span>
            <span style={{ background: '#dbeafe', padding: '2px 6px', borderRadius: '3px' }}>
              ✓ WhatsApp
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  // SLA Tab
  const SLATab = () => (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase' }}>
        Escalation Chain
      </h3>
      {SLA_LEVELS.map((e) => (
        <div
          key={e.level}
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div
              style={{
                background: '#1a6bf0',
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '12px',
              }}
            >
              {e.level}
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '12px' }}>{e.time}</div>
              <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                {e.notify}
              </div>
            </div>
          </div>
          <div
            style={{
              background: '#f3f4f6',
              padding: '8px',
              borderRadius: '4px',
              fontSize: '11px',
            }}
          >
            {e.channels}
          </div>
        </div>
      ))}
    </div>
  );

  // Notifications Tab
  const NotificationsTab = () => (
    <div style={{ padding: '16px' }}>
      {NOTIFICATION_CHANNELS.map((cfg) => (
        <div
          key={cfg.channel}
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <h4 style={{ margin: '0', fontSize: '13px', fontWeight: '700' }}>
              {cfg.channel}
            </h4>
            <button
              style={{
                background: cfg.status ? '#10b981' : '#e5e7eb',
                color: cfg.status ? 'white' : '#666',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 12px',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              {cfg.status ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          <p style={{ margin: '0', fontSize: '11px', color: '#666' }}>
            Provider: {cfg.provider}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', paddingBottom: '24px' }}>
      {/* Header */}
      <div style={{ background: 'white', padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: '700' }}>
          Admin Dashboard
        </h1>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', fontSize: '12px' }}>
          {['routing', 'staff', 'sla', 'notifications', 'qrcodes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setAdminTab(tab)}
              style={{
                background: adminTab === tab ? '#1a6bf0' : 'white',
                color: adminTab === tab ? 'white' : '#666',
                border: adminTab === tab ? 'none' : '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '6px 12px',
                cursor: 'pointer',
                fontWeight: adminTab === tab ? '600' : '500',
                whiteSpace: 'nowrap',
              }}
            >
              {tab === 'qrcodes' ? 'QR Codes' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {adminTab === 'routing' && <RoutingTab />}
      {adminTab === 'staff' && <StaffTab />}
      {adminTab === 'sla' && <SLATab />}
      {adminTab === 'notifications' && <NotificationsTab />}
      {adminTab === 'qrcodes' && <QRGenerator />}
    </div>
  );
};

export default AdminView;
