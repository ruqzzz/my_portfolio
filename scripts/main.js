/**
 * Rin_sporfolio — Main JavaScript
 * Handles mobile nav, TOC generation, TOC toggle, and scroll-spy active states.
 */

(function () {
  'use strict';

  /* --- Mobile hamburger menu --- */
  function initMobileMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
      );
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
      });
    });
  }

  /* --- TOC toggle (below 1024px) --- */
  function initTocToggle() {
    var toggle = document.querySelector('.toc-toggle');
    var sidebar = document.querySelector('.toc-sidebar');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', function () {
      var isExpanded = sidebar.classList.toggle('is-expanded');
      toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  /* --- Auto-generate TOC from H2 and H3 in main content --- */
  function initTableOfContents() {
    var main = document.querySelector('.main-content');
    var tocNav = document.querySelector('.toc-sidebar nav');
    if (!main || !tocNav) return;

    var headings = main.querySelectorAll('h2, h3');
    if (headings.length === 0) return;

    var list = document.createElement('ul');
    var currentH2Item = null;

    headings.forEach(function (heading, index) {
      if (!heading.id) {
        heading.id = 'section-' + index;
      }

      var li = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent;

      if (heading.tagName === 'H3') {
        li.classList.add('toc-h3');
        if (currentH2Item) {
          var subList = currentH2Item.querySelector('ul');
          if (!subList) {
            subList = document.createElement('ul');
            currentH2Item.appendChild(subList);
          }
          subList.appendChild(li);
        } else {
          list.appendChild(li);
        }
      } else {
        currentH2Item = li;
        list.appendChild(li);
      }

      li.appendChild(link);

      link.addEventListener('click', function (event) {
        event.preventDefault();
        var target = document.getElementById(heading.id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, '', '#' + heading.id);
        }
      });
    });

    tocNav.appendChild(list);
    initScrollSpy(headings);
  }

  /* --- IntersectionObserver: highlight active TOC item --- */
  function initScrollSpy(headings) {
    var tocLinks = document.querySelectorAll('.toc-sidebar nav a');
    if (tocLinks.length === 0) return;

    var linkMap = {};
    tocLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      linkMap[id] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            tocLinks.forEach(function (l) {
              l.classList.remove('is-active');
            });
            if (linkMap[id]) {
              linkMap[id].classList.add('is-active');
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      }
    );

    headings.forEach(function (heading) {
      observer.observe(heading);
    });
  }

  /* --- Init on DOM ready --- */
  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initTocToggle();
    initTableOfContents();
  });
})();
