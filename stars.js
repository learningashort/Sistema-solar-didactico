document.addEventListener("DOMContentLoaded", () =>{
    const starsContainer = document.querySelector(".stars");
    const numStars = 1000;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        star.style.top = Math.random() * 100 + "vh";
        star.style.left = Math.random() * 100 + "vw";

        const size = Math.random() * 2 + 1;
        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.opacity = Math.random();
        
        starsContainer.appendChild(star);

        star.style.animationDelay = Math.random() * 5 + "s";
    }
});