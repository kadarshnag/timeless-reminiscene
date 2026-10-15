import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import AboutPage from './pages/AboutPage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'
import GamesPage from './pages/GamesPage.vue'
import PhotographyPage from './pages/PhotographyPage.vue'
import JournalPage from './pages/JournalPage.vue'
import ContactPage from './pages/ContactPage.vue'

export default createRouter({ history: createWebHistory(), scrollBehavior: () => ({ top: 0 }), routes: [
 { path: '/', component: HomePage },
 { path: '/about', component: AboutPage },
 { path: '/projects', component: ProjectsPage },
 { path: '/games', component: GamesPage },
 { path: '/photography', component: PhotographyPage },
 { path: '/journal', component: JournalPage },
 { path: '/contact', component: ContactPage },
] })
