# Teammate Handoff: VARTAMAN AI Dashboard

## Project Status: Phase 1 Complete

**Date:** July 22, 2026
**Stack:** Next.js 16 + React 19 + MUI v9 + TypeScript + Recharts + Lucide Icons
**Dev Server:** `http://localhost:3001` (or `http://localhost:3000`)

---

## Quick Start

```bash
cd "C:\Users\BIT\Desktop\ai news room phase 1"
npm install
npm run dev
```

**Login:** `admin@dashb.com` / `password123`

---

## Architecture Overview

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Login page (unchanged)
│   ├── layout.tsx                # Root layout (Redux + MUI + NewsroomProvider)
│   ├── dashboard/page.tsx        # Main dashboard with metrics
│   ├── assignments/page.tsx      # Screen 1: Assignment Desk
│   ├── approval/page.tsx         # Screen 2: Approval Portal
│   ├── digital/page.tsx          # Screen 3: Digital Dashboard
│   └── ai-content/page.tsx       # Screen 4: AI Content Review
├── components/
│   ├── Newsroom/                 # NEW: All newsroom components
│   │   ├── NewsroomDashboard.tsx
│   │   ├── AssignmentDesk.tsx
│   │   ├── ApprovalPortal.tsx
│   │   ├── DigitalDashboard.tsx
│   │   └── AIContentReview.tsx
│   ├── Header/
│   │   ├── DashBoardCommonHeader.tsx  # UPDATED: role switcher + notifications
│   │   └── SearchModal.tsx            # UPDATED: newsroom search
│   ├── leftNavigation/
│   │   └── leftNavigation.tsx         # UPDATED: newsroom nav items
│   └── Overview/
│       └── NavigationLabel.tsx        # UPDATED: supports Lucide icons
├── types/
│   └── newsroom.ts               # NEW: All TypeScript types
├── data/
│   └── demoData.ts               # NEW: Demo data generator
└── providers/
    └── NewsroomProvider.tsx       # NEW: State management + localStorage
```

---

## Key Files to Understand

### 1. `src/types/newsroom.ts`
All types, interfaces, and role permission definitions. Start here to understand the data model.

**Key types:**
- `UserRole` — 5 roles: admin, editor, assignment_desk, digital_team, viewer
- `Story` — News stories with status, category, priority, reporter
- `AIContent` — AI-generated social media posts
- `PlatformEngagement` — Per-platform metrics
- `Notification` / `ActivityItem` — Timeline and notifications
- `ROLE_PERMISSIONS` — Permission matrix for each role

### 2. `src/providers/NewsroomProvider.tsx`
The central state management. Uses React Context + localStorage.

**Available via `useNewsroom()` hook:**
```typescript
const {
  // Data
  stories, aiContent, engagement, activity, notifications, reporters,

  // Role
  currentRole, setRole, permissions,

  // Story actions
  updateStoryStatus, updateStory, assignStory,

  // AI Content actions
  updateAIContentStatus, updateAIContentCaption,

  // Notifications
  markNotificationRead, markAllNotificationsRead, unreadCount,

  // Activity
  addActivity,

  // Reset
  resetDemo,

  // Computed metrics
  metrics, // { storiesPending, storiesApproved, storiesRejected, aiGeneratedPosts, pendingAIApproval, publishedToday }
} = useNewsroom();
```

### 3. `src/data/demoData.ts`
Generates and persists demo data. Data is stored in localStorage key `newsroom_data`.

**Functions:**
- `generateAndStoreData()` — Creates initial data
- `loadData()` / `saveData()` — Read/write localStorage
- `resetData()` — Clear and regenerate

### 4. `src/components/leftNavigation/leftNavigation.tsx`
Sidebar navigation. Uses Lucide icons (not MUI icons).

**Nav items and their routes:**
| Label | Route | Required Permission |
|-------|-------|-------------------|
| Dashboard | `/dashboard` | canAccessDashboard |
| Assignment Desk | `/assignments` | canAccessAssignmentDesk |
| Approval Portal | `/approval` | canAccessApprovalPortal |
| Digital Dashboard | `/digital` | canAccessDigitalDashboard |
| AI Content Review | `/ai-content` | canAccessAIContentReview |

Restricted items show a Lock icon and are grayed out.

### 5. `src/components/Header/DashBoardCommonHeader.tsx`
Top header with role switcher, activity timeline, notifications, theme toggle, and search.

---

## RBAC Permission Matrix

| Feature | Admin | Editor | Assignment Desk | Digital Team | Viewer |
|---------|-------|--------|----------------|--------------|--------|
| Dashboard | ✓ | ✓ | ✓ | ✓ | ✓ |
| Assignment Desk | ✓ | ✗ | ✓ | ✗ | ✗ |
| Approval Portal | ✓ | ✓ | ✗ | ✗ | ✗ |
| Digital Dashboard | ✓ | ✗ | ✗ | ✓ | ✗ |
| AI Content Review | ✓ | ✗ | ✗ | ✓ | ✗ |
| Approve/Reject News | ✓ | ✓ | ✗ | ✗ | ✗ |
| Edit Content | ✓ | ✓ | ✗ | ✗ | ✗ |
| Create Assignments | ✓ | ✗ | ✓ | ✗ | ✗ |
| Approve Social Content | ✓ | ✗ | ✗ | ✓ | ✗ |
| View Only (buttons disabled) | ✗ | ✗ | ✗ | ✗ | ✓ |

---

## localStorage Keys

| Key | Contents |
|-----|----------|
| `newsroom_data` | All stories, AI content, engagement, activity, notifications |
| `newsroom_role` | Currently selected role |
| `token` | Auth token (cosmetic, for login flow) |
| `themeMode` | Light/dark mode preference |
| `purchases` | Legacy data (from original dashboard) |

---

## Existing Design System (DO NOT CHANGE)

The new components MUST follow these patterns:

### Colors
```typescript
// MUI Theme
palette.primary.main: "#000000" (light) / "#ffffff" (dark)
palette.background.default: "#f8f9fa" (light) / "#121212" (dark)
palette.background.paper: "#ffffff" (light) / "#1e1e1e" (dark)
palette.text.primary: "#000000" (light) / "#ffffff" (dark)
palette.text.secondary: "#6D6E6F" (light) / "#b0b0b0" (dark)
```

### Typography
```
Font: Inter, sans-serif
Base: 13px
Body: 0.875rem (14px)
Small: 0.8125rem (13px)
Title: 1.125rem (18px)
```

### Border Radius
```
Cards: 12px
Modals: 16px
Buttons: 12px (MUI default), 24px (primary CTA)
Chips: 6px-8px
Tables: 16px
```

### Shadows
```
Cards: 0px 4px 20px rgba(0, 0, 0, 0.03)
Hover: 0px 8px 24px rgba(0, 0, 0, 0.08)
Modal: 0 24px 80px rgba(0, 0, 0, 0.35)
```

### Spacing
```
Content max-width: 1100px (centered)
Sidebar: 188px wide, 24px margin
Card padding: 14px-18px
Section gap: 24px
```

---

## Component Patterns

### Page Layout (every page follows this)
```tsx
<Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, width: "100%", minHeight: "100vh", gap: { xs: 0, lg: "12px" }, backgroundColor: "background.default" }}>
  <Box sx={{ flexShrink: 0 }}>
    <LeftNavigation />
  </Box>
  <Box sx={{ flexGrow: 1, px: { xs: "14px", md: "20px" }, paddingBottom: "20px" }}>
    <DashBoardCommonHeader />
    <Box sx={{ mx: "auto", width: "100%", maxWidth: "1100px" }}>
      {/* Page content here */}
    </Box>
  </Box>
</Box>
```

### Card Pattern
```tsx
<Box sx={{
  backgroundColor: "background.paper",
  borderRadius: "12px",
  p: 2,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
  border: "1px solid",
  borderColor: "divider",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": { transform: "translateY(-2px)", boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)" },
}}>
```

### Status Chip Pattern
```tsx
<Chip
  label={status.replace("_", " ")}
  size="small"
  sx={{
    fontSize: "0.625rem",
    height: 22,
    fontWeight: 600,
    backgroundColor: STATUS_COLORS[status].bg,
    color: STATUS_COLORS[status].text,
    borderRadius: "6px",
    textTransform: "capitalize",
  }}
/>
```

---

## Icons

**Use Lucide React** for all new components:
```bash
npm install lucide-react
```

Common icons used:
```tsx
import { LayoutDashboard, ClipboardList, CheckCircle, BarChart3, Sparkles, Search, Send, Lock, Eye, XCircle, Pencil, Save, X, Bell, Clock, User, Zap, Moon, Sun, LogOut, Filter, TrendingUp, TrendingDown, Eye, ThumbsUp, Share2, MessageCircle } from "lucide-react";
```

In `NavigationLabel`, the `logo` prop accepts either:
- An image source (SVG/PNG) — rendered as `<img>`
- A React element (Lucide icon) — rendered in a flex container

---

## Known Issues / Gotchas

1. **MUI v9 Breaking Changes:**
   - `InputProps` is deprecated → use `slotProps.input`
   - `Paper` default borderRadius is now `12px`

2. **Next.js 16 + Turbopack:**
   - `AGENTS.md` warns about breaking changes
   - Check `node_modules/next/dist/docs/` before writing new Next.js code

3. **Hydration:**
   - The Chatbot component (`src/components/Chat/Chatbot.tsx`) causes hydration errors because it renders conditionally based on client state
   - All new components use `"use client"` directive

4. **Demo Data:**
   - Data regenerates if localStorage is cleared
   - `resetDemo()` in the provider clears everything

5. **Port:**
   - Default port 3000 may be in use; dev server falls back to 3001

---

## Backend Architecture Decisions — NEED YOUR INPUT

Before building the backend, answer these questions. Each decision affects every other.

### Question 1: Backend Language & Framework

**Option A: Next.js API Routes (Same Project)**
- Pros: Single codebase, shared types, no CORS, simpler deployment
- Cons: Ties backend to Node.js, harder to use Python ML/AI libraries later
- Best for: Simple CRUD, auth, no heavy AI/ML processing

**Option B: Python (FastAPI / Django) — Separate Service**
- Pros: Best for AI/ML (OpenAI, Hugging Face, scikit-learn), rich ecosystem, async support
- Cons: Two codebases to maintain, CORS setup, separate deployment
- Best for: AI content generation, NLP, image analysis, data pipelines

**Option C: Python (FastAPI) + Next.js API Routes — Hybrid**
- Pros: Next.js handles auth/simple CRUD, Python handles AI workloads
- Cons: Most complex to set up, two services to deploy
- Best for: Production-grade apps with both web logic AND AI features

**Your choice:** _______________

**Why:** _______________

---

### Question 2: Database

**Option A: PostgreSQL**
- Pros: Full-featured, JSON support, great for structured data
- Best for: Production apps, complex queries, relations

**Option B: MongoDB**
- Pros: Flexible schema, fast prototyping, JSON-native
- Best for: Rapid iteration, unstructured content, documents

**Option C: SQLite**
- Pros: Zero setup, file-based, single-server
- Best for: Demos, small apps, single-user

**Option D: Supabase (PostgreSQL + real-time)**
- Pros: Managed, auth built-in, real-time subscriptions, free tier
- Best for: Fast deployment, real-time features, less DevOps

**Your choice:** _______________

**Why:** _______________

---

### Question 3: Authentication

**Option A: NextAuth.js (Auth.js)**
- Pros: Built into Next.js, OAuth providers, session management
- Best for: Next.js-only apps

**Option B: JWT + Custom Auth**
- Pros: Full control, works across any frontend/backend combo
- Best for: Custom auth flows, multi-service architectures

**Option C: Supabase Auth**
- Pros: Built-in, OAuth, magic links, row-level security
- Best for: Supabase users,快速 setup

**Option D: Firebase Auth**
- Pros: Managed, OAuth, phone auth, anonymous auth
- Best for: Google ecosystem, quick prototyping

**Your choice:** _______________

**Why:** _______________

---

### Question 4: AI Integration

**Option A: OpenAI API (GPT-4, DALL-E)**
- Pros: Best quality, easy API, image generation
- Cost: ~$0.03-0.06 per 1K tokens, $0.04/image

**Option B: Local LLM (Ollama / llama.cpp)**
- Pros: Free after setup, no API costs, privacy
- Cons: Needs GPU, lower quality, slower
- Best for: Offline, cost-sensitive, privacy-first

**Option C: Replicate / Hugging Face**
- Pros: Wide model selection, pay-per-use
- Best for: Experimenting with different models

**Option D: No AI yet — add later**
- Pros: Ship faster, focus on core features first
- Best for: MVP first, AI second

**Your choice:** _______________

**Why:** _______________

---

### Question 5: Deployment

**Option A: Vercel (Next.js) + Railway/Fly.io (Python)**
- Pros: Vercel is best for Next.js, Railway for Python services
- Cost: Free tier available, scales well

**Option B: Docker Compose (single server)**
- Pros: Everything in one place, reproducible, cheaper
- Cons: More DevOps, single point of failure

**Option C: AWS / GCP / Azure**
- Pros: Enterprise-grade, scalable, full control
- Cons: Complex, expensive, steep learning curve

**Option D: Local only — no deployment yet**
- Pros: Focus on development, no infrastructure costs
- Best for: Internal demos, learning

**Your choice:** _______________

**Why:** _______________

---

### Question 6: API Design

**Option A: REST API**
- Pros: Universal, simple, well-understood
- Best for: CRUD apps, standard web apps

**Option B: GraphQL**
- Pros: Flexible queries, no over-fetching, strong typing
- Best for: Complex data relationships, multiple frontends

**Option C: tRPC (if staying in Next.js)**
- Pros: End-to-end TypeScript, no schema duplication
- Best for: Full-stack TypeScript apps

**Your choice:** _______________

**Why:** _______________

---

### Question 7: Real-time Features

**Option A: Polling (simplest)**
- Pros: No extra infrastructure, works everywhere
- Cons: Wastes bandwidth, not instant

**Option B: WebSockets (Socket.io)**
- Pros: Real-time, bidirectional
- Best for: Live updates, collaboration

**Option C: Server-Sent Events (SSE)**
- Pros: Simpler than WebSockets, one-way
- Best for: Notifications, live feeds

**Option D: Supabase Real-time**
- Pros: Built-in, no extra setup
- Best for: If using Supabase

**Your choice:** _______________

**Why:** _______________

---

### Question 8: What features get a real backend first?

Rank these by priority (1 = highest):

| Feature | Priority | Notes |
|---------|----------|-------|
| Login / auth (real users) | ___ | |
| Story CRUD (create, edit, delete) | ___ | |
| Approval workflow (real status changes) | ___ | |
| AI content generation | ___ | |
| Image upload / management | ___ | |
| Engagement data (real API or scraping) | ___ | |
| Notifications (real-time) | ___ | |
| User management (roles, permissions) | ___ | |
| Search (full-text) | ___ | |
| Export (PDF, CSV) | ___ | |

---

### Question 9: Environment & Team

- How many developers will work on this? _______________
- Do you have experience with Python? Y / N
- Do you have experience with Docker? Y / N
- Do you have a cloud account (AWS/GCP/Vercel)? Y / N
- What's the target launch date? _______________
- Is this an internal tool or public-facing? _______________

---

### Question 10: Data Migration

The current demo uses localStorage. When we add a backend:

**Option A: Fresh start — new DB, migrate manually**
- Write a script to seed the DB with demo data
- Clean, no legacy data issues

**Option B: Keep localStorage as fallback**
- App works offline, syncs when online
- More complex, but better UX

**Option C: Import/export JSON**
- User can export localStorage data and import into new system
- Good for transition period

**Your choice:** _______________

**Why:** _______________

---

## Summary: Your Backend Stack Recommendation

After answering above, fill in:

```
Language:     _______________
Framework:    _______________
Database:     _______________
Auth:         _______________
AI Service:   _______________
API Style:    _______________
Real-time:    _______________
Deployment:   _______________
```

---

## What's NOT Done (Future Work)

### High Priority
- [ ] **Settings page** — Admin-only settings panel
- [ ] **User management** — Add/remove reporters, assign roles
- [ ] **Story creation form** — Currently stories are only generated as demo data
- [ ] **Image upload** — AI content currently uses placeholder images
- [ ] **Mobile sidebar fix** — The hamburger menu z-index may need adjustment

### Medium Priority
- [ ] **Export functionality** — Export stories/reports as CSV/PDF
- [ ] **Advanced filtering** — Date range filters, multi-select
- [ ] **Story detail page** — Full page view instead of just modal
- [ ] **Real-time simulation** — Auto-refresh engagement numbers periodically
- [ ] **Chart tooltips** — Improve Recharts tooltip styling

### Low Priority
- [ ] **E2E tests** — Playwright or Cypress
- [ ] **Unit tests** — Jest + React Testing Library
- [ ] **Performance** — Virtualized lists for large datasets
- [ ] **Accessibility audit** — WCAG 2.1 AA compliance
- [ ] **Keyboard navigation** — Full keyboard support for modals/dropdowns

---

## Testing Checklist

After making changes, verify:

- [ ] Login works with `admin@dashb.com` / `password123`
- [ ] All 5 nav items visible for Admin role
- [ ] Switching to Viewer role grays out all nav items except Dashboard
- [ ] Switching to Editor shows only Dashboard + Approval Portal
- [ ] Switching to Assignment Desk shows only Dashboard + Assignment Desk
- [ ] Switching to Digital Team shows Dashboard + Digital + AI Content
- [ ] Assignment Desk: "Send for Review" changes status to Pending Approval
- [ ] Approval Portal: Click story opens modal, Approve/Reject/Edit work
- [ ] Digital Dashboard: All 5 platform cards show with animated counters
- [ ] AI Content Review: Tabs filter correctly, Preview opens modal
- [ ] Notifications bell shows unread count, clicking marks as read
- [ ] Activity timeline shows recent actions
- [ ] Cmd+K opens search, filtering works
- [ ] Dark mode toggle works across all pages
- [ ] All data persists after page refresh
- [ ] No TypeScript errors (`npx next build` passes)

---

## File Change Log

### New Files
```
src/types/newsroom.ts
src/data/demoData.ts
src/providers/NewsroomProvider.tsx
src/components/Newsroom/NewsroomDashboard.tsx
src/components/Newsroom/AssignmentDesk.tsx
src/components/Newsroom/ApprovalPortal.tsx
src/components/Newsroom/DigitalDashboard.tsx
src/components/Newsroom/AIContentReview.tsx
src/app/assignments/page.tsx
src/app/approval/page.tsx
src/app/digital/page.tsx
src/app/ai-content/page.tsx
```

### Modified Files
```
src/constants/index.ts              # APP_NAME changed
src/app/layout.tsx                  # Added NewsroomProvider, updated metadata
src/app/dashboard/page.tsx          # Replaced old dashboard with NewsroomDashboard
src/components/Login/LoginForm.tsx  # Rebranded to VARTAMAN AI
src/components/leftNavigation/leftNavigation.tsx  # New nav items + Lucide icons
src/components/Header/DashBoardCommonHeader.tsx   # Role switcher + notifications
src/components/Header/SearchModal.tsx             # Newsroom search
src/components/Overview/NavigationLabel.tsx        # Supports Lucide icons
```

### Unchanged Files
```
src/components/Chat/Chatbot.tsx     # Still uses MUI icons (not touched)
src/components/Button/Button.tsx    # Original CTA button
src/components/Button/usefulButton.tsx
src/redux/*                         # Redux auth (still works)
src/components/purchases/*          # Legacy pages (still exist)
src/components/receipts/*           # Legacy pages
src/components/properties/*         # Legacy pages
src/components/reports/*            # Legacy pages
src/components/users/*              # Legacy pages
src/components/companies/*          # Legacy pages
```

---

## Quick Reference Commands

```bash
# Start dev
npm run dev

# Build for production
npx next build

# Check for TypeScript errors
npx tsc --noEmit

# Lint
npm run lint
```

---

## Questions?

Contact the original developer. The codebase is self-documenting with inline comments where needed.
