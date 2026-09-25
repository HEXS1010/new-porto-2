// animasi loading
function splitText(el) {
  const text = el.innerText;
  el.innerHTML = text
    .split("")
    .map((char) =>
      char === " "
        ? `<span class="char">&nbsp;</span>`
        : `<span class="char">${char}</span>`
    )
    .join("");
}

splitText(document.getElementById("hexs"));
splitText(document.getElementById("project"));
splitText(document.getElementById("welcomeText"));

// elemen teks
const firstChars = document.querySelectorAll("#jelloTextShine .char");
const logo = document.getElementById("logoShine");
// const firstChars = document.querySelectorAll("#jelloText .char");
const welcomeChars = document.querySelectorAll("#welcomeText .char");
// const logo = document.getElementById("logo");
const loadingNumber = document.getElementById("loadingNumber");
const firstAnim = document.getElementById("firstAnim");
const secondAnim = document.getElementById("secondAnim");
const loadingScreen = document.getElementById("loadingScreen");

// GSAP
let counter = { val: 0 };
const tl = gsap.timeline();

// Animasi angka 0 → 100
tl.to(counter, {
  val: 100,
  duration: 5,
  ease: "power1.inOut",
  onUpdate: () => (loadingNumber.innerText = Math.floor(counter.val) + "%"),
})
  .to(loadingNumber, {
    opacity: 0,
    duration: 1.5, // fade out lebih pelan
    delay: 0.5,
  })

  // Animasi logo + HEXS PROJECT
  // .to(logo, {
  //   opacity: 1,
  //   y: 0,
  //   scale: 1.1,
  //   duration: 1.2,
  //   ease: "elastic.out(1, 0.4)",
  // })
  // .to(
  //   firstChars,
  //   {
  //     y: 0,
  //     opacity: 1,
  //     scaleY: 1.4,
  //     duration: 1.4,
  //     ease: "elastic.out(1, 0.5)",
  //     stagger: 0.05,
  //   },
  //   "+=0.5"
  // )
  // .to(firstAnim, {
  //   opacity: 0,
  //   duration: 1.5, // fade out logo+HEXS PROJECT lebih pelan
  //   delay: 1.5,
  // })

  // ====== MASUK SHINING (SETELAH ANGKA FADE OUT) =====

  .to({}, { duration: 0.5 }) // delay sedikit sebelum shining

  .to([logo, firstChars], {
    opacity: 1,
    y: 0,
    duration: 0.01,
  })
  .to(".shine-wrap", {
    duration: 3.5,
    ease: "linear",
    css: { "--pos": "500%" },
    repeat: 0,
  })

  // ====== DELAY SETELAH SHINING ======
  .to({}, { duration: 0.7 })

  // Animasi logo + HEXS PROJECT
  .to(logo, {
    opacity: 1,
    y: 0,
    scale: 1.1,
    duration: 1.2,
    ease: "elastic.out(1, 0.4)",
  })

  .to(
    firstChars,
    {
      y: 0,
      opacity: 1,
      scaleY: 1.4,
      duration: 1.4,
      ease: "elastic.out(1, 0.5)",
      stagger: 0.05,
    },
    "+=0.5"
  )
  .to(firstAnim, {
    opacity: 0,
    duration: 0.2,
    delay: 0.1,
  })

  // Animasi "SELAMAT DATANG DI PORTOFOLIO SAYA"
  .to(secondAnim, { opacity: 1, duration: 0.2, delay: 0.2 })
  .call(() => {
    gsap.to(welcomeChars, {
      y: (char) => (char.innerText === "\u00a0" ? -2 : 0),
      opacity: 1,
      scaleY: (char) => (char.innerText === "\u00a0" ? 1 : 1.4),
      duration: 1.6,
      ease: "elastic.out(1, 0.5)",
      stagger: 0.05,
    });
  })
  // fade out halus ke halaman utama
  .to([secondAnim, loadingScreen], {
    opacity: 0,
    duration: 2, // lebih lama supaya transisi halus
    delay: 4, // jeda sebelum fade out
    onComplete: () => {
      loadingScreen.style.display = "none";
    },
  });

// ===== INTERAKSI HOVER UNTUK HEXS/PROJECT =====
// firstChars.forEach((char) => {
//   char.addEventListener("mouseenter", () => {
//     gsap.to(char, { y: -15, scaleY: 1.3, duration: 0.3 });
//   });
//   char.addEventListener("mouseleave", () => {
//     gsap.to(char, {
//       y: 0,
//       scaleY: 1.4,
//       duration: 0.5,
//       ease: "elastic.out(1, 0.4)",
//     });
//   });
// });

// ===== INTERAKSI HOVER UNTUK WELCOME TEXT =====
welcomeChars.forEach((char) => {
  char.addEventListener("mouseenter", () => {
    gsap.to(char, { y: -15, scaleY: 1.3, duration: 0.3 });
  });
  char.addEventListener("mouseleave", () => {
    gsap.to(char, {
      y: 0,
      scaleY: char.innerText === "\u00a0" ? 1 : 1.4,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  });
});

// animasi bintang
// (function createStarfield(options = {}) {
//   const container = document.querySelector(".starfield");
//   if (!container) return;

//   // opsi: ubah jumlah jika perlu
//   const COUNT = options.count || 20; // jumlah bintang default
//   const TWINKLE_MIN = 3; // detik
//   const TWINKLE_MAX = 10;

//   // respect user reduced motion
//   const reduceMotion = window.matchMedia(
//     "(prefers-reduced-motion: reduce)"
//   ).matches;

//   // bersihkan dulu kalau ada (berguna saat HMR / live reload)
//   container.innerHTML = "";

//   for (let i = 0; i < COUNT; i++) {
//     const star = document.createElement("span");
//     star.classList.add("star");

//     // ukuran acak: xs, sm, md, lg
//     const r = Math.random();
//     if (r < 0.45) star.classList.add("size-xs");
//     else if (r < 0.8) star.classList.add("size-sm");
//     else if (r < 0.95) star.classList.add("size-md");
//     else star.classList.add("size-lg");

//     // posisi acak
//     const left = Math.random() * 100; // vw
//     const top = Math.random() * 100; // vh
//     star.style.left = left + "vw";
//     star.style.top = top + "vh";

//     // animasi twinkle acak
//     if (!reduceMotion) {
//       const dur =
//         (Math.random() * (TWINKLE_MAX - TWINKLE_MIN) + TWINKLE_MIN).toFixed(2) +
//         "s";
//       const delay = (Math.random() * 8).toFixed(2) + "s";
//       star.style.animation = `twinkle ${dur} ease-in-out ${delay} infinite`;
//     } else {
//       // jika reduced motion, beri sedikit opacity statis
//       star.style.opacity = String(0.8 + Math.random() * 0.2);
//     }

//     // variasi blur / glow subtle
//     const glow = Math.random() * 6; // 0..6 px
//     star.style.filter = `blur(${glow}px)`;

//     container.appendChild(star);
//   }

//   // buat adaptasi saat resize: opsional, rekalkulasi posisi (tidak diperlukan sebenarnya)
//   window.addEventListener("resize", () => {
//     // do nothing heavy; stars positioned with vw/vh so they adapt
//   });
// })();

// animasi bintang
(function createStarfield(options = {}) {
  const container = document.querySelector(".starfield");
  if (!container) return;

  // fungsi jumlah bintang adaptif
  function getStarCount() {
    if (window.innerWidth < 600) return 20; // HP kecil
    if (window.innerWidth < 1024) return 80; // tablet
    return 180; // laptop / desktop
  }

  // jumlah bintang berdasarkan device
  const COUNT = options.count || getStarCount();

  const TWINKLE_MIN = 3; // detik
  const TWINKLE_MAX = 10;

  // cek preferensi reduce motion (buat yang sensitif animasi)
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // bersihkan dulu jika ada
  container.innerHTML = "";

  // buat bintang
  for (let i = 0; i < COUNT; i++) {
    const star = document.createElement("span");
    star.classList.add("star");

    // ukuran acak
    const r = Math.random();
    if (r < 0.5) star.classList.add("size-xs");
    else if (r < 0.8) star.classList.add("size-sm");
    else if (r < 0.95) star.classList.add("size-md");
    else star.classList.add("size-lg");

    // posisi acak
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    star.style.left = left + "vw";
    star.style.top = top + "vh";

    // animasi twinkle
    if (!reduceMotion) {
      const dur =
        (Math.random() * (TWINKLE_MAX - TWINKLE_MIN) + TWINKLE_MIN).toFixed(2) +
        "s";
      const delay = (Math.random() * 8).toFixed(2) + "s";
      star.style.animation = `twinkle ${dur} ease-in-out ${delay} infinite`;
    } else {
      star.style.opacity = String(0.7 + Math.random() * 0.3);
    }

    // glow + warna biar tetap kelihatan di HP
    // const glow = Math.random() * 2 + 1; // kecilin blur biar enteng
    // star.style.background = "rgba(255, 255, 255, 0.9)";
    // // star.style.boxShadow = `
    // //   0 0 4px rgba(255, 255, 255, 0.8),
    // //   0 0 10px rgba(255, 255, 255, 1)
    // // `;
    // // star.style.filter = `blur(${glow}px)`;

    // container.appendChild(star);
    const glow = Math.random() * 2 + 1;

    star.style.background = "rgba(255, 255, 255, 1)";
    star.style.opacity = "0.95";

    // glow super halus (HP friendly)
    star.style.boxShadow = "0 0 2px rgba(255,255,255,0.6)";
    star.style.filter = "none";

    container.appendChild(star);
  }

  // optional: refresh kalau resize
  window.addEventListener("resize", () => {
    clearTimeout(window._starResize);
    window._starResize = setTimeout(() => {
      createStarfield();
    }, 300);
  });
})();

// Toggle Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation(); // cegah klik ke document
  menu.classList.toggle("active");
});

// Tutup menu kalau klik di luar menu
document.addEventListener("click", (e) => {
  // kalau menu lagi terbuka
  if (menu.classList.contains("active")) {
    // kalau yang diklik BUKAN menu dan bukan hamburger
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
      menu.classList.remove("active");
    }
  }
});

// Tutup menu kalau klik link di dalam menu
const menuLinks = menu.querySelectorAll("a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

// avatar animation
(function () {
  const orbitEl = document.getElementById("orbit");
  const visual = document.getElementById("visual");
  const mainAvatar = document.getElementById("mainAvatar");

  // small orb data: now using images
  const icons = [
    { img: "img/logo html.png", speed: 0.9, ang: 0 },
    { img: "img/CSS.svg", speed: 0.6, ang: 70 },
    { img: "img/js icon.jpeg", speed: 0.75, ang: 140 },
    { img: "img/react.png", speed: 0.45, ang: 210 },
    { img: "img/python.webp", speed: 0.55, ang: 280 },
    { img: "img/kali linux.png", speed: 1, ang: 300 },
  ];

  // create orb elements (with images)
  icons.forEach((ic, idx) => {
    const el = document.createElement("div");
    el.className = "orb";
    el.style.width = "48px";
    el.style.height = "48px";
    el.dataset.ang = ic.ang;
    el.dataset.speed = ic.speed;
    el.innerHTML = `<img src="${ic.img}" style="width:100%;height:100%;object-fit:contain;">`;
    orbitEl.appendChild(el);
    ic.el = el;
  });

  function compute() {
    const a = mainAvatar.getBoundingClientRect();
    const b = visual.getBoundingClientRect();
    const cx = a.left + a.width / 2 - b.left;
    const cy = a.top + a.height / 2 - b.top;
    const base = Math.max(a.width, a.height) / 2 + 65;
    return { cx, cy, base };
  }

  let t0 = null;
  function animate(t) {
    if (!t0) t0 = t;
    const dt = (t - t0) / 1000;
    t0 = t;

    let { cx, cy, base } = compute();
    if (window.innerWidth < 600) {
      base += 35;
    }

    let scale = window.innerWidth < 600 ? 0.75 : 1;

    const maxRadius = 200; // <=== BATAS MAKSIMUM ORBIT

    icons.forEach((ic, i) => {
      ic.ang = (ic.ang + ic.speed * 35 * dt) % 360;
      const rad = (ic.ang * Math.PI) / 180;

      let r = (base + i * 35) * scale;
      if (r > maxRadius) r = maxRadius; // <=== STOP sebelum keluar layar

      const x = cx + r * Math.cos(rad) - 26;
      const y = cy + r * Math.sin(rad) - 26;

      ic.el.style.transform = `translate(${x}px, ${y}px)`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();

//   function compute(){
//     const avRect = mainAvatar.getBoundingClientRect();
//     const visRect = visual.getBoundingClientRect();
//     const cx = avRect.left + avRect.width/2 - visRect.left;
//     const cy = avRect.top + avRect.height/2 - visRect.top;

//     const avatarRadius = Math.max(avRect.width, avRect.height)/2;
//     const iconSize = 48;
//     const minRadius = avatarRadius + iconSize/1.5 + 18;

//     const radii = [
//       minRadius + 30,
//       minRadius + 70,
//       minRadius + 110,
//       minRadius + 160,
//       minRadius + 50
//     ];

//     return {cx,cy,radii};
//   }

//   let lastTime = null;
//   function animate(t){
//     if(!lastTime) lastTime = t;
//     const dt = (t - lastTime)/1000;
//     lastTime = t;

//     const {cx,cy,radii} = compute();

//     icons.forEach((ic,i)=>{
//       const speed = parseFloat(ic.el.dataset.speed);
//       ic.el.dataset.ang = (parseFloat(ic.el.dataset.ang) + speed*40*dt) % 360;
//       const ang = parseFloat(ic.el.dataset.ang) * Math.PI/180;

//       const r = radii[i % radii.length];
//       const x = cx + r * Math.cos(ang) - ic.el.offsetWidth/2;
//       const y = cy + r * Math.sin(ang) - ic.el.offsetHeight/2;

//       ic.el.style.transform = `translate(${x}px, ${y}px)`;
//     });

//     requestAnimationFrame(animate);
//   }

//   window.addEventListener('resize', ()=>{
//     clearTimeout(window._orbResize);
//     window._orbResize = setTimeout(()=>{
//       icons.forEach((ic)=>{ic.el.style.transform = 'translate(-9999px, -9999px)';});
//     },80);
//   });

//   function layoutAvatar(){
//     mainAvatar.style.position = 'absolute';
//     mainAvatar.style.right = '10%';
//     mainAvatar.style.top = '50%';
//     mainAvatar.style.transform = 'translateY(-50%)';
//   }
//   layoutAvatar();

//   requestAnimationFrame(animate);
// })();

// ANIMASI KETIK H1
//

//
// animasi ketik
gsap.registerPlugin(TextPlugin);

const words = ["Front-End", "Pelajar", "Atlet"];
let index = 0;

// Fungsi mengetik
function typeWord(text, next) {
  gsap.to("#roleText", {
    duration: 1.6,
    text: text,
    ease: "power2.out",
    onComplete: () => setTimeout(next, 800),
  });
}

// Fungsi menghapus dari belakang
function deleteFromBack(text, next) {
  let chars = text.split("");
  let interval = setInterval(() => {
    chars.pop(); // <-- hapus huruf dari belakang
    document.getElementById("roleText").innerText = chars.join("");
    if (chars.length === 0) {
      clearInterval(interval);
      next();
    }
  }, 90); // kecepatan hapus
}

// Loop animasi
function animateLoop() {
  let word = words[index];
  typeWord(word, () => {
    deleteFromBack(word, () => {
      index = (index + 1) % words.length;
      animateLoop();
    });
  });
}

animateLoop();

// ===== Simple Audio Player + Visualizer =====
(function () {
  const audioEl = document.getElementById("audioEl");
  const playBtn = document.getElementById("playBtn");
  const playIcon = document.getElementById("playIcon");
  const barsContainer = document.getElementById("bars");

  // jumlah bar visual
  const BAR_COUNT = 20;

  // buat elemen bar
  for (let i = 0; i < BAR_COUNT; i++) {
    const d = document.createElement("div");
    d.className = "bar";
    barsContainer.appendChild(d);
  }
  const bars = Array.from(document.querySelectorAll(".bar"));

  // Web Audio API setup (lazily when user interacts)
  let audioCtx = null;
  let analyser = null;
  let source = null;
  let dataArray = null;
  let rafId = null;

  function initAudioContext() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256; // resolusi frekuensi
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    // create media element source and connect
    source = audioCtx.createMediaElementSource(audioEl);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
  }

  function draw() {
    if (!analyser) return;
    analyser.getByteFrequencyData(dataArray);

    const step = Math.floor(dataArray.length / BAR_COUNT);

    for (let i = 0; i < BAR_COUNT; i++) {
      let sum = 0;
      for (let j = 0; j < step; j++) {
        sum += dataArray[i * step + j] || 0;
      }
      const avg = sum / step;

      // 🎉 LIAR MODE MIX:
      const energy = (avg / 255) * 3; // sedikit data audio
      const chaos = (Math.random() - 0.5) * 7;

      const scale = 0.3 + energy + chaos;

      bars[i].style.transform = `scaleY(${scale})`;
    }

    rafId = requestAnimationFrame(draw);
  }

  // play/pause toggle — also resume AudioContext on first user gesture
  playBtn.addEventListener("click", async () => {
    try {
      if (!audioCtx) initAudioContext();
      if (audioCtx.state === "suspended") await audioCtx.resume();
    } catch (err) {}

    if (audioEl.paused) {
      audioEl.play().then(() => {
        playIcon.className = "fa-solid fa-pause";
        if (!rafId) draw();
      });
    } else {
      audioEl.pause();
      playIcon.className = "fa-solid fa-play";
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      bars.forEach((b) => (b.style.transform = "scaleY(0.2)"));
    }
  });

  audioEl.addEventListener("ended", () => {
    playIcon.className = "fa-solid fa-play";
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    bars.forEach((b) => (b.style.transform = "scaleY(0.2)"));
  });

  // if user uses native controls (not visible here) or programmatic play/pause:
  audioEl.addEventListener("play", () => {
    playIcon.className = "fa-solid fa-pause";
    if (!audioCtx) initAudioContext();
    if (!rafId) draw();
  });
  audioEl.addEventListener("pause", () => {
    playIcon.className = "fa-solid fa-play";
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });

  // Allow clicking bars area to toggle play too (optional UX)
  barsContainer.addEventListener("click", () => playBtn.click());
})();

// nav hilang
let lastScroll = 0;
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  let currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 80) {
    // scroll ke bawah -> sembunyikan nav
    nav.style.transform = "translateY(-100%)";
  } else {
    // scroll ke atas -> tampilkan nav
    nav.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
});

// card animasi
// const card = document.getElementById("flipCard");

// card.addEventListener("click", () => {
//   card.querySelector(".card-inner").classList.toggle("flipped");
// });

document.querySelector(".card-inner").addEventListener("click", function () {
  this.classList.toggle("flipped");
});

// ===== Timeline animation (safe, DOMContentLoaded) =====
document.addEventListener("DOMContentLoaded", () => {
  // Debug: pastikan gsap & ScrollTrigger tersedia
  console.log("gsap:", typeof gsap, "ScrollTrigger:", typeof ScrollTrigger);

  // register plugin (aman jika sudah dipanggil; duplicate harmless)
  if (gsap && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const items = document.querySelectorAll(".timeline-item");
  if (!items || items.length === 0) {
    console.warn("Tidak menemukan .timeline-item — periksa HTML");
    return;
  }

  items.forEach((item) => {
    const dot = item.querySelector(".timeline-dot");
    const h2 = item.querySelector(".timeline-content h2");
    const p = item.querySelector(".timeline-content p");

    // animasi dot (tetap)
    gsap.to(dot, {
      backgroundColor: "#ffffff",
      borderColor: "#ffffff",
      duration: 0.6,
      ease: "power1.out",
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        end: "bottom 40%",
        toggleActions: "play reverse play reverse",
        markers: false,
      },
    });

    gsap.to(h2, {
      color: "#00ffff",
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        end: "bottom 40%",
        toggleActions: "play reverse play reverse",
      },
    });

    // P → putih
    gsap.to(p, {
      color: "#ffffffff",
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        end: "bottom 40%",
        toggleActions: "play reverse play reverse",
      },
    });
  });

  ScrollTrigger.refresh();
});

// gabungan toggle
const tabs = document.querySelectorAll(".tab-item");
const contents = document.querySelectorAll(".tab-content");

let isAnimating = false;

// init: aktifkan tab pertama
if (tabs.length && contents.length) {
  tabs[0].classList.add("active");
  contents[0].classList.add("show");
  gsap.set(contents[0], { opacity: 1, y: 0, scale: 1 });
}

function showTarget(target) {
  if (isAnimating) return;
  if (target.classList.contains("show")) return;

  isAnimating = true;

  const current = document.querySelector(".tab-content.show");

  // helper to reveal target after current hidden
  function reveal() {
    // ensure target is layout-visible before animating
    // Aktifkan layout dulu agar tidak turun-naik
    target.classList.add("show");

    gsap.fromTo(
      target,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: "power3.out",
        onComplete: () => {
          isAnimating = false; // WAJIB !!
        },
      }
    );
  }

  if (current && current !== target) {
    // hide current first
    gsap.to(current, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => {
        // remove show (hides via CSS)
        current.classList.remove("show");
        // small timeout to ensure layout recalculation (optional)
        requestAnimationFrame(reveal);
      },
    });
  } else {
    // no current (or same), just reveal
    reveal();
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    if (tab.classList.contains("active")) return; // no-op if same tab
    // set active tab UI immediately
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const targetID = tab.dataset.tab;
    const target = document.getElementById(targetID);
    if (!target) return;

    showTarget(target);
  });
});

// komentar
// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector(".add-btn");
//   const popup = document.querySelector(".popup-overlay");
//   const cancelBtn = document.querySelector(".cancel-btn");
//   const sendBtn = document.querySelector(".send-btn");
//   const commentList = document.querySelector(".comment-list");
//   const notif = document.getElementById("notif");
//   const namaInput = document.getElementById("nama");
//   const komenInput = document.getElementById("komen");
//   const namaErr = document.getElementById("nama-error");
//   const komenErr = document.getElementById("komen-error");

//   // ====== User ID untuk delete lokal ======
//   if (!localStorage.getItem("userID")) {
//     const id = crypto.randomUUID ? crypto.randomUUID() : "id-" + Date.now();
//     localStorage.setItem("userID", id);
//   }
//   const myID = localStorage.getItem("userID");

//   // ====== Komentar di memory saja ======
//   const comments = []; // array kosong, hilang saat refresh

//   function loadComments() {
//     commentList.innerHTML = "";
//     comments.forEach((item, index) => {
//       const box = document.createElement("div");
//       box.className = "comment-item";
//       box.innerHTML = `
//         <div class="comment-header">
//           <h4>${escapeHtml(item.nama)}</h4>
//           <button class="delete-btn" data-index="${index}">×</button>
//         </div>
//         <p>${escapeHtml(item.komen)}</p>
//       `;

//       const delBtn = box.querySelector(".delete-btn");
//       if (item.owner !== myID) delBtn.style.display = "none";

//       commentList.appendChild(box);
//     });
//   }

//   loadComments();

//   // ====== Popup ======
//   addBtn.addEventListener("click", () => (popup.style.display = "flex"));
//   cancelBtn.addEventListener("click", () => (popup.style.display = "none"));

//   // ====== Kirim komentar ======
//   sendBtn.addEventListener("click", () => {
//     const nama = namaInput.value.trim();
//     const komen = komenInput.value.trim();
//     let valid = true;

//     if (!nama) {
//       namaErr.textContent = "Nama wajib diisi!";
//       namaErr.style.display = "block";
//       namaInput.classList.add("input-error");
//       valid = false;
//     }

//     if (!komen) {
//       komenErr.textContent = "Komentar tidak boleh kosong!";
//       komenErr.style.display = "block";
//       komenInput.classList.add("input-error");
//       valid = false;
//     }

//     if (!valid) return;

//     // Tambahkan ke array komentar
//     comments.push({ nama, komen, owner: myID });

//     namaInput.value = "";
//     komenInput.value = "";
//     popup.style.display = "none";

//     loadComments();
//     showNotif();
//   });

//   // ====== Delete komentar ======
//   commentList.addEventListener("click", (e) => {
//     if (e.target.classList.contains("delete-btn")) {
//       const index = e.target.dataset.index;
//       comments.splice(index, 1); // hapus dari array
//       loadComments();
//     }
//   });

//   // ====== Clear error ======
//   namaInput.addEventListener("input", () => {
//     namaErr.style.display = "none";
//     namaInput.classList.remove("input-error");
//   });
//   komenInput.addEventListener("input", () => {
//     komenErr.style.display = "none";
//     komenInput.classList.remove("input-error");
//   });

//   // ====== Escape HTML ======
//   function escapeHtml(str = "") {
//     return String(str)
//       .replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;")
//       .replace(/"/g, "&quot;")
//       .replace(/'/g, "&#039;");
//   }

//   // ====== Notif ======
//   function showNotif() {
//     notif.style.display = "flex";
//     notif.style.opacity = "1";
//     notif.style.transform = "translateY(0)";
//     setTimeout(() => {
//       notif.style.opacity = "0";
//       notif.style.transform = "translateY(20px)";
//       setTimeout(() => (notif.style.display = "none"), 300);
//     }, 1500);
//   }
// });

// // komentar
// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector(".add-btn");
//   const popup = document.querySelector(".popup-overlay");
//   const cancelBtn = document.querySelector(".cancel-btn");
//   const sendBtn = document.querySelector(".send-btn");
//   const commentList = document.querySelector(".comment-list");
//   const notif = document.getElementById("notif");
//   const namaInput = document.getElementById("nama");
//   const komenInput = document.getElementById("komen");
//   const namaErr = document.getElementById("nama-error");
//   const komenErr = document.getElementById("komen-error");

//   // ====== Popup ======
//   addBtn.addEventListener("click", () => {
//     popup.style.display = "flex";
//   });

//   cancelBtn.addEventListener("click", () => {
//     popup.style.display = "none";
//   });

//   // ====== Kirim komentar (KE PHP) ======
//   sendBtn.addEventListener("click", () => {
//     const nama = namaInput.value.trim();
//     const komen = komenInput.value.trim();
//     let valid = true;

//     if (!nama) {
//       namaErr.textContent = "Nama wajib diisi!";
//       namaErr.style.display = "block";
//       namaInput.classList.add("input-error");
//       valid = false;
//     }

//     if (!komen) {
//       komenErr.textContent = "Komentar tidak boleh kosong!";
//       komenErr.style.display = "block";
//       komenInput.classList.add("input-error");
//       valid = false;
//     }

//     if (!valid) return;

//     fetch("backend/save_comment.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         nama: nama,
//         komen: komen,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status === "success") {
//           namaInput.value = "";
//           komenInput.value = "";
//           popup.style.display = "none";
//           showNotif();
//         } else {
//           alert("Gagal mengirim komentar");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Terjadi error koneksi");
//       });
//   });

//   // ====== Clear error ======
//   namaInput.addEventListener("input", () => {
//     namaErr.style.display = "none";
//     namaInput.classList.remove("input-error");
//   });

//   komenInput.addEventListener("input", () => {
//     komenErr.style.display = "none";
//     komenInput.classList.remove("input-error");
//   });

//   // ====== Notif ======
//   function showNotif() {
//     notif.style.display = "flex";
//     notif.style.opacity = "1";
//     notif.style.transform = "translateY(0)";
//     setTimeout(() => {
//       notif.style.opacity = "0";
//       notif.style.transform = "translateY(20px)";
//       setTimeout(() => {
//         notif.style.display = "none";
//       }, 300);
//     }, 1500);
//   }
// });

// komentar
// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector(".add-btn");
//   const popup = document.querySelector(".popup-overlay");
//   const cancelBtn = document.querySelector(".cancel-btn");
//   const sendBtn = document.querySelector(".send-btn");
//   const commentList = document.querySelector(".comment-list");
//   const notif = document.getElementById("notif");
//   const namaInput = document.getElementById("nama");
//   const komenInput = document.getElementById("komen");
//   const namaErr = document.getElementById("nama-error");
//   const komenErr = document.getElementById("komen-error");

//   // ================= POPUP =================
//   addBtn.addEventListener("click", () => {
//     popup.style.display = "flex";
//   });

//   cancelBtn.addEventListener("click", () => {
//     popup.style.display = "none";
//   });

//   // ================= LOAD KOMENTAR =================
//   function loadComments() {
//     fetch("/portofolio/backend/get_comments.php")
//       .then((res) => res.json())
//       .then((data) => {
//         commentList.innerHTML = "";

//         if (data.length === 0) {
//           commentList.innerHTML =
//             "<p style='opacity:0.6'>Belum ada komentar</p>";
//           return;
//         }

//         data.forEach((item) => {
//           const box = document.createElement("div");
//           box.className = "comment-item";
//           box.innerHTML = `
//             <div class="comment-header">
//               <h4>${escapeHtml(item.name)}</h4>
//               <small>${item.created_at}</small>
//             </div>
//             <p>${escapeHtml(item.message)}</p>
//           `;
//           commentList.appendChild(box);
//         });
//       })
//       .catch(() => {
//         commentList.innerHTML =
//           "<p style='color:red'>Gagal memuat komentar</p>";
//       });
//   }

//   // ================= KIRIM KOMENTAR =================
//   sendBtn.addEventListener("click", () => {
//     const nama = namaInput.value.trim();
//     const komen = komenInput.value.trim();
//     let valid = true;

//     if (!nama) {
//       namaErr.textContent = "Nama wajib diisi!";
//       namaErr.style.display = "block";
//       namaInput.classList.add("input-error");
//       valid = false;
//     }

//     if (!komen) {
//       komenErr.textContent = "Komentar tidak boleh kosong!";
//       komenErr.style.display = "block";
//       komenInput.classList.add("input-error");
//       valid = false;
//     }

//     if (!valid) return;

//     fetch("/portofolio/backend/save_comment.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         nama: nama,
//         komen: komen,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status === "success") {
//           namaInput.value = "";
//           komenInput.value = "";
//           popup.style.display = "none";
//           showNotif();
//           loadComments(); // reload komentar
//         } else {
//           alert("Gagal mengirim komentar");
//         }
//       })
//       .catch(() => {
//         alert("Terjadi error koneksi");
//       });
//   });

//   // ================= CLEAR ERROR =================
//   namaInput.addEventListener("input", () => {
//     namaErr.style.display = "none";
//     namaInput.classList.remove("input-error");
//   });

//   komenInput.addEventListener("input", () => {
//     komenErr.style.display = "none";
//     komenInput.classList.remove("input-error");
//   });

//   // ================= NOTIF =================
//   function showNotif() {
//     notif.style.display = "flex";
//     notif.style.opacity = "1";
//     notif.style.transform = "translateY(0)";
//     setTimeout(() => {
//       notif.style.opacity = "0";
//       notif.style.transform = "translateY(20px)";
//       setTimeout(() => {
//         notif.style.display = "none";
//       }, 300);
//     }, 1500);
//   }

//   // ================= ESCAPE HTML =================
//   function escapeHtml(text) {
//     return text
//       .replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;")
//       .replace(/"/g, "&quot;")
//       .replace(/'/g, "&#039;");
//   }

//   // ================= INIT =================
//   loadComments();
// });

/***********************
 * CONFIG ADMIN
 ***********************/
// Admin key tidak disimpan di frontend. Gunakan autentikasi/session di backend.
// const IS_ADMIN = true;
// Session admin dikelola oleh backend.

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector(".add-btn");
//   const popup = document.querySelector(".popup-overlay");
//   const cancelBtn = document.querySelector(".cancel-btn");
//   const sendBtn = document.querySelector(".send-btn");
//   const commentList = document.querySelector(".comment-list");
//   const notif = document.getElementById("notif");
//   const namaInput = document.getElementById("nama");
//   const komenInput = document.getElementById("komen");
//   const namaErr = document.getElementById("nama-error");
//   const komenErr = document.getElementById("komen-error");

//   /***********************
//    * POPUP
//    ***********************/
//   addBtn.addEventListener("click", () => {
//     popup.style.display = "flex";
//   });

//   cancelBtn.addEventListener("click", () => {
//     popup.style.display = "none";
//   });

//   /***********************
//    * LOAD KOMENTAR
//    ***********************/
//   function loadComments() {
//     fetch("/portofolio/backend/get_comments.php")
//       .then((res) => res.json())
//       .then((data) => {
//         commentList.innerHTML = "";

//         if (!data || data.length === 0) {
//           commentList.innerHTML =
//             "<p style='opacity:0.6'>Belum ada komentar</p>";
//           return;
//         }

//         data.forEach((item) => {
//           const box = document.createElement("div");
//           box.className = "comment-item";

//           box.innerHTML = `
//             <div class="comment-header">
//               <h4>${escapeHtml(item.name)}</h4>
//               <small>${item.created_at}</small>
//               ${
//                 IS_ADMIN
//                   ? `<button class="delete-btn" data-id="${item.id}" title="Hapus komentar">✕</button>`
//                   : ""
//               }
//             </div>
//             <p>${escapeHtml(item.message)}</p>
//           `;

//           commentList.appendChild(box);
//         });
//       })
//       .catch(() => {
//         commentList.innerHTML =
//           "<p style='color:red'>Gagal memuat komentar</p>";
//       });
//   }

//   /***********************
//    * KIRIM KOMENTAR
//    ***********************/
//   sendBtn.addEventListener("click", () => {
//     const nama = namaInput.value.trim();
//     const komen = komenInput.value.trim();
//     let valid = true;

//     if (!nama) {
//       namaErr.textContent = "Nama wajib diisi!";
//       namaErr.style.display = "block";
//       namaInput.classList.add("input-error");
//       valid = false;
//     }

//     if (!komen) {
//       komenErr.textContent = "Komentar tidak boleh kosong!";
//       komenErr.style.display = "block";
//       komenInput.classList.add("input-error");
//       valid = false;
//     }

//     if (!valid) return;

//     fetch("/portofolio/backend/save_comment.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         nama: nama,
//         komen: komen,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status === "success") {
//           namaInput.value = "";
//           komenInput.value = "";
//           popup.style.display = "none";
//           showNotif();
//           loadComments();
//         } else {
//           alert("Gagal mengirim komentar");
//         }
//       })
//       .catch(() => {
//         alert("Terjadi error koneksi");
//       });
//   });

//   /***********************
//    * HAPUS KOMENTAR (ADMIN)
//    ***********************/
//   commentList.addEventListener("click", (e) => {
//     if (!e.target.classList.contains("delete-btn")) return;

//     const id = e.target.dataset.id;

//     if (!confirm("Yakin ingin menghapus komentar ini?")) return;

//     fetch("/portofolio/backend/delete_comment.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id: id,
//         session admin diperlukan,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status === "success") {
//           loadComments();
//         } else {
//           alert("Tidak memiliki izin menghapus komentar");
//         }
//       })
//       .catch(() => {
//         alert("Gagal menghapus komentar");
//       });
//   });

//   /***********************
//    * CLEAR ERROR
//    ***********************/
//   namaInput.addEventListener("input", () => {
//     namaErr.style.display = "none";
//     namaInput.classList.remove("input-error");
//   });

//   komenInput.addEventListener("input", () => {
//     komenErr.style.display = "none";
//     komenInput.classList.remove("input-error");
//   });

//   /***********************
//    * NOTIF
//    ***********************/
//   function showNotif() {
//     notif.style.display = "flex";
//     notif.style.opacity = "1";
//     notif.style.transform = "translateY(0)";

//     setTimeout(() => {
//       notif.style.opacity = "0";
//       notif.style.transform = "translateY(20px)";
//       setTimeout(() => {
//         notif.style.display = "none";
//       }, 300);
//     }, 1500);
//   }

//   /***********************
//    * ESCAPE HTML (ANTI XSS)
//    ***********************/
//   function escapeHtml(text) {
//     return text
//       .replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;")
//       .replace(/"/g, "&quot;")
//       .replace(/'/g, "&#039;");
//   }

//   /***********************
//    * INIT
//    ***********************/
//   loadComments();
// });

let isAdmin = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector(".add-btn");
  const popup = document.querySelector(".popup-overlay");
  const cancelBtn = document.querySelector(".cancel-btn");
  const sendBtn = document.querySelector(".send-btn");
  const commentList = document.querySelector(".comment-list");
  const notif = document.getElementById("notif");
  const namaInput = document.getElementById("nama");
  const komenInput = document.getElementById("komen");
  const namaErr = document.getElementById("nama-error");
  const komenErr = document.getElementById("komen-error");
  const adminBtn = document.getElementById("adminBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const adminOverlay = document.getElementById("adminOverlay");
  const adminPassword = document.getElementById("adminPassword");
  const adminError = document.getElementById("admin-error");
  const cancelAdminBtn = document.querySelector(".cancel-admin-btn");
  const adminLoginBtn = document.querySelector(".admin-login-btn");

  /* ======================
     POPUP
  ====================== */
  addBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  cancelBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  /* ======================
     ADMIN LOGIN
  ====================== */
  function setAdminUi(authenticated) {
    isAdmin = authenticated;
    adminBtn.hidden = authenticated;
    logoutBtn.hidden = !authenticated;
  }

  function openAdminLogin() {
    adminError.textContent = "";
    adminError.style.display = "none";
    adminOverlay.classList.add("active");
    adminPassword.value = "";
    adminPassword.focus();
  }

  function closeAdminLogin() {
    adminOverlay.classList.remove("active");
    adminError.textContent = "";
    adminError.style.display = "none";
  }

  async function checkAdminStatus() {
    try {
      const response = await fetch("/portofolio/backend/admin_status.php");
      const data = await response.json();
      setAdminUi(data.authenticated === true);
      return data.authenticated === true;
    } catch {
      setAdminUi(false);
      return false;
    }
  }

  adminBtn.addEventListener("click", openAdminLogin);
  cancelAdminBtn.addEventListener("click", closeAdminLogin);

  adminPassword.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      adminLoginBtn.click();
    }
  });

  adminLoginBtn.addEventListener("click", async () => {
    const password = adminPassword.value;
    if (!password) {
      adminError.textContent = "Password admin wajib diisi";
      adminError.style.display = "block";
      return;
    }

    adminLoginBtn.disabled = true;
    adminError.textContent = "";
    adminError.style.display = "none";

    try {
      const response = await fetch("/portofolio/backend/admin_login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();

      if (data.status === "success") {
        setAdminUi(true);
        closeAdminLogin();
        await loadComments();
        return;
      }

      adminError.textContent = data.message || "Login admin gagal";
      adminError.style.display = "block";
    } catch {
      adminError.textContent = "Terjadi error koneksi";
      adminError.style.display = "block";
    } finally {
      adminLoginBtn.disabled = false;
    }
  });

  logoutBtn.addEventListener("click", async () => {
    try {
      await fetch("/portofolio/backend/admin_logout.php", { method: "POST" });
    } finally {
      setAdminUi(false);
      await loadComments();
    }
  });

  /* ======================
     LOAD KOMENTAR
  ====================== */
  function loadComments() {
    fetch("/portofolio/backend/get_comments.php")
      .then((res) => res.json())
      .then((data) => {
        commentList.innerHTML = "";

        if (!data || data.length === 0) {
          commentList.innerHTML = "<p style='opacity:1'>Belum ada komentar</p>";
          return;
        }

        data.forEach((item) => {
          const box = document.createElement("div");
          box.className = "comment-item";

          box.innerHTML = `
            <div class="comment-header">
              <div class="comment-user">
                <h4>${escapeHtml(item.name)}</h4>
                <small class="comment-time">${formatDate(
                  item.created_at
                )}</small>
              </div>
              ${
                isAdmin
                  ? `<button class="delete-btn" data-id="${item.id}" title="Hapus komentar">✕</button>`
                  : ""
              }
            </div>
            <p>${escapeHtml(item.message)}</p>
          `;

          commentList.appendChild(box);
        });
      })
      .catch(() => {
        commentList.innerHTML =
          "<p style='color:red'>Gagal memuat komentar</p>";
      });
  }

  /* ======================
     KIRIM KOMENTAR
  ====================== */
  sendBtn.addEventListener("click", () => {
    const nama = namaInput.value.trim();
    const komen = komenInput.value.trim();
    let valid = true;

    if (!nama) {
      namaErr.textContent = "Nama wajib diisi!";
      namaErr.style.display = "block";
      namaInput.classList.add("input-error");
      valid = false;
    }

    if (!komen) {
      komenErr.textContent = "Komentar tidak boleh kosong!";
      komenErr.style.display = "block";
      komenInput.classList.add("input-error");
      valid = false;
    }

    if (!valid) return;

    fetch("/portofolio/backend/save_comment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, komen }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          namaInput.value = "";
          komenInput.value = "";
          popup.style.display = "none";
          showNotif();
          loadComments();
        } else {
          alert("Gagal mengirim komentar");
        }
      })
      .catch(() => {
        alert("Terjadi error koneksi");
      });
  });

  /* ======================
     HAPUS KOMENTAR (ADMIN)
  ====================== */
  commentList.addEventListener("click", (e) => {
    if (!e.target.classList.contains("delete-btn")) return;

    const id = e.target.dataset.id;
    if (!confirm("Yakin ingin menghapus komentar ini?")) return;

    fetch("/portofolio/backend/delete_comment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          loadComments();
        } else {
          alert("Tidak memiliki izin menghapus komentar");
        }
      })
      .catch(() => {
        alert("Gagal menghapus komentar");
      });
  });

  /* ======================
     CLEAR ERROR
  ====================== */
  namaInput.addEventListener("input", () => {
    namaErr.style.display = "none";
    namaInput.classList.remove("input-error");
  });

  komenInput.addEventListener("input", () => {
    komenErr.style.display = "none";
    komenInput.classList.remove("input-error");
  });

  /* ======================
     NOTIF
  ====================== */
  function showNotif() {
    notif.style.display = "flex";
    notif.style.opacity = "1";
    notif.style.transform = "translateY(0)";

    setTimeout(() => {
      notif.style.opacity = "0";
      notif.style.transform = "translateY(20px)";
      setTimeout(() => {
        notif.style.display = "none";
      }, 300);
    }, 1500);
  }

  /* ======================
     FORMAT TANGGAL
     29 Desember 2025 • 17:02
  ====================== */
  function formatDate(datetime) {
    const d = new Date(datetime);

    const tanggal = d.getDate();
    const bulan = d.toLocaleString("id-ID", { month: "long" });
    const tahun = d.getFullYear();

    const jam = String(d.getHours()).padStart(2, "0");
    const menit = String(d.getMinutes()).padStart(2, "0");

    return `${tanggal} ${bulan} ${tahun} • ${jam}:${menit}`;
  }

  /* ======================
     ESCAPE HTML (ANTI XSS)
  ====================== */
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ======================
     INIT
  ====================== */
  loadComments();
  checkAdminStatus().then((authenticated) => {
    if (authenticated) loadComments();
  });
});

// footer animation
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".footer-grid");
  const footer = document.getElementById("footer");

  if (!grid || !footer) return;

  const total = 38 * 38;
  for (let i = 0; i < total; i++) {
    grid.appendChild(document.createElement("div"));
  }

  const xAnim = gsap.quickTo(grid, "x", { duration: 1.5, ease: "power3.out" });
  const yAnim = gsap.quickTo(grid, "y", { duration: 1.5, ease: "power3.out" });

  footer.addEventListener("mousemove", (e) => {
    const rect = footer.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const x = (e.clientX - rect.left - cx) * -0.07;
    const y = (e.clientY - rect.top - cy) * -0.07;

    xAnim(x);
    yAnim(y);
  });

  footer.addEventListener("mouseleave", () => {
    xAnim(0);
    yAnim(0);
  });
});
