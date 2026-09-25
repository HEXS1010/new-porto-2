// footer animation
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  const rows = 30;
  const cols = 30;
  const total = rows * cols;

  const isMobile = window.innerWidth < 600;

  /* === CREATE GRID === */
  grid.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const cell = document.createElement("div");
    cell.style.willChange = "opacity, transform, box-shadow, background-color";
    grid.appendChild(cell);
  }

  const cells = Array.from(grid.children);

  /* === AUTO DRIFT (DESKTOP & HP) === */
  gsap.to(grid, {
    x: "-3%",
    y: "-3%",
    duration: isMobile ? 18 : 12, // HP lebih pelan biar ringan
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });

  /* === PARALLAX (DESKTOP & HP) === */
  function applyParallax(clientX, clientY) {
    const x = (clientX / window.innerWidth - 0.5) * 4;
    const y = (clientY / window.innerHeight - 0.5) * 4;

    gsap.to(grid, {
      x: `${-3 + x}%`,
      y: `${-3 + y}%`,
      duration: isMobile ? 1.1 : 0.8, // HP lebih smooth
      ease: "power2.out",
    });
  }

  // mouse move (PC)
  document.addEventListener("mousemove", (e) => {
    applyParallax(e.clientX, e.clientY);
  });

  // touch move (HP)
  document.addEventListener(
    "touchmove",
    (e) => {
      const t = e.touches[0];
      applyParallax(t.clientX, t.clientY);
    },
    { passive: true }
  );

  /* === GLOW SETTINGS === */
  const glowRadius = 0;
  const peakScale = 1.18;

  function cellIndex(r, c) {
    return r * cols + c;
  }

  /* === CORE GLOW EFFECT (DESKTOP & HP) === */
  function handleMove(clientX, clientY) {
    const rect = grid.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

    const cellW = rect.width / cols;
    const cellH = rect.height / rows;

    const col = Math.floor(x / cellW);
    const row = Math.floor(y / cellH);

    for (let dy = -glowRadius; dy <= glowRadius; dy++) {
      for (let dx = -glowRadius; dx <= glowRadius; dx++) {
        const r = row + dy;
        const c = col + dx;
        if (r < 0 || r >= rows || c < 0 || c >= cols) continue;

        const index = cellIndex(r, c);
        const cell = cells[index];
        if (!cell) continue;

        gsap.killTweensOf(cell);

        gsap.to(cell, {
          backgroundColor: "rgba(0, 255, 255, 0.56)",
          boxShadow:
            "0 0 18px rgba(0,255,255,0.35), 0 0 40px rgba(0,255,255,0.12)",
          scale: peakScale,
          duration: isMobile ? 0.12 : 0.06,
          overwrite: true,
          onComplete: () => {
            gsap.to(cell, {
              backgroundColor: "rgba(0,255,255,0)",
              boxShadow: "0 0 0 rgba(0,0,0,0)",
              scale: 1,
              duration: isMobile ? 1.1 : 0.7,
              ease: "power2.out",
              delay: 0.1,
            });
          },
        });
      }
    }
  }

  /* === GLOW FOR PC === */
  document.addEventListener("mousemove", (e) => {
    handleMove(e.clientX, e.clientY);
  });

  /* === GLOW FOR HP === */
  document.addEventListener(
    "touchstart",
    (e) => {
      const t = e.touches[0];
      handleMove(t.clientX, t.clientY);
    },
    { passive: true }
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      const t = e.touches[0];
      handleMove(t.clientX, t.clientY);
    },
    { passive: true }
  );
});
