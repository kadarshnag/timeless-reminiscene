<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowRight, ArrowUpRight, Sun, Moon, Menu, X, Code2, Camera, Gamepad2, Github, Linkedin, Instagram, Youtube, Mail, MapPin, ExternalLink, Play, MoveUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-vue-next'
import logo from '../assets/brand-logo.png'
import { substackPosts, substackPhotos } from '../data/substackData.js'

gsap.registerPlugin(ScrollTrigger)
const dark = ref((localStorage.getItem('tr-theme') || 'light') === 'dark')
const menuOpen = ref(false)
const activePhoto = ref(null)
const contactCopied = ref(false)
const email = 'adarshnagk22@gmail.com'
const substackUrl = 'https://timelessreminiscences.substack.com/'
const nav = [ ['About','/about'], ['Projects','/projects'], ['Games','/games'], ['Photography','/photography'], ['Journal','/journal'], ['Contact','/contact'] ]
const projects = [
  { n:'01', title:'HRMS System', type:'ENTERPRISE / HR TECH', desc:'Employee onboarding, leave management and attendance workflows built with the Frappe framework.', stack:['Frappe','ERP','Workflow Design'], image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1100&q=85', link:'/projects' },
  { n:'02', title:'Procurement Management Platform', type:'FULL-STACK / OPERATIONS', desc:'A Vue.js and Django platform for vendor registration, purchase requisitions and approval workflows.', stack:['Vue.js','Django','REST APIs'], image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=85', link:'/projects' },
  { n:'03', title:'SaaS & Microservices', type:'BACKEND / CLOUD', desc:'FastAPI-based SaaS services with background processing, messaging and payment integrations.', stack:['Python','FastAPI','Celery','RabbitMQ'], image:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1100&q=85', link:'/projects' }
]
const photos = substackPhotos.slice(0, 3).map((photo, i) => ({
  title: photo.title,
  place: photo.desc,
  image: photo.image,
  size: i === 0 ? 'tall' : 'short',
  link: '/photography'
}))
const posts = substackPosts.slice(0, 3).map((post, i) => ({
  category: 'SUBSTACK JOURNAL',
  date: post.date || 'FROM THE ARCHIVE',
  title: post.title,
  desc: post.excerpt || post.subtitle || 'A story from Timeless Reminiscences.',
  image: post.images?.[0]?.src || photos[i % photos.length]?.image,
  read: 'Read story',
  link: '/journal'
}))
const games = [
  { title:'GTA V', sub:'OPEN WORLDS', image:'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=85' },
  { title:'RDR 2', sub:'STORY & DETAIL', image:'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=85' },
  { title:'VALORANT', sub:'TEAM & TIMING', image:'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=85' }
]
let observer
let ctx
function toggleTheme(){ dark.value = !dark.value; document.documentElement.dataset.theme = dark.value ? 'dark' : 'light'; localStorage.setItem('tr-theme', dark.value ? 'dark' : 'light') }
function scrollTo(id){ menuOpen.value = false; document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'}) }
function openPhoto(photo){ activePhoto.value = photo }
function photoStep(dir){ const idx = photos.findIndex(p => p.image === activePhoto.value?.image); activePhoto.value = photos[(idx + dir + photos.length) % photos.length] }
function handleKeys(e){ if(e.key === 'Escape') activePhoto.value = null; if(activePhoto.value && e.key === 'ArrowRight') photoStep(1); if(activePhoto.value && e.key === 'ArrowLeft') photoStep(-1) }
async function copyEmail(){ try { await navigator.clipboard.writeText(email); contactCopied.value = true; setTimeout(() => contactCopied.value = false, 1800) } catch { window.location.href = `mailto:${email}` } }
onMounted(async () => {
  const saved = localStorage.getItem('tr-theme'); dark.value = saved === 'dark'; document.documentElement.dataset.theme = dark.value ? 'dark' : 'light'
  window.addEventListener('keydown', handleKeys)
  await nextTick()
  ctx = gsap.context(() => {
    gsap.from('.hero-copy > *', { y:24, opacity:0, duration:.85, stagger:.12, ease:'power3.out', delay:.15 })
    gsap.from('.hero-visual', { clipPath:'inset(0 0 100% 0)', duration:1.25, ease:'power4.out', delay:.25 })
    gsap.to('.hero-orbit', { rotate:360, duration:24, repeat:-1, ease:'none', transformOrigin:'50% 50%' })
    gsap.utils.toArray('.reveal').forEach((el) => gsap.from(el, { y:35, opacity:0, duration:.8, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 88%', once:true } }))
    gsap.utils.toArray('.project-card').forEach((el) => { el.addEventListener('mouseenter', () => gsap.to(el.querySelector('.project-image img'), { scale:1.055, duration:.55, ease:'power2.out' })); el.addEventListener('mouseleave', () => gsap.to(el.querySelector('.project-image img'), { scale:1, duration:.65, ease:'power2.out' })) })
  })
  observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) document.querySelectorAll('.nav-link').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`)) }), { rootMargin:'-35% 0px -55% 0px' })
  document.querySelectorAll('main section[id]').forEach(s => observer.observe(s))
})
onBeforeUnmount(() => { window.removeEventListener('keydown', handleKeys); observer?.disconnect(); ctx?.revert() })
</script>

<template>
  <div class="site-shell" :class="{ 'menu-is-open': menuOpen }">
    <div class="announcement"><span class="status-dot"></span> AVAILABLE FOR SELECT PROJECTS <span class="announcement-line"></span><span>KOCHI, INDIA · IST</span></div>
    <header class="site-header">
      <a class="brand" href="#home" @click.prevent="scrollTo('#home')" aria-label="Timeless Reminiscence home">
        <span class="brand-mark"><span class="mark-t">T</span><span class="mark-r">R</span><span class="mark-mountain"></span></span>
        <span class="brand-name">TIMELESS<span>REMINISCENCE</span></span>
      </a>
      <nav class="desktop-nav" aria-label="Main navigation"><a v-for="item in nav" :key="item[0]" class="nav-link" :href="item[1]">{{ item[0] }}</a></nav>
      <div class="header-actions"><button class="theme-toggle" @click="toggleTheme" :aria-label="dark ? 'Switch to light theme' : 'Switch to dark theme'"><Sun v-if="dark" :size="16"/><Moon v-else :size="16"/><span>{{ dark ? 'LIGHT' : 'DARK' }}</span></button><button class="menu-toggle" @click="menuOpen = !menuOpen" :aria-label="menuOpen ? 'Close menu' : 'Open menu'"><X v-if="menuOpen"/><Menu v-else/></button></div>
    </header>
    <div class="mobile-nav" :class="{open:menuOpen}"><a v-for="item in nav" :key="item[0]" :href="item[1]" @click="menuOpen = false">{{ item[0] }} <ArrowUpRight :size="16"/></a><p>CODE · CAPTURE · PLAY · REPEAT</p></div>

    <main>
      <section id="home" class="hero section-wrap">
        <div class="hero-copy">
          <div class="eyebrow"><span>01</span><i></i> HELLO, I'M</div>
          <h1>Adarsh<span class="period">.</span><span class="cursor-line"></span></h1>
          <div class="role-line"><span>DEVELOPER</span><b>·</b><span>PHOTOGRAPHER</span><b>·</b><span>GAMER</span></div>
          <p class="hero-intro">Full-stack developer building SaaS and enterprise tools,<br class="desktop-only"/> photographer collecting moments, gamer exploring new worlds.</p>
          <div class="hero-actions"><a class="button button-primary" href="/projects">Explore my work <ArrowRight :size="17"/></a><a class="button button-quiet" :href="substackUrl" target="_blank" rel="noreferrer"><Camera :size="17"/> View photography</a><a class="button button-quiet" href="/adarsh-nag-software-engineer.pdf" download>Download CV <ArrowUpRight :size="17"/></a></div>
          <div class="hero-socials"><a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github :size="16"/></a><a href="https://www.linkedin.com/in/adarsh-nag-7b048416b/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin :size="16"/></a><a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram :size="16"/></a><a href="https://youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube :size="16"/></a></div>
          <div class="hero-foot"><span><ArrowDown :size="14"/> SCROLL TO EXPLORE</span><span>01 — 06</span></div>
        </div>
        <div class="hero-visual"><div class="hero-image"></div><div class="hero-image-wash"></div><div class="hero-orbit"><span class="orbit-disc"></span></div><div class="hero-vertical-note">A LIFE IN PROGRESS · EST. 2000</div><div class="hero-script">Code.<br/>Capture.<br/>Play.<br/><em>Repeat.</em></div><div class="hero-image-caption"><span>10° 01' N</span><span>KERALA, INDIA</span></div><div class="image-index"><span class="index-dash"></span> FIELD NOTE / 001</div></div>
        <div class="hero-bottom-line"><span>GOOD PROJECTS.</span><span>BETTER PLACES.</span><span>BEST MEMORIES.</span></div>
      </section>

      <section id="about" class="about-section section-wrap section-block">
        <div class="section-heading reveal"><div class="eyebrow"><span>02</span><i></i> A LITTLE ABOUT ME</div><span class="heading-aside">THE PERSON BEHIND THE PIXELS</span></div>
        <div class="about-grid">
          <div class="about-copy reveal"><h2>More than just<br/>a single <span>label.</span></h2><p>I’m Adarsh Nag, a full-stack developer from Kerala with experience across enterprise applications, SaaS, web platforms, testing and cloud tooling. Outside development, I document moments through photography and explore virtual worlds through gaming.</p><p class="about-signature">Adarsh Nag <span>— TIMELESS REMINISCENCE</span></p><a class="text-link" href="/about">Read the full story <ArrowUpRight :size="16"/></a></div>
          <div class="about-photo reveal"><img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=90" alt="Mountain lake surrounded by peaks" loading="lazy"/><div class="photo-label"><span>ALWAYS LOOKING</span><span>FOR THE NEXT HORIZON ↗</span></div></div>
          <div class="about-stats reveal"><div><strong>03<span>+</span></strong><small>CREATIVE WORLDS</small></div><div><strong>∞</strong><small>IDEAS IN PROGRESS</small></div><div><strong>100<span>%</span></strong><small>ALWAYS CURIOUS</small></div><div class="stat-note">Curiosity is the<br/>whole point.</div></div>
        </div>
        <div class="worlds-grid reveal"><div class="world-intro"><span class="micro-label">THREE SIDES, ONE STORY</span><h3>Different worlds.<br/><span>Same curiosity.</span></h3></div><article class="world-card"><div class="world-icon"><Code2 :size="21"/></div><div><h4>Developer</h4><p>Building useful solutions with clean code and thoughtful details.</p></div><span class="world-number">01</span></article><article class="world-card"><div class="world-icon"><Camera :size="21"/></div><div><h4>Photographer</h4><p>Collecting light, places, people and the moments in between.</p></div><span class="world-number">02</span></article><article class="world-card"><div class="world-icon"><Gamepad2 :size="21"/></div><div><h4>Gamer</h4><p>Exploring virtual worlds, chasing stories and playing together.</p></div><span class="world-number">03</span></article></div>
      </section>

      <section id="projects" class="projects-section section-wrap section-block">
        <div class="section-heading reveal"><div><div class="eyebrow"><span>03</span><i></i> SELECTED WORK</div><h2 class="section-title">Things I've <span>built.</span></h2></div><a class="text-link" href="/projects">View all projects <ArrowUpRight :size="16"/></a></div>
        <div class="projects-grid"><article v-for="project in projects" :key="project.n" class="project-card reveal"><a class="project-image" :href="project.link" @click.prevent="scrollTo('#contact')"><img :src="project.image" :alt="project.title" loading="lazy"/><span class="project-open"><ArrowUpRight :size="21"/></span><span class="project-image-tag">{{ project.type }}</span></a><div class="project-meta"><span>{{ project.n }} / FEATURED PROJECT</span><span>2024 — 2026</span></div><div class="project-info"><div><h3>{{ project.title }}</h3><p>{{ project.desc }}</p></div><ArrowUpRight class="project-arrow" :size="20"/></div><div class="stack-list"><span v-for="tag in project.stack" :key="tag">{{ tag }}</span></div></article></div>
        <div class="project-footnote reveal"><span>MORE EXPERIMENTS, BUILDS & SIDE QUESTS</span><a href="#contact" @click.prevent="scrollTo('#contact')">Let's talk <ArrowRight :size="15"/></a></div>
      </section>

      <section id="games" class="games-section section-wrap section-block">
        <div class="section-heading reveal"><div><div class="eyebrow"><span>04</span><i></i> AFTER HOURS</div><h2 class="section-title">Virtual worlds.<br/><span>Real stories.</span></h2></div><div class="section-description">Games are more than entertainment for me — they're experiences, worlds and communities that stay with you.<br/><a class="text-link" href="/games">Explore all games <ArrowUpRight :size="16"/></a></div></div>
        <div class="games-grid"><article v-for="(game, i) in games" :key="game.title" class="game-card reveal"><img :src="game.image" :alt="game.title + ' gaming atmosphere'" loading="lazy"/><div class="game-overlay"></div><span class="game-count">0{{ i + 1 }} / PLAYLIST</span><div class="game-content"><span>{{ game.sub }}</span><h3>{{ game.title }}</h3><a href="#contact" @click.prevent="scrollTo('#contact')" :aria-label="'Ask about ' + game.title"><ArrowUpRight :size="19"/></a></div></article></div>
        <div class="games-bottom reveal"><span><Gamepad2 :size="17"/> CURRENTLY EXPLORING</span><span>OPEN WORLDS · CO-OP · COMPETITIVE</span><span class="playing-pill"><i></i> ALWAYS UP FOR ONE MORE</span></div>
      </section>

      <section id="photography" class="photo-section section-wrap section-block">
        <div class="section-heading reveal"><div><div class="eyebrow"><span>05</span><i></i> THROUGH MY LENS</div><h2 class="section-title">Moments that <span>stay.</span></h2></div><div class="section-description">A collection of places, little details, changing skies and moments I wanted to keep a little longer.<br/><a class="text-link" :href="substackUrl" target="_blank" rel="noreferrer">View full gallery <ArrowUpRight :size="16"/></a></div></div>
        <div class="photo-grid"><button v-for="(photo, i) in photos.slice(0, 3)" :key="photo.title" class="gallery-card reveal" :class="photo.size" @click="openPhoto(photo)" :aria-label="'View photograph: ' + photo.title"><img :src="photo.image" :alt="photo.title" loading="lazy"/><span class="gallery-shade"></span><span class="gallery-index">0{{ i + 1 }} / 0{{ photos.length }}</span><span class="gallery-caption"><span><b>{{ photo.title }}</b><small>{{ photo.place }}</small></span><span class="gallery-plus">+</span></span></button></div>
        <div class="gallery-foot reveal"><span>COLLECTING MOMENTS, NOT JUST MILES.</span><a :href="substackUrl" target="_blank" rel="noreferrer">VIEW SUBSTACK ↗</a></div>
      </section>

      <section id="journal" class="journal-section section-wrap section-block">
        <div class="section-heading reveal"><div><div class="eyebrow"><span>06</span><i></i> NOTES FROM THE JOURNEY</div><h2 class="section-title">Thoughts & <span>stories.</span></h2></div><a class="text-link" :href="substackUrl" target="_blank" rel="noreferrer">Read all stories <ArrowUpRight :size="16"/></a></div>
        <div class="journal-list"><a v-for="(post, i) in posts" :key="post.title" class="journal-card reveal" :href="post.link || substackUrl" target="_blank" rel="noreferrer"><div class="journal-thumb"><img :src="post.image" :alt="post.title" loading="lazy"/></div><div class="journal-body"><div class="journal-kicker"><span>{{ post.category }}</span><span>{{ post.date }}</span></div><h3>{{ post.title }}</h3><p>{{ post.desc }}</p><div class="journal-read">{{ post.read }} <ArrowUpRight :size="15"/></div></div><span class="journal-index">0{{ i + 1 }}</span></a></div>
        <p class="journal-note reveal"><Sparkles :size="15"/> The journal is a work in progress. More stories are on the way. <a :href="substackUrl" target="_blank" rel="noreferrer">Read on Substack ↗</a></p>
      </section>

      <section id="contact" class="contact-section section-wrap section-block">
        <div class="contact-main reveal"><div class="eyebrow"><span>07</span><i></i> YOUR TURN</div><h2>Have a good<br/>one in <span>mind?</span></h2><p>Got a project, an idea, a story to share, or just want to say hi? I'm always open to good conversations and unexpected collaborations.</p><a class="button button-primary contact-cta" :href="`mailto:${email}`">Let's make something <ArrowUpRight :size="17"/></a></div>
        <div class="contact-side reveal"><div class="contact-orbit-art"><div class="orbit-ring ring-one"></div><div class="orbit-ring ring-two"></div><div class="orbit-sun"></div><div class="orbit-mountain mountain-one"></div><div class="orbit-mountain mountain-two"></div><span class="orbit-plane">↗</span><span class="orbit-coordinate">10°01'N / 76°18'E</span></div><div class="contact-details"><button class="email-copy" @click="copyEmail"><span class="contact-detail-icon"><Mail :size="17"/></span><span><small>DROP ME A LINE</small><b>{{ email }}</b></span><span class="copy-label">{{ contactCopied ? 'COPIED ✓' : 'COPY +' }}</span></button><div class="location-row"><MapPin :size="16"/><span>KOCHI, KERALA, INDIA</span><span class="location-status"><i></i> LOCAL TIME · IST</span></div></div></div>
      </section>
      <section class="closing-banner section-wrap reveal"><div class="closing-mark">TR<span>.</span></div><p>Collect moments.<br/>Build things that matter.</p><span class="closing-scribble">See you out there ↗</span></section>
    </main>
    <footer class="site-footer section-wrap"><a class="footer-brand" href="#home" @click.prevent="scrollTo('#home')">TIMELESS REMINISCENCE<span>PERSONAL PORTFOLIO · 2026</span></a><span class="footer-center">DESIGNED WITH CURIOSITY <span>✳</span></span><div class="footer-links"><a href="https://github.com/" target="_blank" rel="noreferrer">GITHUB</a><a href="https://instagram.com/" target="_blank" rel="noreferrer">INSTAGRAM</a><a href="#home" @click.prevent="scrollTo('#home')">BACK TO TOP ↑</a></div></footer>

    <Transition name="lightbox"><div v-if="activePhoto" class="lightbox" @click.self="activePhoto = null"><button class="lightbox-close" @click="activePhoto = null" aria-label="Close photo"><X/></button><button class="lightbox-prev" @click="photoStep(-1)" aria-label="Previous photo"><ChevronLeft/></button><figure><img :src="activePhoto.image" :alt="activePhoto.title"/><figcaption><span>{{ activePhoto.title }}</span><small>{{ activePhoto.place }}</small></figcaption></figure><button class="lightbox-next" @click="photoStep(1)" aria-label="Next photo"><ChevronRight/></button><div class="lightbox-hint">USE ← → TO EXPLORE · ESC TO CLOSE</div></div></Transition>
    <div class="scroll-progress" aria-hidden="true"><span id="scroll-progress-bar"></span></div>
  </div>
</template>
