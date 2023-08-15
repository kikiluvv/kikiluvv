

const imagePaths = [
    {
        path: "/assets/archive/gallery/heart.png",
        description: "New"
    },
    {
        path: "/assets/archive/gallery/heart.png",
        description: "Artwork"
    },
    {
        path: "/assets/archive/gallery/heart.png",
        description: "Coming"
    },
    {
        path: "/assets/archive/gallery/heart.png",
        description: "soon"
    }
    // Add more image paths and descriptions as needed
];

let currentImageIndex = 0;
const galleryImage = document.getElementById('gallery-image');
const galleryImageP = document.getElementById('gallery-image-p');

function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + imagePaths.length) % imagePaths.length;
    const currentImage = imagePaths[currentImageIndex];
    galleryImage.src = currentImage.path;
    galleryImageP.innerHTML = currentImage.description;
}

// Initial load
changeImage(0); // Load the first image and description
