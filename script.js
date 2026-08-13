const opening = document.getElementById("opening");
const enterBtn = document.getElementById("enterBtn");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");
const bgMusic = document.getElementById("bgMusic");

let musicPlaying = false;

/* Opening -> website */
enterBtn.addEventListener("click", async () => {
  opening.classList.add("hide");
  document.body.classList.add("ready");

  // Mobile browsers allow audio after a user click.
  try {
    await bgMusic.play();
    musicPlaying = true;
    musicBtn.classList.add("playing");
    musicIcon.textContent = "♫";
  } catch (e) {
    musicPlaying = false;
  }

  setTimeout(() => {
    opening.style.display = "none";
  }, 1100);

  // Start hero animations immediately.
  setTimeout(() => {
    document.querySelectorAll(".hero .reveal").forEach(el => {
      el.classList.add("visible");
    });
  }, 450);
});

/* Music on/off */
musicBtn.addEventListener("click", async () => {
  if (!musicPlaying) {
    try {
      await bgMusic.play();
      musicPlaying = true;
      musicBtn.classList.add("playing");
      musicIcon.textContent = "♫";
    } catch (e) {
      alert("assets/bappa-music.mp3 ही music file project मध्ये ठेवा.");
    }
  } else {
    bgMusic.pause();
    musicPlaying = false;
    musicBtn.classList.remove("playing");
    musicIcon.textContent = "♪";
  }
});

/* Smooth reveal while scrolling */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.13,
  rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* Smooth anchor navigation */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    const target = document.querySelector(id);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

/* Gentle parallax for hero image */
const heroImage = document.querySelector(".hero-art img");

window.addEventListener("scroll", () => {
  if (!heroImage) return;

  const y = window.scrollY;
  const heroHeight = window.innerHeight;

  if (y < heroHeight) {
    heroImage.style.transform = `translateY(${y * 0.035}px) scale(1.015)`;
  }
}, { passive: true });


/* V2: reading progress */
const progress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${value}%`;
}, { passive: true });

/* Prevent accidental horizontal movement on touch devices */
document.addEventListener("touchmove", () => {}, { passive: true });
