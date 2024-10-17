const imageUpload = document.getElementById('imageUpload');
const ratio1 = document.getElementById('ratio1');
const ratio2 = document.getElementById('ratio2');

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
        localStorage.setItem('uploadedImage', e.target.result);
        displayImages(e.target.result);
    };

    reader.readAsDataURL(file);
});

function displayImages(imageSrc) {
    // Set background image for ratio1
    ratio1.style.backgroundImage = `url(${imageSrc})`;
    ratio1.style.backgroundSize = 'cover';

    // Set background image for ratio2
    ratio2.style.backgroundImage = `url(${imageSrc})`;
    ratio2.style.backgroundSize = 'cover';
}