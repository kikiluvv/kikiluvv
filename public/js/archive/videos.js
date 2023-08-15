

const videoPaths = [
    {
        path: "/assets/archive/gallery/null.webp",
        description: "New"
    },
    {
        path: "/assets/archive/gallery/null.png",
        description: "Videos"
    },
    {
        path: "/assets/archive/gallery/null.png",
        description: "Coming"
    },
    {
        path: "/assets/archive/gallery/null.png",
        description: "Soon"
    }
    // Add more image paths and descriptions as needed
];

let currentVideoIndex = 0;
const galleryVideo = document.getElementById('gallery-video');
const galleryVideoP = document.getElementById('gallery-video-p');

function changeVideo(direction) {
    currentVideoIndex = (currentVideoIndex + direction + videoPaths.length) % videoPaths.length;
    const currentVideo = videoPaths[currentVideoIndex];
    galleryVideo.src = currentVideo.path;
    galleryVideoP.innerHTML = currentVideo.description;
}

// Initial load
changeVideo(0); // Load the first image and description
