/* ============================= */
/* CAREER NAV CLICK */
/* ============================= */

const navItems = document.querySelectorAll('.career-nav li');
const sections = document.querySelectorAll('.career-section');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(i => i.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    item.classList.add('active');
    const target = document.getElementById(item.dataset.target);
    if (target) target.classList.add('active');
  });
});


/* ============================= */
/* PROJECT NAV CLICK */
/* ============================= */

const projectNavItems = document.querySelectorAll('.projects-nav li');
const projectSections = document.querySelectorAll('.project-section');

projectNavItems.forEach(item => {
  item.addEventListener('click', () => {
    projectNavItems.forEach(i => i.classList.remove('active'));
    projectSections.forEach(s => s.classList.remove('active'));

    item.classList.add('active');
    document.getElementById(item.dataset.target).classList.add('active');
  });
});


/* ============================= */
/* SCROLL ANIMATIONS */
/* ============================= */

const animatedElements = document.querySelectorAll('.animate');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

animatedElements.forEach(el => observer.observe(el));


/* ============================= */
/* CAREER SCROLL PROGRESSION */
/* ============================= */

document.addEventListener("DOMContentLoaded", () => {

  const careerItems = document.querySelectorAll(".career-nav li");
  const careerSections = document.querySelectorAll(".career-section");
  const railFill = document.querySelector(".career-rail-fill");
  const railDot = document.querySelector(".career-rail-dot");
  const careerContent = document.querySelector(".career-content");

  if (!careerSections.length || !railFill || !railDot) return;

  const railHeight = () =>
    railFill.parentElement.offsetHeight - railDot.offsetHeight;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const index = Array.from(careerSections).indexOf(entry.target);
        const progress = index / (careerSections.length - 1);

        careerItems.forEach((item, idx) => {
          item.classList.toggle("active", idx === index);
          item.classList.toggle("completed", idx < index);
        });

        railFill.style.height = `${progress * 100}%`;

        const y = progress * railHeight();
        railDot.style.transform = `translate(-50%, ${y}px)`;
      });
    },
    {
      root: careerContent,
      threshold: 0.6
    }
  );

  careerSections.forEach(section => observer.observe(section));
});


/* ============================= */
/* PROJECTS SCROLL LOGIC */
/* ============================= */

document.addEventListener("DOMContentLoaded", () => {

  const projectSections = document.querySelectorAll(".project-section");
  const projectNavItems = document.querySelectorAll(".projects-nav li");
  const projectsContent = document.querySelector(".projects-content");

  if (!projectSections.length || !projectsContent) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const index = Array.from(projectSections).indexOf(entry.target);

        projectNavItems.forEach((item, idx) => {
          item.classList.toggle("active", idx === index);
        });
      });
    },
    {
      root: projectsContent,
      threshold: 0.6
    }
  );

  projectSections.forEach(section => observer.observe(section));

  projectNavItems.forEach(item => {
    item.addEventListener("click", () => {
      const target = document.getElementById(item.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});


/* ============================= */
/* CERTIFICATIONS INTERACTION */
/* ============================= */

document.addEventListener('DOMContentLoaded', () => {

  const certItems = document.querySelectorAll('.cert-item');
  const certContents = document.querySelectorAll('.cert-card-content');
  const certButtons = document.querySelectorAll('.cert-btn');

  // Select cert
  certItems.forEach(item => {
    item.addEventListener('click', () => {

      certItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const targetId = item.dataset.cert;

      certContents.forEach(content => {
        content.classList.toggle(
          'active',
          content.id === targetId
        );

        // hide image when switching
        const img = content.querySelector('.cert-image');
        if (img) img.classList.add('hidden');
      });
    });
  });

  // View certificate button
  certButtons.forEach(button => {
    button.addEventListener('click', () => {

      const card = button.closest('.cert-card-content');
      const image = card.querySelector('.cert-image');

      image.classList.toggle('hidden');
    });
  });

});


/* ============================= */
/* TOP NAV SCROLL HIGHLIGHT */
/* ============================= */

const navLinks = document.querySelectorAll('.nav-links a');
const slides = document.querySelectorAll('.slide');

window.addEventListener('scroll', () => {
  let current = '';

  slides.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === current) {
      link.classList.add('active');
    }
  });
});


/* ============================= */
/* SMOOTH SCROLL */
/* ============================= */

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById(link.dataset.section);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});