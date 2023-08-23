document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(".music-menu-link");
    const contentContainers = document.querySelectorAll(".music-content-container");
    const backBtns = document.querySelectorAll('.music-menu-back');
    const heroImg = document.getElementById('music-hero');

    // Initialize by showing the first content container and hiding others
    contentContainers.forEach((container, index) => {
        if (index === 0) {
            container.style.display = "flex";
        } else {
            container.style.display = "none";
        }
    });

    // Add click event listeners to menu links
    menuLinks.forEach((link, index) => {
        link.addEventListener("click", function () {
            // Hide all content containers
            contentContainers.forEach(container => {
                container.style.display = "none";
            });

            // Show the corresponding content container
            const targetId = link.getAttribute("data-link");
            const targetContainer = document.getElementById(targetId);
            if (targetContainer) {
                targetContainer.style.display = "flex";
            }

            heroImg.classList.add('hero-shrink');
        });
    });

    // Add click event listeners to back buttons
    backBtns.forEach((backBtn) => {
        backBtn.addEventListener("click", function () {
            // Hide all content containers
            contentContainers.forEach(container => {
                container.style.display = "none";
            });

            // Show the menu container
            const menuContainer = document.querySelector(".music-container-active");
            if (menuContainer) {
                menuContainer.style.display = "flex";
            }

            heroImg.classList.remove('hero-shrink');
        });
    });
});
