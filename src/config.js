// Service Hubs Configuration
export const SERVICE_HUBS = [
  {
    id: 'foodDrinks',
    name: 'Food & Drinks',
    icon: '🍽️',
    color: '#f59e0b',
    description: 'Meals & refreshments',
    services: [
      { id: 'f1', name: 'Coffee', icon: '☕', dept: 'FnB', assignee: 'Rohit Singh', slaMin: 30 },
      { id: 'f2', name: 'Tea', icon: '☕', dept: 'FnB', assignee: 'Rohit Singh', slaMin: 30 },
      { id: 'f3', name: 'Oats Porridge', icon: '🥣', dept: 'FnB', assignee: 'Rohit Singh', slaMin: 30 },
      { id: 'f4', name: 'Sandwich', icon: '🥪', dept: 'FnB', assignee: 'Rohit Singh', slaMin: 30 },
      { id: 'f5', name: 'Curd Rice', icon: '🍚', dept: 'FnB', assignee: 'Rohit Singh', slaMin: 30 },
      { id: 'f6', name: 'Salad', icon: '🥗', dept: 'FnB', assignee: 'Rohit Singh', slaMin: 30 },
      { id: 'f7', name: 'Poha', icon: '🍲', dept: 'FnB', assignee: 'Rohit Singh', slaMin: 30 },
      { id: 'f8', name: 'Clear my tray', icon: '🍽️', dept: 'FnB', assignee: 'Rohit Singh', slaMin: 15 },
    ],
  },
  {
    id: 'myRoom',
    name: 'My Room',
    icon: '🛏️',
    color: '#0891b2',
    description: 'Room & maintenance',
    services: [
      { id: 'r1', name: 'Room Cleaning', icon: '🧹', dept: 'HK', assignee: 'Abu', slaMin: 45 },
      { id: 'r2', name: 'Washroom Cleaning', icon: '🚿', dept: 'HK', assignee: 'Abu', slaMin: 45 },
      { id: 'r3', name: 'Bed Pan Cleaning', icon: '🛏️', dept: 'HK', assignee: 'Abu', slaMin: 45 },
      { id: 'r4', name: 'Waste Not Cleared', icon: '🗑️', dept: 'HK', assignee: 'Abu', slaMin: 45 },
      { id: 'r5', name: 'AC Not Cooling', icon: '❄️', dept: 'Maint', assignee: 'Raju', slaMin: 60 },
      { id: 'r6', name: 'Water Dripping from AC', icon: '💧', dept: 'Maint', assignee: 'Raju', slaMin: 60 },
      { id: 'r7', name: 'AC Remote Required', icon: '📱', dept: 'Maint', assignee: 'Raju', slaMin: 60 },
      { id: 'r8', name: 'TV Not Working', icon: '📺', dept: 'Maint', assignee: 'Raju', slaMin: 60 },
      { id: 'r9', name: 'Fan Not Working', icon: '🌀', dept: 'Maint', assignee: 'Raju', slaMin: 60 },
      { id: 'r10', name: 'Light Not Working', icon: '💡', dept: 'Maint', assignee: 'Raju', slaMin: 60 },
      { id: 'r11', name: 'Socket Not Working', icon: '🔌', dept: 'Maint', assignee: 'Raju', slaMin: 60 },
      { id: 'r12', name: 'Geyser Not Working', icon: '🌡️', dept: 'Maint', assignee: 'Raju', slaMin: 60 },
      { id: 'r13', name: 'Fresh Bedsheet', icon: '🛏️', dept: 'HK', assignee: 'Abu', slaMin: 30 },
      { id: 'r14', name: 'Extra Pillow', icon: '🛌', dept: 'HK', assignee: 'Abu', slaMin: 30 },
      { id: 'r15', name: 'Blanket', icon: '🧣', dept: 'HK', assignee: 'Abu', slaMin: 30 },
      { id: 'r16', name: 'Patient Gown', icon: '👔', dept: 'HK', assignee: 'Abu', slaMin: 30 },
      { id: 'r17', name: 'WiFi Help', icon: '📶', dept: 'Maint', assignee: 'Raju', slaMin: 60 },
      { id: 'r18', name: 'Window Hinges Broken', icon: '🪟', dept: 'Maint', assignee: 'Raju', slaMin: 60 },
    ],
  },
  {
    id: 'medicalCare',
    name: 'Medical Care',
    icon: '👨‍⚕️',
    color: '#7c3aed',
    description: 'Health & treatment',
    services: [
      { id: 'm1', name: 'Doctor Not Visiting', icon: '👨‍⚕️', dept: 'Medical', assignee: 'Dr. Sharma', slaMin: 30 },
      { id: 'm2', name: 'Need Doctor Consultation', icon: '🩺', dept: 'Medical', assignee: 'Dr. Sharma', slaMin: 30 },
      { id: 'm3', name: 'Nurse Not Responding', icon: '👩‍⚕️', dept: 'Nursing', assignee: 'Sunita', slaMin: 15 },
      { id: 'm4', name: 'Medication Delay', icon: '💊', dept: 'Nursing', assignee: 'Sunita', slaMin: 20 },
      { id: 'm5', name: 'IV Drip Issue', icon: '💉', dept: 'Nursing', assignee: 'Sunita', slaMin: 15 },
      { id: 'm6', name: 'Male GDA Required', icon: '🤝', dept: 'Nursing', assignee: 'Sunita', slaMin: 30 },
      { id: 'm7', name: 'Diaper Change', icon: '👶', dept: 'Nursing', assignee: 'Sunita', slaMin: 30 },
      { id: 'm8', name: 'Bed Pan Required', icon: '🛏️', dept: 'Nursing', assignee: 'Sunita', slaMin: 30 },
      { id: 'm9', name: 'Lab Report Pending', icon: '📋', dept: 'Lab', assignee: 'Venkat', slaMin: 60 },
      { id: 'm10', name: 'Sample Collection Delay', icon: '🧪', dept: 'Lab', assignee: 'Venkat', slaMin: 60 },
      { id: 'm11', name: 'Diagnostics Report Delay', icon: '📊', dept: 'Diagnostics', assignee: 'Kavitha', slaMin: 60 },
    ],
  },
  {
    id: 'supportBilling',
    name: 'Support & Billing',
    icon: '📋',
    color: '#6366f1',
    description: 'Billing & discharge',
    services: [
      { id: 's1', name: 'Billing Query', icon: '💳', dept: 'Front Office', assignee: 'Anita', slaMin: 60 },
      { id: 's2', name: 'Insurance Assistance', icon: '📄', dept: 'Front Office', assignee: 'Anita', slaMin: 60 },
      { id: 's3', name: 'Discharge Delay', icon: '📋', dept: 'Front Office', assignee: 'Anita', slaMin: 45 },
      { id: 's4', name: 'Wheelchair Required', icon: '♿', dept: 'Service', assignee: 'Amit', slaMin: 30 },
      { id: 's5', name: 'Doctor Consultation Delay', icon: '⏰', dept: 'Service', assignee: 'Amit', slaMin: 45 },
      { id: 's6', name: 'Pharmacy Issue', icon: '💊', dept: 'Pharmacy', assignee: 'Ramesh', slaMin: 60 },
      { id: 's7', name: 'Wrong Medicine', icon: '⚠️', dept: 'Pharmacy', assignee: 'Ramesh', slaMin: 15 },
      { id: 's8', name: 'Patient Education Material', icon: '📚', dept: 'Nursing', assignee: 'Sunita', slaMin: 60 },
    ],
  },
];

// Emergency Service
export const EMERGENCY_SERVICE = {
  name: 'Nurse Call - Urgent',
  icon: '🆘',
  hub: 'Emergency',
  dept: 'Nursing',
  assignee: 'Sunita',
  slaMin: 10,
};

// Staff Directory
export const STAFF_DIRECTORY = [
  { id: 'S01', name: 'Rohit Singh', dept: 'Food & Beverage', role: 'Associate', level: 0 },
  { id: 'S02', name: 'Abu', dept: 'Housekeeping', role: 'Associate', level: 0 },
  { id: 'S03', name: 'Raju', dept: 'Maintenance', role: 'Associate', level: 0 },
  { id: 'S04', name: 'Sunita', dept: 'Nursing', role: 'Nurse', level: 0 },
  { id: 'S05', name: 'Dr. Sharma', dept: 'Medical', role: 'Doctor', level: 0 },
  { id: 'S06', name: 'Venkat', dept: 'Lab', role: 'Technician', level: 0 },
  { id: 'S07', name: 'Kavitha', dept: 'Diagnostics', role: 'Technician', level: 0 },
  { id: 'S08', name: 'Anita', dept: 'Front Office', role: 'Executive', level: 0 },
  { id: 'S09', name: 'Amit', dept: 'Service', role: 'Coordinator', level: 0 },
  { id: 'S10', name: 'Ramesh', dept: 'Pharmacy', role: 'Technician', level: 0 },
  { id: 'S11', name: 'Priya', dept: 'Housekeeping', role: 'Supervisor', level: 1 },
  { id: 'S12', name: 'Vinay Bhardwaj', dept: 'Operations', role: 'Manager', level: 3 },
  { id: 'S13', name: 'Yash Sharma', dept: 'Operations', role: 'Manager', level: 3 },
  { id: 'S14', name: 'Chandrika', dept: 'Admin', role: 'Administrator', level: 4 },
  { id: 'S15', name: 'Animesh', dept: 'Admin', role: 'Administrator', level: 4 },
];

// SLA Escalation Chain
export const SLA_LEVELS = [
  { level: 0, time: 'T+0', notify: 'Individual staff', channels: 'Push + WhatsApp' },
  { level: 1, time: 'T+30', notify: '+ Supervisor', channels: 'Push + WhatsApp + Email' },
  { level: 2, time: 'T+60', notify: '+ Dept Manager', channels: 'Push + WhatsApp + Email' },
  { level: 3, time: 'T+90', notify: '+ Ops Heads', channels: 'Email + WhatsApp + SMS' },
  { level: 4, time: 'T+120', notify: '+ Hospital Admin', channels: 'All channels' },
  { level: 5, time: 'T+150', notify: 'Terminal', channels: 'All + Urgent Flag' },
];

// Notification Channels Configuration
export const NOTIFICATION_CHANNELS = [
  { channel: 'Email', provider: 'SMTP', status: true },
  { channel: 'WhatsApp', provider: 'Even Steven (Internal Bot)', status: true },
  { channel: 'SMS', provider: 'Twilio', status: false },
  { channel: 'Push', provider: 'Firebase', status: true },
];

// Team/Department Mapping
export const TEAM_MAP = {
  'Food & Beverage': ['Rohit Singh'],
  'Housekeeping': ['Abu', 'Priya'],
  'Maintenance': ['Raju'],
  'Nursing': ['Sunita'],
  'Medical': ['Dr. Sharma'],
  'Lab': ['Venkat'],
  'Diagnostics': ['Kavitha'],
  'Front Office': ['Anita'],
  'Service': ['Amit'],
  'Pharmacy': ['Ramesh'],
};
