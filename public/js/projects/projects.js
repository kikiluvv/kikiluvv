document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event listener triggered");

    const projectLinks = document.querySelectorAll(".project-menu-link");
    const projectContentContainers = document.querySelectorAll(".project-content-container");
    const projectBackBtns = document.querySelectorAll('.project-menu-back');
    const projectHeroImg = document.getElementById('project-hero');

    // Initialize by showing the first content container and hiding others
    projectContentContainers.forEach((container, index) => {
        if (index === 0) {
            container.style.display = "flex";
        } else {
            container.style.display = "none";
        }
    });

    // Add click event listeners to menu links
    projectLinks.forEach((link, index) => {
        link.addEventListener("click", function () {
            console.log('click')
            // Hide all content containers
            projectContentContainers.forEach(container => {
                container.style.display = "none";
            });

            // Show the corresponding content container
            const projectTargetId = link.getAttribute("data-plink");
            const projectTargetContainer = document.getElementById(projectTargetId);
            if (projectTargetContainer) {
                projectTargetContainer.style.display = "flex";
            }

            projectHeroImg.style.width = '25%'
        });
    });

    // Add click event listeners to back buttons
    projectBackBtns.forEach((backBtn) => {
        backBtn.addEventListener("click", function () {
            // Hide all content containers
            projectContentContainers.forEach(container => {
                container.style.display = "none";
            });

            // Show the menu container
            const projectMenuContainer = document.querySelector(".project-container-active");
            if (projectMenuContainer) {
                projectMenuContainer.style.display = "flex";
            }

            projectHeroImg.style.width = '35%'
        });
    });
});
