const textElement = document.getElementById('text');
const cursorElement = document.querySelector('.cursor');

const textToType = "Welcome to kikiluvv.com";
const typingDelay = 50; // Adjust the delay for typing each character
const startDelay = 800; // Delay before typing animation starts

let charIndex = 0;

function startTypingAnimation() {
    setTimeout(typeCharacter, startDelay);
}

function typeCharacter() {
    if (charIndex < textToType.length) {
        textElement.textContent += textToType[charIndex];
        charIndex++;
        setTimeout(typeCharacter, typingDelay);
    } else {
        cursorElement.style.display = 'none'; // Hide the cursor when typing animation is complete
    }
}

setTimeout(startTypingAnimation, startDelay);



setTimeout(function () {
    const cursorElement2 = document.querySelector('.cursor2');
    cursorElement2.style.display = 'inline';
}, 3000);

setTimeout(function() {
    const textElement2 = document.getElementById('text2');
    const cursorElement2 = document.querySelector('.cursor2');

    const textToType2 = "I am a web designer and producer from Seattle.";
    const typingDelay2 = 50; // Adjust the delay for typing each character
    const startDelay2 = 300; // Delay before typing animation starts

    let charIndex2 = 0;
    
    function startTypingAnimation2() {
        setTimeout(typeCharacter2, startDelay2);
    }
    
    function typeCharacter2() {
        if (charIndex2 < textToType2.length) {
            textElement2.textContent += textToType2[charIndex2];
            charIndex2++;
            setTimeout(typeCharacter2, typingDelay2);
        } else {
            cursorElement2.style.display = 'none'; // Hide the cursor when typing animation is complete
        }
    }

    setTimeout(startTypingAnimation2, startDelay2);
}, 3500); // Set a timeout of 3000 milliseconds (3 seconds)



setTimeout(function () {
    const cursorElement3 = document.querySelector('.cursor3');
    cursorElement3.style.display = 'inline';
}, 6500);

setTimeout(function() {
    const textElement3 = document.getElementById('text3');
    const cursorElement3 = document.querySelector('.cursor3');

    const textToType3 = "Navigate through my work by changing the video input.";
    const typingDelay3 = 50; // Adjust the delay for typing each character
    const startDelay3 = 300; // Delay before typing animation starts

    let charIndex3 = 0;
    
    function startTypingAnimation3() {
        setTimeout(typeCharacter3, startDelay3);
    }
    
    function typeCharacter3() {
        if (charIndex3 < textToType3.length) {
            textElement3.textContent += textToType3[charIndex3];
            charIndex3++;
            setTimeout(typeCharacter3, typingDelay3);
        } else {
            cursorElement3.style.display = 'none'; // Hide the cursor when typing animation is complete
        }
    }

    setTimeout(startTypingAnimation3, startDelay3);
}, 6700); // Set a timeout of 3000 milliseconds (3 seconds)


setTimeout(function () {
    const cursorElement4 = document.querySelector('.cursor4');
    cursorElement4.style.display = 'inline';
}, 10200);

setTimeout(function() {
    const textElement4 = document.getElementById('text4');
    const cursorElement4 = document.querySelector('.cursor4');

    const textToType4 = "Thank you for visiting.";
    const typingDelay4 = 50; // Adjust the delay for typing each character
    const cursorDelay4 = 500; // Delay before cursor starts blinking
    const startDelay4 = 300; // Delay before typing animation starts

    let charIndex4 = 0;

    function startTypingAnimation4() {
        setTimeout(typeCharacter4, startDelay4);
    }

    function typeCharacter4() {
        if (charIndex4 < textToType4.length) {
            textElement4.textContent += textToType4[charIndex4];
            charIndex4++;
            setTimeout(typeCharacter4, typingDelay4);
        } else {
            setTimeout(blinkCursor4, cursorDelay4);
        }
    }

    function blinkCursor4() {
        cursorElement4.style.display = 'none';
        setInterval(toggleCursor4, cursorDelay4);
    }

    function toggleCursor4() {
        cursorElement4.style.display = cursorElement4.style.display === 'none' ? 'inline' : 'none';
    }

    setTimeout(startTypingAnimation4, startDelay4);
}, 10400); // Set a timeout of 3000 milliseconds (3 seconds)
