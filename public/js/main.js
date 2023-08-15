document.addEventListener('DOMContentLoaded', () => {
    const inputBtn = document.getElementById('input-btn');
    const navList = document.querySelector('.nav-list');
    const navButtons = document.querySelectorAll('.nav-list .nav-btn');
    const transition = document.getElementById('transition-wrapper');

    let isNavOpen = false;
    let activeButton = document.querySelector('.nav-btn.nav-active');

    inputBtn.addEventListener('click', () => {
        isNavOpen = !isNavOpen;
        navList.style.opacity = isNavOpen ? '1' : '0';
        navList.style.height = isNavOpen ? '45vh' : '0';
    });

    navButtons.forEach(button => {
        if (button !== inputBtn) {
            button.addEventListener('click', () => {
                if (activeButton) {
                    activeButton.classList.remove('nav-active');
                    const activeWrapperId = activeButton.getAttribute('data-target');
                    const activeWrapper = document.getElementById(activeWrapperId);
                    const activeOverlayId = activeButton.getAttribute('data-overlay');
                    const activeOverlay = document.getElementById(activeOverlayId);

                    activeWrapper.classList.remove('wrapper-on');
                    activeOverlay.classList.remove('overlay-on');
                }

                button.classList.add('nav-active');
                transition.style.zIndex = '99999';
                transition.classList.add('transition-on');
                navList.style.height = 0;
                navList.style.opacity = 0;

                setTimeout(function () {
                    const targetWrapperId = button.getAttribute('data-target');
                    const targetWrapper = document.getElementById(targetWrapperId);
                    const targetOverlayId = button.getAttribute('data-overlay');
                    const targetOverlay = document.getElementById(targetOverlayId);
                    targetWrapper.classList.add('wrapper-on')
                    targetOverlay.classList.add('overlay-on');
                }, 100)

                setTimeout(function () {
                    transition.classList.remove('transition-on');
                    transition.style.zIndex = '0';
                }, 500)

                activeButton = button;
            });
        }
    });
});




function addGlitchEffect(element) {
    element.classList.add('glitch-stutter', 'glitch-blur');

    setTimeout(() => {
        element.classList.remove('glitch-stutter', 'glitch-blur');
    }, 500);
}

function startGlitchInterval() {
    const elements = document.querySelectorAll('.glitch-element');

    setInterval(() => {
        elements.forEach(element => {
            addGlitchEffect(element);
        });
    }, 5000 + Math.random() * 15000);
}

startGlitchInterval();











