import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Apply the saved theme before Vue renders to prevent dark text flashing on dark backgrounds.
const savedTheme = localStorage.getItem('tr-theme') || 'light'
document.documentElement.dataset.theme = savedTheme

createApp(App).use(router).mount('#app')
