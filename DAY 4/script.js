document.addEventListener("DOMContentLoaded", function () {

    // Fade-in animation
    const elements = document.querySelectorAll(".card, .left-section");
    elements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        setTimeout(() => {
            el.style.transition = "all 0.8s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, index * 300);
    });

    // Make email clickable
    const emailParagraphs = document.querySelectorAll(".card-body p");
    emailParagraphs.forEach(p => {
        if (p.innerText.includes("@")) {
            p.style.cursor = "pointer";
            p.addEventListener("click", function () {
                window.location.href = "mailto:mahalakshmikanchi92@gmail.com";
            });
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Hover effect for skills
    const skills = document.querySelectorAll(".list-group-item");
    skills.forEach(skill => {
        skill.addEventListener("mouseenter", function () {
            this.style.backgroundColor = "rgba(255,255,255,0.2)";
            this.style.transition = "0.3s";
        });
        skill.addEventListener("mouseleave", function () {
            this.style.backgroundColor = "transparent";
        });
    });

    console.log("Portfolio Loaded Successfully 🚀");

});
