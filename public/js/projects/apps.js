document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event listener triggered");

    const projectListLinks = document.querySelectorAll(".project-list-link");
    const projectListContentContainers = document.querySelectorAll(".project-content-container");
    const projectListBackBtns = document.querySelectorAll('.project-list-back');
    const projectListHeroImg = document.getElementById('project-hero');

    // Initialize by showing the first content container and hiding others
    projectListContentContainers.forEach((container, index) => {
        if (index === 0) {
            container.style.display = "flex";
        } else {
            container.style.display = "none";
        }
    });

    // Add click event listeners to menu links
    projectListLinks.forEach((link, index) => {
        link.addEventListener("click", function () {
            console.log('click')
            // Hide all content containers
            projectListContentContainers.forEach(container => {
                container.style.display = "none";
            });

            // Show the corresponding content container
            const projectListTargetId = link.getAttribute("data-plistlink");
            const projectListTargetContainer = document.getElementById(projectListTargetId);
            if (projectListTargetContainer) {
                projectListTargetContainer.style.display = "flex";
            }

            projectListHeroImg.style.width = '25%'
        });
    });

    // Add click event listeners to back buttons
    projectListBackBtns.forEach((backBtn) => {
        backBtn.addEventListener("click", function () {
            // Hide all content containers
            projectListContentContainers.forEach(container => {
                container.style.display = "none";
            });

            // Show the menu container
            const projectListMenuContainer = document.getElementById("apps");
            if (projectListMenuContainer) {
                projectListMenuContainer.style.display = "flex";
            }
        });
    });
});
