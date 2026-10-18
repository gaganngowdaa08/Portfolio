document.addEventListener("DOMContentLoaded", () => {\n  document.documentElement.classList.add("js-enabled");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      menuToggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // Reveal sections as they enter the viewport, with a graceful fallback.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // A compact, accessible rotating role label.
  const typing = document.querySelector(".typing");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const roles = ["Java & Backend", "REST APIs & SQL", "Practical AI Projects"];
  if (typing && !prefersReducedMotion) {
    let roleIndex = 0;
    window.setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      typing.textContent = roles[roleIndex];
    }, 2600);
  }

  // Active section styling in the desktop navigation.
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".nav-links a[href^='#']");
  if ("IntersectionObserver" in window && sections.length && links.length) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            const active = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("active", active);
          });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(section => navObserver.observe(section));
  }


  // Submit the contact form through FormSubmit and show clear delivery feedback.
  const contactForm = document.getElementById("contact-message");
  const contactStatus = document.getElementById("contact-status");
  const contactButton = contactForm?.querySelector('button[type="submit"]');
  if (contactForm) {
    contactForm.addEventListener("submit", async event => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      const payload = Object.fromEntries(new FormData(contactForm).entries());
      payload._subject = payload.subject || "Portfolio contact message";
      payload._template = "table";
      payload._captcha = "false";
      payload._replyto = payload.email || "";
      if (contactButton) {
        contactButton.disabled = true;
        contactButton.setAttribute("aria-busy", "true");
      }
      if (contactStatus) contactStatus.textContent = "Sending your message…";
      try {
        const response = await fetch("https://formsubmit.co/ajax/gagangowdabg08@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (!response.ok || result.success === false || result.success === "false") {
          throw new Error(result.message || "Message submission failed");
        }
        contactForm.reset();
        if (contactStatus) contactStatus.textContent = "Thanks! Your message was submitted. If this is your first submission, confirm the activation email from FormSubmit to enable delivery.";
      } catch (error) {
        if (contactStatus) contactStatus.textContent = "We couldn't send your message. Please email gagangowdabg08@gmail.com directly or try again.";
      } finally {
        if (contactButton) {
          contactButton.disabled = false;
          contactButton.removeAttribute("aria-busy");
        }
      }
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
