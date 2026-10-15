# Timeless Reminiscence — Vue Portfolio

## Features
- Vue 3 + Vite + Vue Router, with separate page files for Home, About, Projects, Games, Photography, Journal and Contact.
- Header links navigate to routes instead of scrolling to homepage sections.
- Shared CSS variables adapt text, backgrounds, borders and accents for light/dark themes.
- GSAP entrance/reveal animations and responsive layouts.

## Run locally
1. Install Node.js LTS.
2. In this folder run `npm install`.
3. Run `npm run dev`.
4. Open the local URL shown in the terminal.

## Page files
- `src/pages/HomePage.vue`
- `src/pages/AboutPage.vue`
- `src/pages/ProjectsPage.vue`
- `src/pages/GamesPage.vue`
- `src/pages/PhotographyPage.vue`
- `src/pages/JournalPage.vue`
- `src/pages/ContactPage.vue`

Category content is currently sample content in `src/components/CategoryPage.vue`, ready to replace with your own. Theme preference is saved in local storage.
