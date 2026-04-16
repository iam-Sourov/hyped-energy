# Hyped Energy Agency Website

Welcome to the Hyped Energy agency website repository. This is a highly interactive, responsive, and mobile-first website built with modern web technologies to showcase the agency's creative work, strategy, and expertise.

## 🚀 Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Design System**: Custom CSS variables with fluid layout and pixel-perfect clamp configurations.

## 🌟 Features

- **Fluid Responsive Design**: Utilizes `clamp()`, viewport units (`vw`, `vh`) for consistent scaling across devices.
- **Scroll-Triggered Animations**: Implemented using GSAP ScrollTrigger and Framer Motion for deep, interactive user experiences (e.g., sticky expertise cards).
- **Interactive Bento Grid**: Engaging video grids leveraging hardware-accelerated 3D tilt effects on desktop and seamless autoplay on mobile devices.
- **Infinite Moving Cars/Marquees**: Fluid and performant infinite scroll banners displaying partner logos and dynamic cards.
- **Micro-Interactions**: Enhanced hover effects, dynamic cursors, and custom pop animations across interactive components to deliver a "wow" factor.
- **Internationalization**: All copy on the website has been localized and translated into English.

## 📂 Project Structure

- `app/` - Next.js App Router providing the primary layout and main page construction.
- `components/` - React components including individual sections (`hero`, `about`, `expertise`, `bento-grid`, `footer`) and reusable UI elements.
- `public/` - Static assets including images, videos, and fonts.
- `lib/` - Utility functions configuring stylistic classes (`utils.ts`).

## 🛠️ Usage & Setup

Ensure you have Node.js installed, then run the following to boot up the project:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Architecture & Styling Notes

- **Aesthetics First**: Designed keeping in mind visual excellence with custom vibrant color palettes, smooth gradient effects, and high contrast tracking text.
- **Mobile-First Paradigm**: All components are optimized for smaller screens displaying an alternative UX that maintains visual integrity while circumventing performance-heavy effects only suitable on desktop.

---

*Designed and engineered to bring energy right to your fingertips.*
