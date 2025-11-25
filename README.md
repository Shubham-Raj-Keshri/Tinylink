# 🚀 TinyLink — Neon UI Short Link Generator

**🔗 Live Demo (Public):**  
👉 https://tinylink-3p0fd46a4-shubham-keshris-projects-1365da39.vercel.app

This is a modern, neon-themed URL shortener built with **Next.js 14**, **Tailwind CSS**, and deployed on **Vercel**.  
Anyone can open the live link above and view the full UI publicly.

---

## ✨ Features

- 🔗 Create custom short URLs  
- 🎨 Neon Black + Red modern glassmorphism UI  
- 📊 Dashboard-style layout  
- 🚀 Automatic redirect from `/` → `/dashboard`  
- ⭐ Fully deployed and publicly accessible  
- ⚡ Fast Next.js production build  

---

## 🖼️ UI Preview  
*(Optional: add screenshots later)*

---

## 🛠️ Tech Stack

- **Next.js 14 (Pages Router)**
- **React**
- **Tailwind CSS**
- **Vercel Deployment**
- **API Routes (basic demo version)**

---

## 📂 Folder Structure
pages/
|_ index.js → redirects to /dashboard
|_ dashboard.js → neon UI
|_ api/links.js → demo API
components/
|_ Layout.jsx
|_ NeonForm.jsx
|_ NeonTable.jsx
styles/
|_ globals.css


---

## 🧪 Running Locally

```bash
# install dependencies
npm install

# start development server
npm run dev

# build for production
npm run build

# run production build locally
npm run start
🌐 Deployment

This project deploys automatically on Vercel from the main branch.
vercel --prod
📌 Notes

Current API uses in-memory storage (demo only)

Production-ready database (Postgres + Prisma) can be added anytime

UI is fully responsive and optimized for modern browsers
