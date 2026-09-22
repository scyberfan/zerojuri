(() => {
  "use strict";

  const EFFECT_ID = "zerojuri-night-effect";
  const STYLE_ID = "zerojuri-night-effect-style";
  const START_HOUR = 20;
  const END_HOUR = 5;
  const PARTICLE_COUNT = 45;

  function isNightTime() {
    const hour = new Date().getHours();
    return hour >= START_HOUR || hour < END_HOUR;
  }

  function createStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${EFFECT_ID}{
        position:fixed;
        inset:0;
        z-index:9000;
        overflow:hidden;
        pointer-events:none;
        user-select:none;
      }

      #${EFFECT_ID} .zerojuri-night-veil{
        position:absolute;
        inset:0;
        background:rgba(16,22,38,.22);
        pointer-events:none;
      }

      #${EFFECT_ID} .zerojuri-night-light{
        position:absolute;
        width:var(--size);
        height:var(--size);
        left:var(--left);
        top:var(--top);
        border-radius:50%;
        background:rgba(255,252,242,.99);
        box-shadow:
          0 0 5px rgba(255,252,242,.92),
          0 0 12px rgba(244,229,199,.60);
        opacity:0;
        animation:
          zerojuri-night-twinkle var(--twinkle) ease-in-out var(--delay) infinite,
          zerojuri-night-drift var(--drift) ease-in-out var(--delay) infinite alternate;
      }

      #${EFFECT_ID} .zerojuri-night-light.is-bright{
        box-shadow:
          0 0 6px rgba(255,255,250,.98),
          0 0 15px rgba(250,237,210,.75),
          0 0 23px rgba(244,229,199,.30);
      }

      @keyframes zerojuri-night-twinkle{
        0%,100%{opacity:.10;transform:scale(.80)}
        45%{opacity:var(--peak);transform:scale(1.15)}
        68%{opacity:.20;transform:scale(.93)}
      }

      @keyframes zerojuri-night-drift{
        from{margin-top:-2px;margin-left:-1px}
        to{margin-top:5px;margin-left:3px}
      }

      @media (prefers-reduced-motion:reduce){
        #${EFFECT_ID} .zerojuri-night-light{
          animation:none;
          opacity:.42;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createEffect() {
    if (document.getElementById(EFFECT_ID)) return;

    createStyle();

    const layer = document.createElement("div");
    layer.id = EFFECT_ID;
    layer.setAttribute("aria-hidden", "true");

    const veil = document.createElement("div");
    veil.className = "zerojuri-night-veil";
    layer.appendChild(veil);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const light = document.createElement("span");
      light.className = "zerojuri-night-light";
      if (i % 7 === 0) light.classList.add("is-bright");

      const size = (3 + Math.random() * 4).toFixed(2);
      light.style.setProperty("--size", `${size}px`);
      light.style.setProperty("--left", `${(Math.random() * 100).toFixed(2)}%`);
      light.style.setProperty("--top", `${(Math.random() * 100).toFixed(2)}%`);
      light.style.setProperty("--twinkle", `${(5.2 + Math.random() * 5.8).toFixed(2)}s`);
      light.style.setProperty("--drift", `${(8 + Math.random() * 7).toFixed(2)}s`);
      light.style.setProperty("--delay", `${(-Math.random() * 9).toFixed(2)}s`);
      light.style.setProperty("--peak", `${(0.58 + Math.random() * 0.28).toFixed(2)}`);

      layer.appendChild(light);
    }

    document.body.appendChild(layer);
  }

  function removeEffect() {
    document.getElementById(EFFECT_ID)?.remove();
  }

  function updateEffect() {
    if (isNightTime()) {
      createEffect();
    } else {
      removeEffect();
    }
  }

  function init() {
    updateEffect();
    setInterval(updateEffect, 60 * 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
