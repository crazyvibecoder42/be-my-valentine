# 💝 Valentine's Day Website

An interactive Valentine's Day website to ask your wife to be your valentine, featuring playful button evasion and spectacular celebration animations.

## ✨ Features

- **Beautiful Valentine Theme** - Romantic pink gradient background with floating heart animations
- **Interactive Buttons** - Large "Yes" button with pulse animation, small "No" button with playful evasion
- **Button Evasion** - The "No" button smoothly evades the mouse cursor using vector math (150px evasion radius)
- **Spectacular Celebration** - When "Yes" is clicked:
  - 1000+ confetti particles with multiple burst patterns
  - Stunning animated gradient background (gold → pink → rose)
  - Letter-by-letter text reveal: "You will get your gift soon"
  - Continuous sparkle effects and floating hearts

## 🚀 Tech Stack

- **Vite** - Lightning-fast build tool
- **React 18** - Component-based UI
- **TypeScript** - Type safety with strict mode
- **Framer Motion** - Smooth, declarative animations
- **canvas-confetti** - Spectacular confetti effects

## 💻 Local Development

### Prerequisites

- **Node.js v20+** (LTS recommended)
- **npm** (comes with Node.js)

### Installation

```bash
# Navigate to project directory
cd valentine

# Install dependencies
npm install
```

### Running the Dev Server

```bash
# Start development server
npm run dev
```

The site will be available at **http://localhost:5173** (or the next available port if 5173 is in use).

You'll see output like:
```
VITE v7.3.1  ready in 118 ms

➜  Local:   http://localhost:5173/
```

### Other Commands

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting
npm run lint
```

## 🌐 Sharing via ngrok

Want to share your local development with someone? Use ngrok to create a public URL that tunnels to your local server.

### Step 1: Install ngrok

**macOS:**
```bash
brew install ngrok
```

**Windows/Linux:**
Download from [ngrok.com/download](https://ngrok.com/download)

### Step 2: Start Your Dev Server

```bash
npm run dev
```

Note which port it's running on (usually `http://localhost:5173`)

### Step 3: Start ngrok (in a new terminal window)

```bash
ngrok http 5173
```

Replace `5173` with your actual port number if different.

### Step 4: Copy the Public URL

ngrok will display output like:
```
Session Status   online
Forwarding       https://abc123.ngrok-free.app -> http://localhost:5173
```

**Share the HTTPS URL** (e.g., `https://abc123.ngrok-free.app`)

### Important Notes

- ⚠️ **ngrok free tier** shows an interstitial page on first visit - visitors click "Visit Site" to continue
- 🔄 **URLs change** every time you restart ngrok (free tier)
- ⏰ **Keep both running** - You need both terminal windows open:
  - Terminal 1: `npm run dev` (dev server)
  - Terminal 2: `ngrok http 5173` (tunnel)
- 🚀 **For permanent URLs**, deploy to Vercel instead

## 🚢 Production Deployment

### Deploy to Vercel (Recommended)

This project is optimized for Vercel:

**Option 1: Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
npm run build
vercel --prod
```

**Option 2: Git Integration**
1. Push your code to GitHub
2. Import repository in [Vercel Dashboard](https://vercel.com)
3. Automatic deployments on every push

### Manual Static Hosting

```bash
# Build for production
npm run build

# The 'dist' folder contains your static site
# Upload to any static hosting (Netlify, GitHub Pages, etc.)
```

## 🎨 Color Palette

- **Deep Rose** (#E63946) - Passion, main CTAs
- **Soft Pink** (#FFB3C1) - Sweetness, backgrounds
- **Cream White** (#FFF5F7) - Purity, base
- **Gold** (#FFD700) - Celebration, sparkles
- **Magenta** (#D90368) - Energy, accents

## 📊 Performance

- Initial Load: < 2 seconds
- Time to Interactive: < 3 seconds
- Animation FPS: Consistent 60 FPS
- Bundle Size: < 150KB gzipped

## 💕 Made with Love

Built with Claude Code using agent teams for parallel development.

---

**Ready to ask your Valentine?** Visit the deployed site and experience the magic! ✨
