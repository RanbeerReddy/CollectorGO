# CollectorGO — NGO Field Data Collection & Operations Platform

CollectorGO is a scalable NGO field operations platform designed for data collection, field workforce management, analytics, and operational workflows.

Instead of rebuilding complex survey engines, CollectorGO integrates with existing **KoboToolbox** infrastructure for forms and submissions while providing a seamless mobile workflow, a centralized backend, and an interactive dashboard.

---

## 🏗 System Architecture

The repository is structured as a monorepo containing three core components:

### 1. Mobile App (`/app`)
- **Tech Stack:** React Native, Expo, TypeScript, React Navigation
- **Purpose:** Field worker application for authentication, viewing assigned forms, and seamlessly filling out Kobo Enketo forms via WebView. Focuses on field worker usability, simplified workflows, and mobile accessibility.

### 2. Backend API (`/backend`)
- **Tech Stack:** FastAPI, Python 3.12+, SQLAlchemy, PostgreSQL, asyncpg, Uvicorn
- **Purpose:** Centralized platform for user management, Kobo synchronization, reporting APIs, analytics, and exporting data.

### 3. Web Dashboard (`/dashboard`)
- **Tech Stack:** Next.js, React, Tailwind CSS
- **Purpose:** Administrative interface for supervisor dashboards, KPIs, worker management, and advanced NGO analytics.

---

## 🗂 Project Structure

```text
CollectorGO/
├── app/                  # React Native (Expo) Mobile App
│   ├── src/              # Screens, Navigation, Components, etc.
│   └── App.tsx
├── backend/              # FastAPI Backend Server
│   ├── app/              # API routes, models, schemas
│   ├── alembic/          # Database migrations
│   └── pyproject.toml    # Python dependencies (uv)
├── dashboard/            # Next.js Web Dashboard
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   └── package.json
├── docs/                 # Documentation
├── plan.md               # Original System Design and Roadmap
└── README.md             # This file
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (for mobile and dashboard)
- [Python 3.12+](https://www.python.org/) (for backend)
- [Expo CLI](https://expo.dev/)
- PostgreSQL database

### Running the Mobile App
```bash
cd app
npm install
npx expo start
```

### Running the Backend Server
```bash
cd backend
# Install dependencies using uv
uv sync
# Run the FastAPI server
uv run uvicorn app.main:app --reload
```

### Running the Dashboard
```bash
cd dashboard
npm install
npm run dev
```

---

## 🗺 Roadmap & Strategy

CollectorGO is being developed in phases to prioritize rapid iteration, real-world validation, and incremental scaling:

- **Phase 1 (MVP):** Mobile wrapper for KoboToolbox forms (validation & workflows).
- **Phase 2 (Operational Layer):** FastAPI backend + PostgreSQL for centralized user and submission management.
- **Phase 3 (Analytics Platform):** Next.js dashboard with KPIs, reporting, and GIS layers.
- **Phase 4 (Intelligent Ops):** AI-assisted anomaly detection, NLP summaries, and predictive analytics.

For the full detailed roadmap and system design, please see [`plan.md`](./plan.md).

---

## 📄 License

MIT License

