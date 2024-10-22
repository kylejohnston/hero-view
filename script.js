const imageUpload = document.getElementById('imageUpload');
const ratio1 = document.getElementById('ratio1');
const ratio2 = document.getElementById('ratio2');
const clearButton = document.getElementById('clearButton');

// Load image from localStorage on page refresh
window.addEventListener('load', () => {
    const savedImage = localStorage.getItem('uploadedImage');
    if (savedImage) {
        displayImages(savedImage);
    }
});

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        displayImages(e.target.result);
    };

    reader.readAsDataURL(file);
});

clearButton.addEventListener('click', () => {
    localStorage.removeItem('uploadedImage');
    ratio1.style.backgroundImage = 'none';
    ratio2.style.backgroundImage = 'none';
});

function displayImages(imageSrc) {
    const maxWidth = 1200; // You can adjust this value as needed

    const img = new Image();
    img.onload = () => {
        let newWidth = img.width;
        let newHeight = img.height;

        if (newWidth > maxWidth) {
            newHeight *= maxWidth / newWidth;
            newWidth = maxWidth;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        const resizedImageSrc = canvas.toDataURL();

        localStorage.setItem('uploadedImage', resizedImageSrc); // Store resized image

        // Set background image for ratio1
        ratio1.style.backgroundImage = `url(${resizedImageSrc})`;
        ratio1.style.backgroundSize = 'cover';

        // Set background image for ratio2
        ratio2.style.backgroundImage = `url(${resizedImageSrc})`;
        ratio2.style.backgroundSize = 'cover';
    };
    img.src = imageSrc;
}