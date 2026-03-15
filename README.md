# Sewa App - Hospital Patient Service Request Platform

A complete Vite + React project for managing hospital service requests across three user views: Patient, Staff, and Admin.

## Project Structure

```
sewa-app/
├── index.html                    # HTML entry point
├── package.json                  # Dependencies and scripts
├── vite.config.js               # Vite configuration
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── README.md                    # This file
├── public/
│   └── favicon.svg              # App icon
└── src/
    ├── main.jsx                 # React app entry point
    ├── App.jsx                  # Main app component
    ├── styles.css               # Global styles
    ├── config.js                # Data configuration (services, staff, SLA)
    ├── api.js                   # Google Apps Script API client
    ├── components/
    │   ├── PatientView.jsx      # Patient request interface
    │   ├── StaffView.jsx        # Staff task management
    │   ├── AdminView.jsx        # Admin configuration dashboard
    │   ├── BottomSheet.jsx      # Reusable modal component
    │   ├── Toast.jsx            # Notification component
    │   ├── SLABar.jsx           # SLA progress bar component
    │   └── Icons.jsx            # SVG icon components
    └── hooks/
        └── useInterval.js       # Custom interval hook
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`. Server is accessible on LAN via `http://YOUR_IP:5173` for mobile testing.

### Build for Production

```bash
npm run build
npm run preview
```

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Google Apps Script deployment URL:
   ```
   VITE_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

If no API URL is configured, the app runs in **offline mode** using local state management.

## Features

### Patient View
- **Service Hubs**: Browse categorized service requests (Food & Drinks, My Room, Medical Care, Support & Billing)
- **Emergency Button**: One-click urgent nurse call with 10-minute SLA
- **Custom Requests**: Submit open-ended service requests
- **Request Tracking**: View active and completed requests with SLA countdown
- **Ratings**: Rate completed services (1-5 stars)

### Staff View
- **Login**: Staff members select their profile to start
- **Dashboard**: Real-time view of assigned tasks with SLA indicators
- **Task Management**: Accept tasks, mark as in-progress, or resolve
- **SLA Alerts**: Visual escalation warnings when time is running out
- **Comments**: Add notes and communicate with team
- **Task History**: View completed tasks and turnaround times

### Admin View
- **Routing Configuration**: View service-to-staff routing rules
- **Staff Directory**: Manage staff profiles and notification channels
- **SLA Escalation**: 6-level escalation chain (T+0 to T+150)
- **Notification Channels**: Configure Email, SMS, WhatsApp, Push

## Data Configuration

All static data is in `src/config.js`:

- **SERVICE_HUBS**: 4 main hubs with 40+ services, each with SLA targets
- **EMERGENCY_SERVICE**: Urgent nurse call (10-min SLA)
- **STAFF_DIRECTORY**: 15 staff members across departments
- **SLA_LEVELS**: 6-level escalation chain with notification rules
- **NOTIFICATION_CHANNELS**: Integration points for Email, SMS, WhatsApp, Push

## API Integration

The `src/api.js` module provides:

- `createRequest(data)` - Submit new service request
- `updateStatus(data)` - Update request status
- `addFeedback(data)` - Submit ratings/feedback
- `addComment(data)` - Add comments to requests
- `getRequests()` - Fetch all requests
- `getStaff()` - Fetch staff list
- `getDashboard()` - Get dashboard metrics

All API calls use `Content-Type: text/plain` (Google Apps Script requirement) and gracefully fall back to offline mode if API is not configured.

## Component Details

### PatientView
- Hub selection with service grid
- Request submission with SLA display
- Active vs. resolved request tracking
- 5-star rating system

### StaffView
- Multi-step login (first 6 staff available)
- Dashboard with stats (pending, in-progress, escalated)
- Task list sorted by SLA urgency
- Detail view with activity log and actions

### AdminView
- Routing tab: Service-to-staff assignments
- Staff tab: Team directory with notification preferences
- SLA tab: 6-level escalation chain visualization
- Notifications tab: Channel status and provider info

### BottomSheet
Generic modal component with:
- Backdrop overlay with fade
- Slide-up animation
- Header with title and close button
- Scrollable content area

### Toast
Auto-dismissing notifications (3-second duration) positioned at bottom center.

### SLABar
Color-coded progress bar (green > yellow > red) showing:
- Time remaining
- Minutes elapsed
- Percentage of SLA consumed

## Styling

- **Font**: DM Sans (Google Fonts)
- **Color Scheme**: Blue primary (#1a6bf0), with semantic reds, greens, ambers
- **Animations**: slideUp, fadeIn, pulse-emergency
- **Responsive**: Mobile-first design, 480px max-width
- **Dark mode ready**: CSS variables can be added easily

## Key Features

1. **Offline-First**: App works without backend API
2. **Real-time SLA**: Updates every 30 seconds
3. **Multi-user**: Patient, Staff, and Admin views in one app
4. **Notification Ready**: Hooks for email, SMS, WhatsApp, Push
5. **Fully Typed Components**: Clear prop interfaces
6. **Accessible**: Semantic HTML, proper button/link usage
7. **Mobile Optimized**: Tested on phones via LAN

## Development Notes

- All state is managed in `App.jsx` and passed down as props
- Components are pure functional with hooks
- Styling is inline (can be migrated to CSS modules)
- Each component is self-contained and reusable
- The demo includes 3 sample requests for testing

## Google Apps Script Backend

To integrate with Google Sheets:

1. Create a Google Apps Script in Google Sheets
2. Implement endpoint handlers:
   - `doPost(e)` - Handle POST requests
   - Parse `action` parameter from JSON body
   - Return JSON responses
3. Deploy as web app (run as you, accessible to anyone)
4. Copy deployment ID to `.env`

Example backend structure:
```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  switch(data.action) {
    case 'CREATE_REQUEST': // Handle request creation
    case 'UPDATE_STATUS': // Handle status updates
    case 'GET_REQUESTS': // Fetch all requests
    // ... etc
  }
}
```

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Hospital Product - Even Healthcare System
