/*
================================================================================
ОСНОВНОЙ ФАЙЛ JAVASCRIPT — ВЕРСИЯ "ЧИСТЫЙ САЙТ" (Без форм и аналитики)
================================================================================
*/

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // --- 1. Управление мобильным меню (бургер) ---
  const burgerButton = document.getElementById('burgerMenuButton');
  const mainNav = document.getElementById('mainNav');
  const body = document.body;

  if (burgerButton && mainNav) {
    const closeMenu = () => {
      body.classList.remove('menu-open');
      burgerButton.setAttribute('aria-expanded', 'false');
    };
    const openMenu = () => {
      body.classList.add('menu-open');
      burgerButton.setAttribute('aria-expanded', 'true');
    };
    burgerButton.addEventListener('click', (e) => {
      e.stopPropagation();
      body.classList.contains('menu-open') ? closeMenu() : openMenu();
    });
    mainNav.addEventListener('click', (e) => {
      if (e.target.matches('a') || e.target.matches('button')) closeMenu();
    });
    document.addEventListener('click', (e) => {
      if (body.classList.contains('menu-open') && !mainNav.contains(e.target) && !burgerButton.contains(e.target)) closeMenu();
    });
  }

  // --- 2. Переключение темы (День/Ночь) ---
  const themeToggleButton = document.getElementById('themeToggle');
  const docElement = document.documentElement;

  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      const isDark = docElement.classList.contains('dark-theme');
      const newTheme = isDark ? 'light' : 'dark';
      docElement.classList.toggle('dark-theme', !isDark);
      try {
        localStorage.setItem('theme', newTheme);
      } catch (e) { /* ignore */ }
    });
  }

  // --- 3. Анимации при скролле (плавное появление блоков) ---
  const animatedElements = document.querySelectorAll('.fade-in-up');
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
  }

  // --- 4. Логика баннера Cookie (Только визуал) ---
  const cookieBanner = document.getElementById('cookie-consent-banner');
  const cookieAcceptBtn = document.getElementById('cookie-consent-accept');
  const CONSENT_KEY = 'cookie_consent_status';

  if (cookieBanner && cookieAcceptBtn) {
    // Показываем баннер только если выбор еще не сделан
    if (!localStorage.getItem(CONSENT_KEY)) {
      setTimeout(() => {
        cookieBanner.hidden = false;
        cookieBanner.style.display = 'flex';
        setTimeout(() => cookieBanner.classList.add('show'), 20);
      }, 1500);
    }

    cookieAcceptBtn.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'dismissed');
      cookieBanner.classList.remove('show');
      setTimeout(() => {
        cookieBanner.style.display = 'none';
        cookieBanner.hidden = true;
      }, 500);
    });
  }

  // --- 5. Динамический год в подвале ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});