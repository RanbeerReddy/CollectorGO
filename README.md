# CollectorGO — NGO Field Data Collection App

CollectorGO is a mobile-first NGO field data collection application built using React Native + Expo.

The application is designed for field workers to access and fill KoboToolbox forms through a clean mobile interface while leveraging existing Kobo infrastructure for form handling, submissions, and data pipelines.

---

# Project Overview

This project is being developed for real-world NGO field operations where 30–50 field workers collect survey and outreach data from communities.

Instead of rebuilding an entire survey engine, CollectorGO integrates with existing KoboToolbox forms and workflows.

The app focuses on:

* field worker usability
* simplified workflows
* mobile accessibility
* centralized form access
* rapid MVP deployment

---

# MVP Goal

The MVP objective is to provide:

```text id="7jlwm3"
Field Worker
      ↓
Login
      ↓
View Available Forms
      ↓
Open Kobo Form
      ↓
Fill Survey
      ↓
Submit Data
```

KoboToolbox handles:

* form rendering
* validations
* submission handling
* backend storage
* exports
* data pipelines

CollectorGO acts as:

* a mobile wrapper
* workflow interface
* branded NGO field application

---

# Tech Stack

## Mobile

* React Native
* Expo
* TypeScript

## Navigation

* React Navigation

## Form Rendering

* react-native-webview

## Existing Infrastructure

* KoboToolbox

---

# Why WebView?

Rebuilding Kobo forms natively would require:

* dynamic form rendering
* skip logic
* validations
* uploads
* offline sync
* media handling

This dramatically increases complexity.

Using WebView allows:

* rapid MVP development
* reuse of existing Kobo workflows
* faster deployment
* reduced maintenance

---

# MVP Features

## Current MVP Scope

* Splash Screen
* Login Screen
* Forms List Screen
* Kobo Form WebView
* Submission Workflow

---

# Project Architecture

```text id="yjlwm1"
React Native App
        ↓
WebView
        ↓
Kobo Enketo Forms
        ↓
Kobo Backend
        ↓
NGO Data Pipeline
```

---

# Folder Structure

```text id="6jlwmx"
app/
├── src/
│   ├── screens/
│   ├── navigation/
│   ├── components/
│   ├── hooks/
│   ├── context/
│   ├── constants/
│   └── types/
├── assets/
├── App.tsx
├── app.json
└── package.json
```

---

# Development Philosophy

This project follows:

* MVP-first engineering
* minimal complexity
* rapid iteration
* real-world testing
* incremental scaling

The focus is:

* shipping quickly
* validating workflows
* testing with real users
* avoiding premature overengineering

---

# Development Workflow

## Local Development

```bash id="rjlwm5"
npx expo start
```

---

# Android Testing

Using:

* Expo Go
* Development Builds
* Physical Android devices

---

# APK Builds

```bash id="mjlwm7"
eas build --platform android
```

---

# Future Roadmap

## V2

* Authentication backend
* User management
* Form assignment
* Submission tracking
* Analytics dashboard

## V3

* Offline-first architecture
* Local database
* Background sync
* Media optimization

## V4

* AI-assisted analytics
* GIS/Map visualization
* Supervisor dashboards
* Reporting pipelines

---

# Engineering Notes

This project intentionally avoids:

* rebuilding KoboToolbox
* complex backend systems in MVP
* premature scalability engineering
* unnecessary state management

The goal is to:

* leverage existing infrastructure intelligently
* maximize development speed
* focus on user workflow

---

# Status

Current Stage:

## MVP Development Phase

---

# License

MIT License
