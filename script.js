const canvas = document.getElementById("solarSystem");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.8;

const orbitalPeriods = {
  "Mercurio": 88,
  "Venus": 225,
  "Tierra": 365,
  "Marte": 687,
  "Jupiter": 4333,
  "Saturno": 10759,
  "Urano": 30687,
  "Neptuno": 60190,
};

const diametersKm = {
  Sol: 1392000,
  Mercurio: 4879,
  Venus: 12104,
  Tierra: 12742,
  Marte: 6779,
  Jupiter: 139820,
  Saturno: 116460,
  Urano: 50724,
  Neptuno: 49244,
};

const solPx = 120;
const pxPerKm = solPx / diametersKm.Sol;
const sunRadius = (diametersKm.Sol / 2) * pxPerKm;

const planets = [
  { name: "Mercurio", color: "gray", radius: Math.max((diametersKm.Mercurio/2) * pxPerKm, 0.5), distance: 160, angle: Math.random() * Math.PI * 2,
    mass: "3.30 x 10^23 kg", description: "Mercurio es el planeta más cercano al sol y el más pequeño del sistema solar." },
  { name: "Venus", color: "yellow", radius: Math.max((diametersKm.Venus/1.5) * pxPerKm, 1.5), distance: 220, angle: Math.random() * Math.PI * 2,
    mass: "4.87 x 10^24 kg", description: "Venus tiene un tamaño similar a la Tierra, pero su atmósfera es muy densa y caliente." },
  { name: "Tierra", color: "green", radius: Math.max((diametersKm.Tierra/1.5) * pxPerKm, 1.5), distance: 300, angle: Math.random() * Math.PI * 2,
    mass: "5.97 x 10^24 kg", description: "Único planeta conocido con vida y agua líquida en superficie." },
  { name: "Marte", color: "red", radius: Math.max((diametersKm.Marte/1.5) * pxPerKm, 1.5), distance: 380, angle: Math.random() * Math.PI * 2,
    mass: "6.42 x 10^23 kg", description: "El planeta rojo; hay indicios de que tuvo agua líquida e incluso pudo albergar vida." },
  { name: "Jupiter", color: "orange", radius: Math.max((diametersKm.Jupiter/1.5) * pxPerKm, 0.5), distance: 500, angle: Math.random() * Math.PI * 2,
    mass: "1.90 x 10^27 kg", description: "El planeta más grande; a veces se le llama ‘estrella fallida’." },
  { name: "Saturno", color: "goldenrod", radius: Math.max((diametersKm.Saturno/1.5) * pxPerKm, 0.5), distance: 600, angle: Math.random() * Math.PI * 2,
    mass: "5.68 x 10^26 kg", description: "Famoso por sus anillos; otro gigante gaseoso como Júpiter." },
  { name: "Urano", color: "lightblue", radius: Math.max((diametersKm.Urano/1.5) * pxPerKm, 0.5), distance: 700, angle: Math.random() * Math.PI * 2,
    mass: "8.68 x 10^25 kg", description: "Gigante helado azulado por el metano; muy frío, además también tiene anillos como saturno, pero más pequeños." },
  { name: "Neptuno", color: "blue", radius: Math.max((diametersKm.Neptuno/1.5) * pxPerKm, 0.5), distance: 800, angle: Math.random() * Math.PI * 2,
    mass: "1.02 x 10^26 kg", description: "El más lejano; también gigante gaseoso, algo más oscuro que Urano." },
];

const earthOrbitTime = 50; 

let scale = 1;
let selectedPlanet = null;
let offsetX = canvas.width / 2;
let offsetY = canvas.height / 2;
let followPlanet = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.8;
  if (!selectedPlanet) {
      offsetX = canvas.width / 2;
      offsetY = canvas.height / 2;
  }
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawSystem() {
    if (selectedPlanet && followPlanet) {
        const px = selectedPlanet.distance * scale * Math.cos(selectedPlanet.angle);
        const py = selectedPlanet.distance * scale * Math.sin(selectedPlanet.angle);
        offsetX = canvas.width / 2 - px;
        offsetY = canvas.height / 2 - py;
  }


  ctx.clearRect(0, 0, canvas.width, canvas.height);


  ctx.beginPath();
  ctx.arc(offsetX, offsetY, 75 * scale, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.shadowColor = "yellow";
  ctx.shadowBlur = 50;
  ctx.fill();
  ctx.shadowBlur = 0;

  const now = Date.now();
  if (!window.lastTime) window.lastTime = now;
  const deltaTime = (now - window.lastTime) / 1000;
  window.lastTime = now;

  planets.forEach((planet) => {
      const periodDays = orbitalPeriods[planet.name];
      if (!periodDays) return;

      const periodSeconds = (periodDays / 365) * earthOrbitTime;
      const angularSpeed = (2 * Math.PI) / periodSeconds;
      planet.angle += angularSpeed * deltaTime;

      const x = offsetX + planet.distance * scale * Math.cos(planet.angle);
      const y = offsetY + planet.distance * scale * Math.sin(planet.angle);

      ctx.beginPath();
      ctx.arc(offsetX, offsetY, planet.distance * scale, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, planet.radius * scale, 0, Math.PI * 2);
      ctx.fillStyle = planet.color;
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      ctx.fillText(planet.name, x + 10, y);
    });

    requestAnimationFrame(drawSystem);
}
drawSystem();

canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    scale *= e.deltaY < 0 ? 1.1 : 0.9;
});

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    let clickedPlanet = null;

  planets.forEach((planet) => {
    const x = offsetX + planet.distance * scale * Math.cos(planet.angle);
    const y = offsetY + planet.distance * scale * Math.sin(planet.angle);
    const dx = mouseX - x;
    const dy = mouseY - y;
    const distanceClick = Math.hypot(dx, dy);

    if (distanceClick < planet.radius * scale + 5) {
      clickedPlanet = planet;
    }
  });

  if (clickedPlanet) {
    selectedPlanet = clickedPlanet;
    followPlanet = true;
    scale = 2;

    const panel = document.getElementById("infoPanel");
    panel.innerHTML = `
      <h2>${clickedPlanet.name}</h2>
      <p><strong>Masa:</strong> ${clickedPlanet.mass}</p>
      <p>${clickedPlanet.description}</p>
    `;
  }
});

let lastMouseX, lastMouseY;
let isDragging = false;

canvas.addEventListener("mousedown", (e) => {
  if (e.button === 2) {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    isDragging = true;
    followPlanet = false;
  }
});
canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    offsetX += dx;
    offsetY += dy;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  }
});
canvas.addEventListener("mouseup", (e) => {
  if (e.button === 2) isDragging = false;
});
canvas.addEventListener("contextmenu", (e) => e.preventDefault());


