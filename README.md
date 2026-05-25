# flemlabs
### Premium Cinematic Digital Artwork Service Platform & Web3 Asset Forge
**Live URL:** [https://flemlabs.onrender.com](https://flemlabs.onrender.com)

flemlabs is a high-end, full-stack digital artwork commission and asset forge web application designed for elite creative professionals and digital art agencies. The system combines modern cinematic aesthetics, large editorial typography, interactive Web3/MetaMask payment handshakes, live support chat consulting, and real-time escrow tracking timelines.

---

## Cinematic Design System

- **Pitch Black Background** (#000000)
- **Luxury Cream Text** (#E1E0CC)
- **Sophisticated Warm Beige Accents** (#DEDBC8)
- **Glassmorphic Frosted Surfaces** (#101010 & #212121 with backdrop-filter blurs)
- **High-End Typography**: Google Fonts Almarai (sans-serif geometric layouts) and Instrument Serif (italics for luxury editorial statements)
- **Animated SVG Film Grain/Noise Texture Overlays** and soft vignette spotlight layers.
- **Fully Responsive Mobile Interface**: Features a beautiful expanding floating glass navbar with a custom hamburger menu drawer, optimizing all pages for mobile phone screens!

---

## Full-Stack Technology Stack

### Frontend (Client Portal)
- **React 18** with **Vite** (Next-generation build tool)
- **TypeScript** (Robust typed system schemas)
- **Tailwind CSS** (Premium structural sizing utility layout)
- **Framer Motion** (Smooth typographic reveals and slide transitions)
- **Lucide React** (Elite linear design system icons)
- **EmailJS SDK**: Integrated client-side mail dispatcher linked to service_tq8w66k for instant direct email alerts.

### Backend (Command API Core)
- **Node.js** with **Express.js** (API routing)
- **JWT (JSON Web Tokens)** (Role-based secure route shielding)
- **BCrypt.js** (Organic cryptographic password hashing)
- **CORS & Dotenv** (Environmental configuration handlers)

### Database Layer
- **Persistent MongoDB Atlas Cloud**: Configured via DATABASE_URL environment variables for robust multi-device storage (computers, phones, tablets) that persists permanently across server recycles.
- **Automated Flat-File JSON Database Fallback**: Built directly into server/config/db.js. If MongoDB is offline, the server seamlessly saves users, reviews, orders, and payments into local flat-files under server/data/. This guarantees 100% plug-and-play success on launch with zero setup requirements!

---

## Step-by-Step Installation & Run Guide

To run and test the complete application locally, follow these steps:

### Prerequisites
Make sure you have Node.js (Version 16 or newer) installed on your machine. (MongoDB is optional due to our flat-file database fallback engine).

### 1. Extract and Navigate
Open your shell terminal (PowerShell, Command Prompt, or Bash) in the project root folder:
```bash
cd "c:\Users\Araiz\Downloads\web assignment ide"
```

### 2. Install Project Dependencies
Run the unified multi-folder install script from the root folder. This automatically installs packages for root, frontend client, and Express server concurrently:
```bash
npm run install:all
```
*(Alternatively, you can manually run npm install inside the root, client/ and server/ folders)*

### 3. Launch Dev Servers (Client + API Core)
Start both servers concurrently. The backend API runs on port 5000 and the Vite/React portal launches on port 5173 with a proxy bridge:
```bash
npm run dev
```

Open your browser and navigate to http://localhost:5173 to enter the cinematic flemlabs studio!

---

## Pre-Configured Sandbox Accounts for Grading

To easily test both customer and administrator workflows immediately, the database auto-seeder seeds the following credentials:

### Senior Admin Account (Command Dashboard)
- **Email**: admin@flemlabs.com
- **Password**: admin123
*Log in with this account to accept pending commissions, advance the active timeline (Created -> Accepted -> Asset Forge -> Delivered), decline orders, view payments, and moderates/delete reviews.*

### Standard Customer Account
You can register any new customer account directly from the register portal!

---

## Interactive Sandbox Mechanics

1. **Integrated MetaMask Web3 Gateway**
   - **Navbar Connect Button:** Users can securely link their crypto wallets directly from the navbar header! Shows an active, pulsing green indicator and a truncated wallet address (e.g. 0x3a4f...8c2b) with an option to disconnect.
   - **Checkout Gateway:** Toggles payment flow securely to MetaMask. If the extension is detected, it requests a real transaction signature request. If not, our gorgeous secure Web3 ledger simulator modal handles the broadcast, mining block validations, Tx hash writing, and logs the secure crypto payment!

2. **Official EmailJS Dispatcher**
   - Submitting a message in the Contact Us form triggers the official EmailJS client SDK, sending client briefs directly to muhammadumairshake@gmail.com instantly with disabled loading button states and validation handling!

3. **Editable Portfolio Placeholder Creator**
   - At the top of the Portfolio page, you will find an Add Art Placeholder button. This renders an administrative uploader interface letting you type titles, clients, specifications, and paste image links to generate a brand new live masonry portfolio card immediately.

4. **Contextual Live Chat Consultant**
   - Floating in the bottom-right corner is our custom Creative Director Assistant widget (flembot). Click to open a full chat system featuring pre-configured buttons or type custom messages. If you ask about orders, rates, portfolios, or how to connect MetaMask, he answers contextually with organic typing latencies!

5. **Production Timelines Trackers**
   - Every customer can monitor active commissions via their track dashboard. As the Admin updates the status in the command panel, the timeline immediately advances with glowing neon nodes. If cancelled, it collapses into a detailed termination summary citing administrative decline reasons.

---

## Presentation Slides Outline (Gain 10 Marks CLO-3)

To assist with your required presentation and slide uploads, here is the recommended structure for your slides:

### Slide 1: Cover Page
- **Title**: flemlabs: Immersive Digital Art Commission Portal
- **Sub-header**: Full-Stack Premium Atelier platform for Elite Agencies
- **Info**: [Your Name, Roll Number, Class Coordinates]

### Slide 2: The Creative Brief & Architectural Stack
- **Design System**: Cinematic Dark Minimalism (Pitch Black #000000, Cream #E1E0CC, Warm Accent #DEDBC8, Almarai & Instrument Serif font styling). Fully responsive mobile menu drawer.
- **Core Stack**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Node.js + Express, Mongoose + MongoDB Atlas.
- **Robust Feature**: Zero-Setup Hybrid DB (Auto JSON fallback if local MongoDB is offline).

### Slide 3: Client Handshake & Portfolios
- **Filterable Showcase**: Masonry layout instantly sorting 2D Art, 3D models, illustrations, logos, streetwear vectors, and typography settings.
- **Future-Proofing**: Interactive placeholder uploader to dynamically append new artwork items.

### Slide 4: Unified Commission Center
- **Dynamic Rates Calculation**: Automatically maps USD pricing when toggling service listings and packages (Basic / Standard / Pro).
- **Web3 Payments**: Integrated MetaMask cryptographically secure personal signature validation blocks and ledger transactions.

### Slide 5: Command Center Admin Panel
- **SaaS Analytics**: Stat cards reflecting Total Sales, Orders, Average test ratings, and review moderators.
- **CRUD Operations**: Interactive control table pipelines to Accept, Initiate Production, Deliver, or decline/cancel commissions.

---

Curated with passion by Antigravity (Google DeepMind Team). High-fidelity, cinematic Web3 experiences.
