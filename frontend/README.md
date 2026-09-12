# Future Frontend

Modern React-based frontend for Future Construction & Real Estate Management System with premium dark UI design.

## 🌟 Features

- **Premium Dark UI** with Glassmorphism effects
- **Admin Dashboard** with comprehensive management tools
- **Client Portal** with property browsing
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** using Framer Motion
- **Real-time Data** visualization with Recharts
- **Calendar & Gantt** views for project timeline
- **Export Functionality** (PDF/Excel)

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Zustand (State Management)
- Axios
- React Icons
- React Big Calendar
- Recharts
- jsPDF & XLSX

## 📦 Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your backend API URL
VITE_API_URL=http://localhost:5000
```

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/          # Admin-specific components
│   └── public/         # Public-facing components
├── pages/
│   ├── admin/          # Admin pages
│   └── public/         # Public pages
├── layouts/            # Layout components
├── services/           # API services
├── store/              # Zustand stores
└── utils/              # Utility functions
```

## 🎨 Design System

### Colors
- **Primary**: Amber/Yellow gradients (#F59E0B, #FBBF24)
- **Background**: Dark grays (#111827, #1F2937)
- **Accent**: Various colors for status indicators

### Components
- Glassmorphism cards with backdrop-blur
- Rounded corners (xl, 2xl, 3xl)
- Gradient buttons and accents
- Smooth transitions and animations

## 🔒 Admin Panel Routes

- `/admin/login` - Admin authentication
- `/admin/dashboard` - Main dashboard
- `/admin/clients` - Client management
- `/admin/properties` - Property management
- `/admin/payments` - Payment tracking
- `/admin/projects` - Project portfolio
- `/admin/packages` - Service packages
- `/admin/users` - User management
- `/admin/messages` - Contact messages
- `/admin/reports` - Financial reports
- `/admin/timeline` - Calendar & Gantt views
- `/admin/settings` - System settings

## 🌐 Public Routes

- `/` - Home page
- `/about` - About us
- `/projects` - Project portfolio
- `/packages` - Service packages
- `/contact` - Contact form

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

This is part of the Future Construction Management System.

## 📄 License

MIT License
