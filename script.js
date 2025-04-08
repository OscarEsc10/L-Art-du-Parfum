document.addEventListener('DOMContentLoaded', () => {
    const productSections = document.querySelectorAll('.product-section');
    const heroImages = document.querySelectorAll('.hero-image');
    const primaryImage = document.querySelector('.hero-image.primary');

    productSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            const sectionType = section.getAttribute('data-section');
            
            // Ocultar todas las imágenes
            heroImages.forEach(img => {
                img.style.opacity = '0';
                img.style.zIndex = '0';
            });

            // Mostrar la imagen correspondiente
            const targetImage = document.querySelector(`.hero-image[data-section="${sectionType}"]`);
            if (targetImage) {
                targetImage.style.opacity = '1';
                targetImage.style.zIndex = '1';
            }
        });

        section.addEventListener('mouseleave', () => {
            // Restaurar la imagen principal
            heroImages.forEach(img => {
                img.style.opacity = '0';
                img.style.zIndex = '0';
            });
            primaryImage.style.opacity = '1';
            primaryImage.style.zIndex = '1';
        });
    });
}); 