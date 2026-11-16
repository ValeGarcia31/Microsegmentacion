(function () {
  const NS = "http://www.w3.org/2000/svg";
  const PERIOD = 40;
  const STEP = 6.5;

  function addElement(parent, name, attributes) {
    const element = document.createElementNS(NS, name);
    Object.keys(attributes).forEach(function (key) {
      element.setAttribute(key, attributes[key]);
    });
    parent.appendChild(element);
    return element;
  }

  function buildLogo(container, index) {
    const svg = addElement(container, "svg", {
      viewBox: "0 0 400 400",
      role: "img",
      "aria-label": "Logo Matrix hecho de binarios"
    });
    const defs = addElement(svg, "defs", {});
    const clipId = "mx-clip-" + index;
    const brightId = "mx-bright-" + index;
    const globeId = "mx-globe-" + index;
    const clip = addElement(defs, "clipPath", { id: clipId });
    addElement(clip, "circle", { cx: "200", cy: "200", r: "190" });

    const bright = addElement(defs, "mask", { id: brightId, maskUnits: "userSpaceOnUse" });
    addElement(bright, "rect", { width: "400", height: "400", fill: "#000" });
    addElement(bright, "circle", { cx: "200", cy: "200", r: "193", fill: "none", stroke: "#fff", "stroke-width": "10" });
    addElement(bright, "path", { "clip-path": "url(#" + clipId + ")", fill: "#fff", d: "M118 392 L121 262 Q123 240 140 237 L166 232 L184 221 L200 228 L216 221 L234 232 L260 237 Q277 240 279 262 L282 392 Z" });
    addElement(bright, "path", { fill: "#000", d: "M184 224 L200 232 L216 224 Q218 252 200 282 Q182 252 184 224 Z" });
    addElement(bright, "path", { fill: "#fff", d: "M196 236 L204 236 L206 252 L204 285 L200 292 L196 285 L194 252 Z" });
    addElement(bright, "path", { d: "M180 138 Q180 114 202 114 Q224 114 224 136 Q224 152 204 160 Q199 163 199 172", fill: "none", stroke: "#fff", "stroke-width": "13", "stroke-linecap": "round" });
    addElement(bright, "circle", { cx: "199", cy: "192", r: "8.5", fill: "#fff" });

    const globe = addElement(defs, "mask", { id: globeId, maskUnits: "userSpaceOnUse" });
    addElement(globe, "rect", { width: "400", height: "400", fill: "#000" });
    const globeLines = addElement(globe, "g", { fill: "none", stroke: "#fff", "stroke-width": "4" });
    [
      ["circle", { cx: "200", cy: "190", r: "104" }],
      ["ellipse", { cx: "200", cy: "190", rx: "68", ry: "104" }],
      ["ellipse", { cx: "200", cy: "190", rx: "34", ry: "104" }],
      ["line", { x1: "200", y1: "86", x2: "200", y2: "294" }],
      ["line", { x1: "96", y1: "190", x2: "304", y2: "190" }],
      ["ellipse", { cx: "200", cy: "138", rx: "98", ry: "14" }],
      ["ellipse", { cx: "200", cy: "242", rx: "98", ry: "14" }]
    ].forEach(function (item) { addElement(globeLines, item[0], item[1]); });

    addElement(svg, "rect", { width: "400", height: "400", fill: "#0f7a42", opacity: ".28", mask: "url(#" + globeId + ")" });
    addElement(svg, "rect", { width: "400", height: "400", fill: "#0f7a42", opacity: ".55", mask: "url(#" + brightId + ")" });
    const rainGlobe = addElement(svg, "g", { class: "mx-dim", mask: "url(#" + globeId + ")" });
    const rainBright = addElement(svg, "g", { mask: "url(#" + brightId + ")" });
    [rainGlobe, rainBright].forEach(function (target, targetIndex) {
      for (let x = 4, column = 0; x < 400; x += STEP, column += 1) {
        let chars = "";
        for (let k = 0; k < PERIOD * 2; k += 1) chars += Math.random() < .5 ? "0" : "1";
        const text = addElement(target, "text", { class: "mx-col" });
        text.style.animationDuration = (5 + Math.random() * 9).toFixed(1) + "s";
        text.style.animationDelay = (-Math.random() * 12 - targetIndex).toFixed(1) + "s";
        text.style.opacity = (.6 + Math.random() * .4).toFixed(2);
        for (let k = 0; k < chars.length; k += 1) {
          addElement(text, "tspan", { x: x, y: -400 + 10 * (k + 1) }).textContent = chars[k];
        }
      }
    });
  }

  document.querySelectorAll(".sa-matrix-logo").forEach(buildLogo);
}());
