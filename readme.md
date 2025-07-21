# 🌌 Kiki's Portfolio

This is my personal portfolio site — built with React + Vite, styled in a minimalist, surreal aesthetic. It showcases my projects, thoughts, and art that I have created over the years.

This is my first project using TypeScript.

## 🧰 Tech Stack

- **React** (with hooks + functional components)
- **Vite** (fast dev server & build tool)
- **MongoDB** (scalable no-SQL database)
- **TypeScript** (with strict mode)
- **CSS Modules / Custom Themes**

## 🖼️ Features

- **Parallax-scrolling portfolio grid**  
  Made with `locomotive-scroll`, broken into dynamic columns.

- **Themeable UI**  
  CSS variables allow quick reskinning.

- **Smooth animations**  
  Built-in Framer Motion transitions between sections.

- **Infinite Scroll support**  
  Lazy loads project tiles with performance in mind.

- **Modular design**  
  Projects, images, and copy can be updated through a centralized data file on server.

## 🚀 Getting Started

1. Clone the repo:

```bash
    git clone https://github.com/kikiluvv/portfolio.git
    cd your-portfolio
```

2. Install dependencies:

```bash
    npm install
```
3. Run the dev server:

```bash
    npm run dev
```

4. Build for production:

```bash
    npm run build
```

5. Preview the production build:

```bash
    npm run preview
```

## ⚙️ TypeScript Config Notes

This project uses a strict `tsconfig.json` for max type safety.  
If you get the error:

`> Unknown compiler option 'erasableSyntaxOnly'`

Just remove `"erasableSyntaxOnly": true` from your `tsconfig.json`.  
That’s a proposed option and not officially supported (as of now).

## 🕳️ Known Issues

- Some animations may stutter on mobile or older browsers.
- Locomotive-scroll can behave oddly when resizing the window too fast.
- Infinite scroll performance may vary with large image files.

## 📜 License

MIT — use or remix as you please.

---

© 2025 1kikiluvv & appeal2heaven
