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
  { name: "Mercurio", color: "gray", 
    radius: Math.max((diametersKm.Mercurio/2) * pxPerKm, 0.5), 
    distance: 160, 
    angle: Math.random() * Math.PI * 2,
    mass: "3.30 x 10^23 kg", 
    description: "Mercurio es el planeta más cercano al sol y el más pequeño del sistema solar, su núcleo esta parcialmente fundido y esta compuesto principalmente por hierro, constituye la mayor parte del planeta.",
    orbitalPeriods: orbitalPeriods["Mercurio"] + " días",
    type: "Rocoso",
    diameter: diametersKm.Mercurio + " km",
    temperature: "Durante un dia en mercurio se pueden alcanzar 430 ºC y cuando es de noche, pueden bajar hasta los -180ºC"
  },
  { name: "Venus", color: "yellow",
    radius: Math.max((diametersKm.Venus/1.5) * pxPerKm, 1.5),
    distance: 220,
    angle: Math.random() * Math.PI * 2,
    mass: "4.87 x 10^24 kg",
    description: "Venus tiene un tamaño similar a la Tierra, pero su atmósfera es muy densa y caliente, hace un efecto invernadero que provoca que sea el planeta más caliente del Sistema Solar, tarda más en girar sobre si mismo que en completar una órbita completa." ,
    orbitalPeriods: orbitalPeriods["Venus"] + " días",
    type: "Rocoso",
    diameter: diametersKm.Venus + " km",
    temperature: "La temperatura en Venus es de aproximadamente 465 ºC, loo convierte en el planeta más caliente del sistema solar."
  },
  { name: "Tierra", color: "green",
    radius: Math.max((diametersKm.Tierra/1.5) * pxPerKm, 1.5),
    distance: 300,
    angle: Math.random() * Math.PI * 2,
    mass: "5.97 x 10^24 kg",
    description: "Único planeta conocido con vida, su atmosfera rica en oxigeno y no muy densa, permite que la tempertura sea ideal para la vida y mantener el agua líquida, debemos cuidarlo ya que tierra solo hay una.",
    orbitalPeriods: orbitalPeriods["Tierra"] + " días",
    type: "Rocoso",
    diameter: diametersKm.Tierra + " km",
    temperature: "La temperatura media en la tierra es de aproximadamente 15ºC, aunque esta aumentando considerablemente por el cambio climático."
  },
  { name: "Marte", color: "red",
    radius: Math.max((diametersKm.Marte/1.5) * pxPerKm, 1.5),
    distance: 380, angle: Math.random() * Math.PI * 2,
    mass: "6.42 x 10^23 kg",
    description: "El planeta rojo, hay indicios de que tuvo agua líquida y pudo tener vida, se estudian las colonias en este planeta, ya que la atmosfera y la gravedad son parecidas a La Tierra.",
    orbitalPeriods: orbitalPeriods["Marte"] + " días",
    type: "Rocoso",
    diameter: diametersKm.Marte + " km",
    temperature: "La temperatura en Marte puede ir desde los 20 ºC en verano, hasta los -153 ºC en las noches más frías, ya que su atmósfera es muy delgada."
  },
  { name: "Jupiter", color: "orange",
    radius: Math.max((diametersKm.Jupiter/1.5) * pxPerKm, 0.5),
    distance: 500, angle: Math.random() * Math.PI * 2,
    mass: "1.90 x 10^27 kg",
    description: "El planeta más grande, pudo haber sido una estrella, por su masividad y la variación gaseosa que tiene, su gran mancha roja es una tormenta, y tiene un sistema de satelites de más de 80 lunas, se estudia la habitabilidad en algunas de ellas.",
    orbitalPeriods: orbitalPeriods["Jupiter"] + " días",
    type: "Gaseoso",
    diameter: diametersKm.Jupiter + " km",
    temperature: "La temperatura en Júpiter es de unos -145ºC, ya que esta muy lejos del sol y su atmósfera es muy densa."
  },
  { name: "Saturno", color: "goldenrod",
    radius: Math.max((diametersKm.Saturno/1.5) * pxPerKm, 0.5),
    distance: 600, angle: Math.random() * Math.PI * 2,
    mass: "5.68 x 10^26 kg",
    description: "Famoso por sus anillos, otro gigante gaseoso como Júpiter, también con muchos sátelites (más de 140 lunas), sus anillos están compuestos por polvo estelar, agua helada y roca, están a su alrededor por su potente campo gravitacional, también se investiga la habitabilidad en algunas de sus lunas.",
    orbitalPeriods: orbitalPeriods["Saturno"] + " días",
    type: "Gaseoso",
    diameter: diametersKm.Saturno + " km",
    temperature: "En las nubes de Saturno la temperatura es de unos -180 ºC, conforme se profundiza en el planeta la temperatura aumenta."
  },
  { name: "Urano", color: "lightblue", 
    radius: Math.max((diametersKm.Urano/1.5) * pxPerKm, 0.5),
    distance: 700, angle: Math.random() * Math.PI * 2,
    mass: "8.68 x 10^25 kg",
    description: "Gigante helado azulado por el metano, muy frío, además también tiene anillos como saturno, pero más pequeños, su principal característica es la rotacion con una inclinación de unos 90 ºC, posee 27 lunas.",
    orbitalPeriods: orbitalPeriods["Urano"] + " días",
    type: "Gaseoso",
    diameter: diametersKm.Urano + " km",
    temperature: "Es el más frío del sistema solar a pesar de no ser el más lejano, con una temperatura de hasta -218 ºC"
  },
  { name: "Neptuno", color: "blue",
    radius: Math.max((diametersKm.Neptuno/1.5) * pxPerKm, 0.5),
    distance: 800, angle: Math.random() * Math.PI * 2,
    mass: "1.02 x 10^26 kg",
    description: "El más lejano, también gigante gaseoso, algo más oscuro que Urano, es un gigante de hielo azul, con los vientos máas rápidos del sistema solar generando tormentas del tamaño de la tierra, solo fue visitado por la Voyager 2",
    orbitalPeriods: orbitalPeriods["Neptuno"] + " días",
    type: "Gaseoso",
    diameter: diametersKm.Neptuno + " km",
    temperature: "Siendo el último planeta del sistema solar, su temperatura es de unos -214 ºC"
  }
];

const earthOrbitTime = 50; 

let scale = 1;
let selectedPlanet = null;
let offsetX = canvas.width / 2;
let offsetY = canvas.height / 2;
let followPlanet = false;
let showOrbits = true;

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
      ctx.arc(x, y, planet.radius * scale, 0, Math.PI * 2);
      ctx.fillStyle = planet.color;
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      ctx.fillText(planet.name, x + 10, y);

      if (showOrbits) {
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, planet.distance * scale, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    requestAnimationFrame(drawSystem);
}
drawSystem();

function resetinfoPanel() {
    const panel = document.getElementById("infoPanel");
    panel.innerHTML = `<h2>Selecciona un planeta</h2><p>Aqui veras sus caracteristicas.</p>
`;}

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
      <p><strong>Diámetro:</strong> ${clickedPlanet.diameter}</p>
      <p><strong>Tipo:</strong> ${clickedPlanet.type}</p>
      <p><strong>Periodo de orbitación:</strong> ${clickedPlanet.orbitalPeriods}</p>
      <p><strong>Temperatura media:</strong> ${clickedPlanet.temperature}</p>
      <p><strong>Descripción:</strong> ${clickedPlanet.description}</p>
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
    selectedPlanet = null;
    resetinfoPanel();
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

document.getElementById("toggleSidebar").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("active");
});

document.getElementById("btnResetView").addEventListener("click", () => {
  const maxDistance = Math.max(...planets.map(p => p.distance));

  const margin = 50;

  const scaleX = (canvas.width - margin * 2) / (maxDistance * 2);
  const scaleY = (canvas.height - margin * 2) / (maxDistance * 2);
  scale = Math.min(scaleX, scaleY);

  offsetX = canvas.width / 2;
  offsetY = canvas.height / 2;

  selectedPlanet = null;
  followPlanet = false;

  resetinfoPanel();
});

document.getElementById("btnToggleOrbits").addEventListener("click", () => {
  showOrbits = !showOrbits;
});





