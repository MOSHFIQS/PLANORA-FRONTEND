# Planora — Frontend

> A modern, role-aware event management platform. Browse, create, join, and manage events — with QR-based ticketing, Stripe payments, and a fully responsive dashboard.

**Live Site:** https://planora-frontend-1.vercel.app  
**Backend Repo:** https://github.com/MOSHFIQS/PLANORA-BACKEND  
**Frontend Repo:** https://github.com/MOSHFIQS/PLANORA-FRONTEND

---

## Table of Contents

- [Overview](#overview)
- [Role System](#role-system)
- [Tech Stack](#tech-stack)
- [Core Features](#core-features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages & Routes](#pages--routes)

---

## Overview

Planora is a full-featured event management system where users, organizers, admins, and super admins each have distinct access levels. Events can be **public** (discoverable by everyone) or **private** (invite-only, sent by the organizer to past participants). Joining any event — free or paid — automatically generates a unique QR-code ticket. Only the event's own organizer can scan and validate that ticket at the door.

---

## Role System

| Role | Created By | Capabilities |
|---|---|---|
| **User** | Self-register | Browse & join public events, receive invitations to private events, view tickets |
| **Organizer** | Self-register | All User capabilities + create/edit/delete own events, send private invitations, scan QR tickets |
| **Admin** | Super Admin | Manage users (view, suspend, delete) |
| **Super Admin** | Super Admin | All Admin capabilities + manage admins, create new admins & super admins |

> **Important:** Users and Organizers register themselves through the public `/register` page. Admin and Super Admin accounts can only be provisioned by an existing Super Admin from the dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI Library | ShadCN UI (Radix UI primitives) |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Forms | TanStack React Form |
| Validation | Zod v4 |
| Charts | Recharts |
| Carousel | Embla Carousel |
| QR Generation | qrcode.react |
| QR Scanning | html5-qrcode |
| Notifications | Sonner |
| Email | EmailJS |
| Animations | tw-animate-css |
| Auth | JWT (Access + Refresh Token, client-side) |

---

## Core Features

### Authentication
- Role-based registration and login
- JWT access & refresh token flow
- Protected routes per role
- Persistent sessions via secure cookies

### Event System
- Browse all public events with search and category filters
- Event detail pages with full info, pricing, and organizer info
- Create, edit, and delete events (Organizer only)
- **Public events** — visible and joinable by all authenticated users
- **Private events** — hidden; access only via organizer invitation sent to previous participants

### Participation & Tickets
- Join free or paid events
- Stripe payment flow for paid events with status tracking
- On successful join/payment → unique QR-code ticket is auto-generated
- Ticket displayed in user dashboard; downloadable

### QR Scanner (Organizer Only)
- Dedicated scanner page accessible only to the event's own organizer
- Real-time QR code scanning via device camera (html5-qrcode)
- Validates ticket authenticity and marks attendance

### Invitation System
- Organizers can invite past participants to private events
- Users receive and can accept or decline invitations from their dashboard

### Dashboards
- **User Dashboard** — my events, my tickets, invitations, payment history
- **Organizer Dashboard** — manage own events, participant lists, scanner access, analytics
- **Admin Dashboard** — user management (view, suspend, remove)
- **Super Admin Dashboard** — admin management + user management + create admin/super admin

### Reviews & Ratings
- Submit a star rating and comment after attending an event
- Aggregated ratings displayed on each event page

### Analytics (Organizer & Admin)
- Event participation charts (Recharts)
- Revenue tracking cards
- Real-time stats UI with React CountUp

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── (auth)/                 # login, register
│   ├── (home)/                 # public landing, events, event detail
│   ├── dashboard/              # user & organizer dashboard
│   ├── admin-dashboard/        # admin panel
│   └── super-admin-dashboard/  # super admin panel
├── actions/                    # Server actions (auth, events, payments…)
├── components/
│   ├── ui/                     # ShadCN base components
│   ├── shared/                 # Navbar, Footer, ImageUploader…
│   └── forms/                  # LoginForm, RegisterForm, CreateAdmin…
├── context/                    # AuthProvider, ThemeProvider
├── hooks/                      # useImageUpload, useAuth…
├── lib/                        # utils, fetcher, jwt helpers
└── types/                      # Shared TypeScript types
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm / npm / yarn

### Installation

```bash
git clone https://github.com/MOSHFIQS/PLANORA-FRONTEND
cd PLANORA-FRONTEND
npm install        # or pnpm install
```

### Development

```bash
npm run dev
```

App runs at `http://localhost:3000`

### Build

```bash
npm run build
npm run start
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# App base URL
NEXT_PUBLIC_BASE_URL=https://planora-frontend-1.vercel.app

# JWT (used for client-side token decode)
REFRESH_TOKEN_SECRET=refreshsecret

# EmailJS (Contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_n3iardc
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_ar53hfr
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=Sind91Xt8vc2v5BTl
```

> For production, set `NEXT_PUBLIC_API_URL` to `https://planora-backend-1.vercel.app/api/v1`

---

## Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/events` | Public | Browse all public events |
| `/events/[id]` | Public | Event detail page |
| `/login` | Guest | Login form |
| `/register` | Guest | Registration (User / Organizer) |
| `/dashboard` | User / Organizer | Personal dashboard, tickets, invitations |
| `/dashboard/scanner/[eventId]` | Organizer (own event) | QR ticket scanner |
| `/admin-dashboard` | Admin | User management |
| `/super-admin-dashboard` | Super Admin | Admin & user management, create admins |

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Lint source files
```