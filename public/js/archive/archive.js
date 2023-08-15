document.addEventListener("DOMContentLoaded", function () {
    const archiveMenuLinks = document.querySelectorAll(".archive-menu-link");
    const archiveContentContainers = document.querySelectorAll(".archive-content-container");
    const archiveBackBtns = document.querySelectorAll('.archive-menu-back');
    const archiveHeroImg = document.getElementById('archive-hero');

    // Initialize by showing the first content container and hiding others
    archiveContentContainers.forEach((container, index) => {
        if (index === 0) {
            container.style.display = "flex";
        } else {
            container.style.display = "none";
        }
    });

    // Add click event listeners to menu links
    archiveMenuLinks.forEach((link, index) => {
        link.addEventListener("click", function () {
            // Hide all content containers
            archiveContentContainers.forEach(container => {
                container.style.display = "none";
            });

            // Show the corresponding content container
            const archiveTargetId = link.getAttribute("data-plink");
            const archiveTargetContainer = document.getElementById(archiveTargetId);
            if (archiveTargetContainer) {
                archiveTargetContainer.style.display = "flex";
            }

            archiveHeroImg.style.width = '25%'
        });
    });

    // Add click event listeners to back buttons
    archiveBackBtns.forEach((backBtn) => {
        backBtn.addEventListener("click", function () {
            // Hide all content containers
            archiveContentContainers.forEach(container => {
                container.style.display = "none";
            });

            // Show the menu container
            const archiveMenuContainer = document.querySelector(".archive-container-active");
            if (archiveMenuContainer) {
                archiveMenuContainer.style.display = "flex";
            }

            archiveHeroImg.style.width = '35%'
        });
    });
});
