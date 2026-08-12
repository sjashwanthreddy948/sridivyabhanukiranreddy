# Wedding Invitation

A production-ready, mobile-first wedding invitation for Sri Divya and Bhanu Kiran Reddy, styled with Telangana and South Indian traditional details.

## Features

- Telangana/South Indian traditional design
- Framer Motion animations with reduced-motion support
- Wedding event timeline and countdown support
- Responsive mobile, tablet, and desktop layouts
- Centralized, configurable wedding details
- Google Maps venue integration
- Optional music and RSVP controls
- Native share with a WhatsApp fallback
- English, Hindi, and Telugu content

## Tech Stack

- React
- Vite
- Framer Motion
- Lucide React
- CSS

## Local Setup

```bash
git clone <repository-url>
cd <project-folder>
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Configuration

All editable wedding information is in `src/data/weddingData.js`. Empty optional values—such as RSVP details, family members, livestream URLs, or a business website—are hidden cleanly in the interface.

Place production images in `public/images/` and optional audio in `public/audio/`. Use root-relative public paths such as `/audio/wedding-song.mp3` in the data file.

## Deployment

The project builds to the static `dist/` directory and can be deployed to Vercel, Netlify, GitHub Pages, or another static host. No client-side router or server rewrite is required.
