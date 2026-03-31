# 🎉 Planora Frontend

Planora Frontend is a modern, responsive web application for managing and exploring events. It provides a seamless user experience for event creation, participation, payments, and admin management.

---

## 🌐 Live Site
https://planora-frontend-1.vercel.app

## 📂 Repository
https://github.com/MOSHFIQS/assignment-5-frontend

## 📹 Demo Video
https://drive.google.com/file/d/1ZWyYftonzO9oHqp-FAlkMMUPtsi4tSbz/view

---

## ⚛️ Tech Stack

### Core
- Next.js 16 (App Router)
- React 19
- TypeScript

### UI & Styling
- Tailwind CSS v4
- ShadCN UI (Radix UI)
- Lucide Icons
- Tailwind Merge & CVA

### State & Forms
- TanStack React Form
- Zod (Validation)

### Data & API
- Fetch API / Custom Services
- JWT Authentication (client-side handling)

### Features & Libraries
- Recharts (Charts & Analytics)
- Embla Carousel
- React CountUp
- React Day Picker
- QR Code (qrcode.react + html5-qrcode)
- Sonner (Toast notifications)
- EmailJS (Contact/Email service)

---

## 📌 Core Features

### 🔐 Authentication System
- Login & registration UI
- JWT token handling
- Protected routes
- Role-based UI rendering

### 🏠 Dashboard
- Admin dashboard
- User dashboard
- Analytics cards & charts
- Real-time stats UI

### 📅 Event Management
- Browse all events
- Filter & search events
- Event details page
- Create / edit / delete events

### 🎟️ Participation System
- Join events
- Track participation status
- Manage user activities

### 💳 Payment Integration
- Stripe payment flow UI
- Payment status handling
- Invoice display support

### 🎫 Ticket System
- QR code generation
- QR scanning (event check-in)
- Ticket validation UI

### ⭐ Reviews & Ratings
- Submit reviews
- Display ratings per event

### 📩 Invitations
- Accept / decline invitations
- Invitation tracking UI

### 🎨 UI/UX Highlights
- Fully responsive design
- Clean dashboard layout
- Interactive cards & charts
- Smooth hover & transition effects

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root:

```env
# API
NEXT_PUBLIC_API_URL=https://planora-backend-1.vercel.app/api/v1

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_n3iardc
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_ar53hfr
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=Sind91Xt8vc2v5BTl

# Local Development (optional)
# NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1