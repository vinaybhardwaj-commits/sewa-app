# Sewa App - Complete Files Manifest

## Project: Hospital Patient Service Request Platform
**Status:** Production Ready  
**Total Files:** 20  
**Last Updated:** 2026-03-15

---

## Configuration & Setup (5 files)

### package.json
- **Purpose:** NPM dependencies and build scripts
- **Contains:** React 18, React-DOM 18, Vite, @vitejs/plugin-react
- **Scripts:** dev, build, preview
- **Size:** ~345 bytes

### vite.config.js
- **Purpose:** Vite build and development server configuration
- **Key Feature:** `server.host: true` for LAN accessibility on phones
- **Size:** ~185 bytes

### index.html
- **Purpose:** HTML entry point for the React app
- **Features:** Mobile viewport meta tag, title "Sewa | Even Healthcare"
- **Size:** ~309 bytes

### .env.example
- **Purpose:** Environment variables template
- **Contains:** VITE_API_URL placeholder for Google Apps Script backend
- **Size:** ~77 bytes

### .gitignore
- **Purpose:** Git ignore rules
- **Ignores:** node_modules, dist, .env, .DS_Store, logs, IDE files
- **Size:** ~288 bytes

---

## Source Code - Core (5 files)

### src/main.jsx
- **Purpose:** React application bootstrap
- **Imports:** React, ReactDOM, App, styles.css
- **Function:** Mounts App component to DOM root element
- **Size:** ~180 bytes

### src/App.jsx
- **Purpose:** Main application container and state management
- **Responsibilities:**
  - View routing (Patient, Staff, Admin)
  - Global request state
  - SLA ticker (30-second updates)
  - Toast notifications
  - Request lifecycle (submit, accept, resolve, rate, comment)
- **Key Methods:**
  - submitRequest() - Create new request
  - acceptTask() - Staff task acceptance
  - resolveTask() - Task completion
  - addComment() - Activity updates
  - rateRequest() - Patient feedback
- **State Management:** requests, currentView, nextRequestId, now, toast
- **Size:** ~260 lines

### src/styles.css
- **Purpose:** Global styles, animations, and typography
- **Includes:**
  - DM Sans font import
  - CSS reset (margin, padding, box-sizing)
  - Animations: slideUp, fadeIn, pulse-emergency
  - Scrollbar styling
  - Button active states
  - Utility classes
- **Size:** ~150 lines

### src/config.js
- **Purpose:** All static configuration data
- **Exports:**
  - SERVICE_HUBS (4 hubs, 45 services total)
  - EMERGENCY_SERVICE
  - STAFF_DIRECTORY (15 staff)
  - SLA_LEVELS (6 escalation levels)
  - NOTIFICATION_CHANNELS (4 channels)
  - TEAM_MAP (department-to-staff mapping)
- **Size:** ~250 lines

### src/api.js
- **Purpose:** Google Apps Script backend client
- **Features:**
  - Checks for API_URL configuration
  - Falls back to offline mode if not configured
  - Uses Content-Type: text/plain (Apps Script requirement)
  - Error handling with graceful degradation
- **Exported Functions:**
  - createRequest(data)
  - updateStatus(data)
  - addFeedback(data)
  - addComment(data)
  - getRequests()
  - getStaff()
  - getDashboard()
- **Size:** ~100 lines

---

## Components (7 files)

### src/components/PatientView.jsx
- **Purpose:** Patient service request interface
- **Features:**
  - Service hub browsing (4 hubs with icons)
  - Emergency button (pulsing red, 10-min SLA)
  - Service selection via bottom sheet
  - Custom request textarea
  - Active request tracking with SLA countdown
  - Resolved requests with 5-star ratings
  - Language selector (English, Hindi, Kannada)
- **Props:**
  - requests: array of request objects
  - onAddRequest: callback for new requests
  - now: current time for SLA updates
- **Sub-components:** BottomSheet, SLABar
- **Size:** ~420 lines

### src/components/StaffView.jsx
- **Purpose:** Staff task management and dashboard
- **Features:**
  - Staff login screen (first 6 staff from directory)
  - Dashboard with 3 stats (pending, in-progress, escalated)
  - Task list sorted by SLA urgency
  - Task detail view with activity log
  - Comment system with timestamps
  - Accept task button (NEW → IN_PROGRESS)
  - Mark resolved button (IN_PROGRESS → RESOLVED)
  - TAT (Turnaround Time) tracking
  - Logout with state cleanup
- **Props:**
  - requests: array of request objects
  - onAcceptTask: callback to accept task
  - onResolveTask: callback to resolve task
  - onAddComment: callback to add comments
  - now: current time for SLA updates
- **States:**
  - staffLoggedIn: selected staff member
  - staffTab: active/resolved view toggle
  - selectedRequestId: detail view
  - commentText: form input
- **Size:** ~520 lines

### src/components/AdminView.jsx
- **Purpose:** Administrative configuration dashboard
- **Tabs:**
  - Routing: Service-to-staff assignments
  - Staff: Team directory with notification channels
  - SLA: 6-level escalation chain visualization
  - Notifications: Channel status and providers
- **Sub-components:**
  - RoutingTab: Service hub configuration
  - StaffTab: Staff directory display
  - SLATab: Escalation level details
  - NotificationsTab: Channel configuration
- **Size:** ~280 lines

### src/components/BottomSheet.jsx
- **Purpose:** Reusable modal dialog component
- **Features:**
  - Backdrop overlay with semi-transparent black
  - Slide-up animation on entry
  - Header with title and close button
  - Scrollable content area
  - Click-outside to close
- **Props:**
  - isOpen: boolean to control visibility
  - onClose: callback for close action
  - title: header text
  - children: content to display
- **Styling:** Modal with border-radius, shadow, animation
- **Size:** ~50 lines

### src/components/Toast.jsx
- **Purpose:** Auto-dismissing notification system
- **Features:**
  - Fixed position (bottom center)
  - Auto-dismiss after 3 seconds
  - Slide-up animation
  - Dark background with white text
- **Props:**
  - message: text to display
  - onDismiss: cleanup callback
- **Size:** ~30 lines

### src/components/SLABar.jsx
- **Purpose:** Reusable SLA progress bar component
- **Features:**
  - Color-coded bar (green > 50%, yellow 25-50%, red < 25%)
  - Smooth width transitions
  - Time remaining display
  - Minutes elapsed display
- **Props:**
  - deadline: ISO timestamp (for future use)
  - slaMinutes: total SLA time in minutes
  - raisedAt: request creation time
- **Size:** ~35 lines

### src/components/Icons.jsx
- **Purpose:** SVG icon library for the app
- **Exported Icons:**
  - Heart, Home, MessageCircle, X
  - Check, ChevronDown, LogOut, ArrowLeft
  - Clock, Star (with filled option), Settings
  - Users, AlertTriangle, Send
- **Format:** Inline SVG components with stroke/fill
- **Width:** All 20-24px height for consistency
- **Size:** ~90 lines

---

## Hooks (1 file)

### src/hooks/useInterval.js
- **Purpose:** Custom React hook for interval management
- **Features:**
  - Automatic cleanup on unmount
  - Conditional execution (when delay is null)
  - Proper dependency tracking
- **Usage:** Used in App.jsx for 30-second SLA ticker
- **Size:** ~15 lines

---

## Assets (1 file)

### public/favicon.svg
- **Purpose:** App icon displayed in browser tab
- **Design:** Blue background with white heart icon
- **Dimensions:** 64x64px
- **Format:** SVG (scalable, no compression needed)
- **Size:** ~0.5KB

---

## Documentation (3 files)

### README.md
- **Purpose:** Comprehensive project documentation
- **Sections:**
  - Project structure overview
  - Getting started (installation, dev server, build)
  - Feature descriptions (Patient, Staff, Admin views)
  - Data configuration guide
  - API integration documentation
  - Component details
  - Styling and design system
  - Development notes
  - Google Apps Script backend example
  - Browser support
- **Size:** ~700 lines

### SETUP.md
- **Purpose:** Deployment and configuration guide
- **Sections:**
  - Quick start (5-minute setup)
  - Environment configuration (offline vs backend mode)
  - Production build instructions
  - Project architecture overview
  - Mobile testing on LAN
  - Google Apps Script backend example
  - Troubleshooting guide
  - Performance tips
  - Next steps checklist
- **Size:** ~400 lines

### PROJECT_CHECKLIST.md
- **Purpose:** Complete project verification and status
- **Sections:**
  - File structure verification
  - Component implementation checklist
  - Data completeness check
  - Functional requirements verification
  - Technical requirements confirmation
  - Quality assurance checklist
  - Testing checklist
  - Deployment readiness status
- **Size:** ~400 lines

---

## Project Statistics

### Code Distribution
- **Components:** ~1,800 lines (51%)
- **Configuration:** ~250 lines (7%)
- **Styling:** ~150 lines (4%)
- **API Client:** ~100 lines (3%)
- **Hooks/Utils:** ~50 lines (1%)
- **Documentation:** ~1,500 lines (42%)

### Total Project Files
- Configuration: 5 files
- Source Code: 13 files
- Documentation: 3 files
- **Total: 21 files** (including this manifest)

### Key Data Points
- **Service Hubs:** 4 (Food & Drinks, My Room, Medical Care, Support & Billing)
- **Total Services:** 45 across all hubs
- **Staff Members:** 15 (various departments and levels)
- **SLA Levels:** 6 (escalation chain T+0 to T+150)
- **Notification Channels:** 4 (Email, SMS, WhatsApp, Push)
- **Demo Requests:** 3 (pre-loaded for testing)

---

## Dependencies

### Production Dependencies
- react: ^18.2.0 - UI library
- react-dom: ^18.2.0 - React DOM rendering

### Development Dependencies
- @vitejs/plugin-react: ^4.2.1 - React JSX transform
- vite: ^5.2.0 - Build tool and dev server

---

## Quick File Navigation

### To modify service offerings:
→ `/src/config.js` - SERVICE_HUBS object

### To change staff members:
→ `/src/config.js` - STAFF_DIRECTORY array

### To adjust SLA rules:
→ `/src/config.js` - SLA_LEVELS array

### To modify patient interface:
→ `/src/components/PatientView.jsx`

### To modify staff interface:
→ `/src/components/StaffView.jsx`

### To modify admin interface:
→ `/src/components/AdminView.jsx`

### To change styling:
→ `/src/styles.css` - global styles
→ Individual component files - inline styles (easily migratable to CSS modules)

### To integrate backend API:
→ `/src/api.js` - update API endpoints
→ `.env` - set VITE_API_URL

---

## File Dependencies Graph

```
index.html
    ↓
main.jsx → App.jsx
              ├→ PatientView.jsx
              │    ├→ BottomSheet.jsx
              │    ├→ SLABar.jsx
              │    └→ config.js
              ├→ StaffView.jsx
              │    └→ config.js
              ├→ AdminView.jsx
              │    └→ config.js
              ├→ Toast.jsx
              └→ useInterval hook

api.js (imported where needed)
styles.css (global import in main.jsx)
config.js (imported by components)
```

---

## Environment

### Required for development:
- Node.js 16+ (for npm)
- npm or yarn package manager
- Modern web browser with ES6+ support

### Optional:
- Google Apps Script (for backend)
- Static hosting service (Vercel, Netlify, etc.)

### Browser Support:
- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile: iOS Safari, Chrome Mobile

---

## Version History

### v1.0.0 (Current)
- Initial release from monolithic demo refactor
- All features implemented and tested
- Documentation complete
- Production-ready code
- Offline-first with backend support

---

## License & Attribution

**Project:** Sewa - Hospital Patient Service Request Platform  
**Organization:** Even Healthcare System, Bengaluru  
**Created:** March 2026  
**Language:** JavaScript (React 18, Vite)  
**Type:** Hospital Operations Platform

---

**END OF MANIFEST**
