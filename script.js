document.addEventListener('DOMContentLoaded', () => {
    // Manejo de las secciones de productos y imágenes de fondo
    const productSections = document.querySelectorAll('.product-section');
    const heroImages = document.querySelectorAll('.hero-image');
    const primaryImage = document.querySelector('.hero-image.primary');
    const mainContent = document.querySelector('.main-content');

    // Agregar transición suave al contenido principal al cargar
    if (mainContent) {
        setTimeout(() => {
            mainContent.classList.add('show');
        }, 100);
    }

    // Agregar CSS para transiciones de página
    const style = document.createElement('style');
    style.textContent = `
        body.page-transition-out {
            overflow: hidden;
        }
        
        .page-transition-out .main-content {
            animation: slideOutToLeft 0.4s ease-out forwards !important;
        }
    `;
    document.head.appendChild(style);

    // Función para manejar transiciones de página
    function handlePageTransition(targetUrl) {
        document.body.classList.add('page-transition-out');
        
        // Redireccionar después de la animación
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 400);
    }

    // Evento para los product-sections con sus imágenes
    if (productSections.length > 0 && heroImages.length > 0) {
        productSections.forEach(section => {
            // Gestionar hover
            section.addEventListener('mouseenter', () => {
                const sectionType = section.getAttribute('data-section');
                
                heroImages.forEach(img => {
                    img.style.opacity = '0';
                    img.style.zIndex = '0';
                });

                const targetImage = document.querySelector(`.hero-image[data-section="${sectionType}"]`);
                if (targetImage) {
                    targetImage.style.opacity = '1';
                    targetImage.style.zIndex = '1';
                }
            });

            section.addEventListener('mouseleave', () => {
                heroImages.forEach(img => {
                    img.style.opacity = '0';
                    img.style.zIndex = '0';
                });
                if (primaryImage) {
                    primaryImage.style.opacity = '1';
                    primaryImage.style.zIndex = '1';
                }
            });

            // Gestionar clic para navegación
            section.addEventListener('click', (e) => {
                const viewMoreBtn = section.querySelector('.view-more-btn');
                if (viewMoreBtn && viewMoreBtn.getAttribute('href')) {
                    e.preventDefault();
                    handlePageTransition(viewMoreBtn.getAttribute('href'));
                }
            });
        });
    }

    // Manejar clics en los enlaces de navegación
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('#')) {
                e.preventDefault();
                handlePageTransition(href);
            }
        });
    });
    
    // Manejar el clic en el logo para volver al inicio
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const currentPath = window.location.pathname;
                const isIndex = currentPath === '/' || 
                              currentPath === '/index.html' || 
                              currentPath.endsWith('/') ||
                              currentPath.endsWith('/index.html');
                
                if (!isIndex) {
                    e.preventDefault();
                    handlePageTransition(href);
                }
            }
        });
    }

    // Manejar clics en todos los botones de view-details en la sección fine-fragrances
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const fragranceItem = this.closest('.fragrance-item');
            const fragranceType = fragranceItem?.getAttribute('data-fragrance');
            
            if (fragranceType) {
                const targetUrl = `${fragranceType}.html`;
                handlePageTransition(targetUrl);
            }
        });
    });
});