(() => {
  "use strict";

  const EFFECT_ID = "zerojuri-night-effect-test";
  const STYLE_ID = "zerojuri-night-effect-test-style";

  function createStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${EFFECT_ID}{
        position:fixed !important;
        inset:0 !important;
        z-index:999999 !important;
        pointer-events:none !important;
      }

      #${EFFECT_ID} .night-test-light{
        position:absolute !important;
        width:30px !important;
        height:30px !important;
        border-radius:50% !important;
        background:#fff !important;
        box-shadow:
          0 0 10px #fff,
          0 0 25px #fff,
          0 0 45px #fff !important;
        opacity:1 !important;
      }

      #${EFFECT_ID} .night-test-center{
        left:50% !important;
        top:50% !important;
        transform:translate(-50%,-50%) !important;
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

    const center = document.createElement("span");
    center.className = "night-test-light night-test-center";
    layer.appendChild(center);

    for (let i = 0; i < 12; i++) {
      const light = document.createElement("span");
      light.className = "night-test-light";
      light.style.left = `${5 + Math.random() * 90}%`;
      light.style.top = `${5 + Math.random() * 90}%`;
      layer.appendChild(light);
    }

    document.body.appendChild(layer);
  }

  function init() {
    createEffect();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
