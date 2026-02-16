# Vineet Vora Portfolio - PRD

## Original Problem Statement
User requested a full rebuild of their portfolio website (www.vineetvora.dev) with new features and animations. Original site was vanilla HTML/CSS/JS with dark theme, particle backgrounds, and orange accents.

## Architecture
- **Frontend**: React 18 + Tailwind CSS + Framer Motion
- **Backend**: FastAPI + MongoDB (analytics + contacts)
- **Styling**: Tailwind CSS with custom theme (Syne + Manrope + Fira Code fonts)
- **Animations**: Framer Motion (scroll-triggered reveals, typewriter, staggered entrances)
- **Design System**: "Neural Architect" - Deep void black (#030712) with teal accent (#0EF6CC)

## User Persona
Vineet Vora - ML Engineer & Full-Stack Developer, MS in AI @ NJIT. Target audience: Recruiters, hiring managers, tech leads at AI/ML companies.

## Core Requirements (Static)
1. Hero section with animated name reveal + typewriter roles
2. About section with photo + bio + core principle + drives cards
3. Projects showcase (4 projects with stats, tech stacks, GitHub links)
4. Skills matrix (ML/AI, Data Engineering, Full Stack categories)
5. IEEE Publication section
6. Work Experience timeline (Xena Technologies)
7. Education cards (NJIT MS AI, VIT-AP BTech CS)
8. Certifications (IBM, Docker, GitHub Actions, Ethnus)
9. Contact section with email/LinkedIn/GitHub (no form per user request)
10. Particle canvas background + custom cursor
11. Responsive design + mobile hamburger menu
12. Smooth scroll navigation with active section highlighting

## What's Been Implemented

### Phase 1 (Jan 2026) - Full Rebuild
- [x] Full portfolio rebuild with React + Tailwind + Framer Motion
- [x] All 9 content sections with rich animations
- [x] Particle canvas background with mouse interaction
- [x] Custom cursor (desktop only)
- [x] Glassmorphism card effects
- [x] Scrolling tech skills ticker
- [x] Active nav highlighting on scroll
- [x] Mobile responsive with hamburger menu

### Phase 2 (Jan 2026) - Enhancements
- [x] Page preloader with branded animation (vineet.vora loading bar)
- [x] Full SEO optimization (OG tags, Twitter cards, structured data, canonical URL)
- [x] Resume PDF download (real resume wired to navbar button)
- [x] Scroll progress bar (teal glow at top of page)
- [x] Visitor analytics tracking (page views, referrers, device types stored in MongoDB)
- [x] Secret analytics dashboard (Ctrl+Shift+A) with visit stats, device breakdown, referrers
- [x] Contact form removed per user request

## Prioritized Backlog
### P0 (Critical)
- None remaining

### P1 (Important)
- Blog section integration
- Dark/Light theme toggle

### P2 (Nice to Have)
- Email notifications for contact form (needs SendGrid API key)
- Smooth scroll library (Lenis) for buttery scrolling
- Page transition animations between sections

## Next Tasks
1. Blog section if user wants it
2. Theme toggle (dark/light)
