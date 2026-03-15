# Sewa App - Setup & Deployment Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173` and be accessible on your network at `http://YOUR_IP:5173` for phone testing.

### 3. Test Demo Features
- **Patient View**: Browse service hubs, submit requests, rate services
- **Staff View**: Login as one of 6 staff members, manage assigned tasks
- **Admin View**: View configuration, staff directory, SLA rules

The demo includes 3 pre-loaded requests for testing.

---

## Environment Configuration

### Option A: Offline Mode (No Backend Required)
The app works fully offline with local state. All features work - requests are stored in browser memory and persist during the session.

### Option B: Google Apps Script Backend

1. **Copy the template environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Create Google Apps Script deployment:**
   - Go to Google Sheets > Extensions > Apps Script
   - Replace the default code with your backend implementation
   - Deploy > New Deployment > Select "Web app"
   - Run as: Your email
   - Execute as: Your email
   - Who has access: Anyone
   - Copy the deployment URL

3. **Add to .env:**
   ```
   VITE_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec
   ```

4. **Restart dev server:**
   ```bash
   npm run dev
   ```

---

## Production Build

### Build for Deployment
```bash
npm run build
```

Output files go to the `dist/` directory.

### Preview Build Locally
```bash
npm run preview
```

### Deploy to a Server
Upload the `dist/` folder contents to any static hosting:
- Vercel: `npm install -g vercel && vercel`
- Netlify: `npm install -g netlify-cli && netlify deploy --prod --dir=dist`
- Firebase: `npm install -g firebase-tools && firebase deploy`
- Google Cloud: `gcloud app deploy`

---

## Project Architecture

### Core Components

**App.jsx** (Main Container)
- Manages all global state (requests, view, notifications)
- Handles SLA ticker (updates every 30 seconds)
- Routes between Patient, Staff, and Admin views
- Provides callbacks for request creation, status updates

**PatientView.jsx**
- Service hub grid with 4 categories
- Emergency button with red pulsing animation
- Custom request text input
- Active/resolved request tracking
- 5-star rating system

**StaffView.jsx**
- Staff login screen (first 6 staff available for demo)
- Dashboard with stats (pending, in-progress, escalated)
- Task list sorted by SLA urgency
- Task detail view with activity and actions
- Comment system

**AdminView.jsx**
- Routing: Service-to-staff assignments
- Staff: Team directory with channels
- SLA: 6-level escalation visualization
- Notifications: Channel configuration

### Utilities & Hooks

**config.js** - All static data:
- SERVICE_HUBS (4 hubs, 40+ services)
- STAFF_DIRECTORY (15 staff)
- SLA_LEVELS (6 escalation levels)
- NOTIFICATION_CHANNELS (Email, SMS, WhatsApp, Push)

**api.js** - Google Apps Script client with fallback to offline mode

**useInterval** - Custom hook for 30-second SLA updates

**components/** - Reusable UI components:
- BottomSheet: Modal dialog with slide-up animation
- Toast: Auto-dismissing notifications
- SLABar: Color-coded progress bar
- Icons: Inline SVG icon components

---

## Mobile Testing

### Test on Phone Same Network

1. **Find your computer's IP:**
   - Mac/Linux: `ipconfig getifaddr en0`
   - Windows: `ipconfig` (look for IPv4)

2. **Open on phone:**
   - Go to `http://YOUR_IP:5173` on your phone browser
   - Portrait mode is optimal (480px design)

### Test on Mobile Device (Direct)
```bash
# Device must be on same WiFi as development machine
npm run dev -- --host
```

---

## Google Apps Script Backend Example

Here's a minimal backend to get started:

```javascript
// Copy this to Google Apps Script

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSheet();

  switch(data.action) {
    case 'CREATE_REQUEST':
      sheet.appendRow([
        data.requestId,
        data.service,
        data.hub,
        data.assignee,
        'NEW',
        new Date(),
      ]);
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Request created',
      })).setMimeType(ContentService.MimeType.JSON);

    case 'GET_REQUESTS':
      // Return all requests from sheet
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        requests: [],
      })).setMimeType(ContentService.MimeType.JSON);

    default:
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Unknown action',
      })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## Troubleshooting

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### API calls not working
1. Check if `VITE_API_URL` is set in `.env`
2. Verify Apps Script deployment is accessible
3. Check browser console for CORS errors
4. App falls back to offline mode automatically

### Styles not loading
- Check that `styles.css` is imported in `src/main.jsx`
- Clear browser cache: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Port already in use
```bash
# Use different port
npm run dev -- --port 3000
```

---

## Key Features to Test

1. **Patient Flow:**
   - ✓ Select Food & Drinks hub
   - ✓ Order Coffee
   - ✓ See request with countdown timer
   - ✓ Rate when resolved

2. **Staff Flow:**
   - ✓ Login as "Rohit Singh"
   - ✓ See assigned tasks
   - ✓ Click task to open detail
   - ✓ Add comment
   - ✓ Mark as resolved

3. **Admin Flow:**
   - ✓ View all 4 service hubs
   - ✓ See staff directory
   - ✓ Check SLA escalation levels
   - ✓ Review notification channels

4. **SLA Behavior:**
   - ✓ Timer counts down in real-time
   - ✓ Bar changes color (green > yellow > red)
   - ✓ Updates every 30 seconds

---

## Performance Tips

- App is already optimized for mobile (480px max-width)
- Images are minimal (only uses emojis and SVGs)
- No external CDN dependencies (except fonts)
- State updates are batched

---

## Support

For issues or questions:
1. Check the README.md for detailed documentation
2. Review the config.js for data structure
3. Examine component props in JSDoc comments
4. Check browser console for errors

---

## Next Steps

- [ ] Test on mobile device
- [ ] Set up Google Apps Script backend (optional)
- [ ] Add your hospital branding (colors, logo)
- [ ] Customize staff directory
- [ ] Add more service options
- [ ] Deploy to production hosting
