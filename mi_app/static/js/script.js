document.addEventListener('DOMContentLoaded', () => {
    // Prevenir cualquier tipo de scroll
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    
    // Prevenir el scroll con la rueda del mouse
    document.addEventListener('wheel', (e) => {
        e.preventDefault();
    }, { passive: false });

    // Prevenir el scroll táctil en dispositivos móviles
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });

    // Manejo de las secciones de productos y imágenes de fondo
    const productSections = document.querySelectorAll('.product-section');
    const heroImages = document.querySelectorAll('.hero-image');
    const primaryImage = document.querySelector('.hero-image.primary');
    const mainContent = document.querySelector('.main-content');
    const backgroundVideo = document.getElementById('background-video');
    const backgroundImage = document.getElementById('background-image');
    const hoverImages = document.querySelectorAll('.imagen-hover');
    const video1 = document.getElementById('background-video-1');
    const video2 = document.getElementById('background-video-2');
    const fragranceItems = document.querySelectorAll('.fragrance-item');

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

    // Manejar efecto hover para video e imagen de fondo
    if (backgroundVideo && backgroundImage && hoverImages.length > 0) {
        let videoTimer;
        let imageTimer;
        let currentHoveredImage = null;
        
        hoverImages.forEach(img => {
            img.addEventListener('mouseenter', () => {
                clearTimeout(videoTimer);
                clearTimeout(imageTimer);
                currentHoveredImage = img;
                
                // Obtener la URL del video y la imagen del atributo data
                const videoUrl = img.closest('.fragrance-item').getAttribute('data-video');
                const backgroundUrl = img.getAttribute('data-background');
                
                if (videoUrl && backgroundVideo.querySelector('source')) {
                    backgroundVideo.querySelector('source').src = videoUrl;
                    backgroundVideo.load();
                    backgroundVideo.style.opacity = '1';
                    backgroundVideo.currentTime = 0;
                    backgroundVideo.play().catch(error => {
                        console.log('Error al reproducir el video:', error);
                    });
                }
                
                if (backgroundUrl) {
                    backgroundImage.style.backgroundImage = `url('${backgroundUrl}')`;
                    backgroundImage.style.opacity = '1';
                }
            });
            
            img.addEventListener('mouseleave', () => {
                if (currentHoveredImage === img) {
                    currentHoveredImage = null;
                    videoTimer = setTimeout(() => {
                        backgroundVideo.style.opacity = '0';
                        setTimeout(() => {
                            backgroundVideo.pause();
                        }, 500);
                    }, 300);
                    
                    imageTimer = setTimeout(() => {
                        backgroundImage.style.opacity = '0';
                    }, 300);
                }
            });
        });
    }

    fragranceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const videoUrl = item.getAttribute('data-video');
            const imageUrl = item.querySelector('img').getAttribute('data-background');

            if (videoUrl && backgroundVideo.querySelector('source')) {
                backgroundVideo.querySelector('source').src = videoUrl;
                backgroundVideo.load();
                backgroundVideo.style.opacity = '1';
                backgroundVideo.currentTime = 0;
                backgroundVideo.play().catch(error => {
                    console.log('Error al reproducir el video:', error);
                });
            }

            if (imageUrl) {
                backgroundImage.style.backgroundImage = `url('${imageUrl}')`;
                backgroundImage.style.opacity = '1';
            }
        });

        item.addEventListener('mouseleave', () => {
            backgroundVideo.style.opacity = '0';
            backgroundVideo.pause();
            backgroundImage.style.opacity = '0';
        });
    });

    // Manejo de la línea de tiempo
    const timelineSections = document.querySelectorAll('.timeline-section');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    const floatingSocial = document.querySelector('.floating-social');
    const socialHeader = document.querySelector('.social-header');
    let currentSection = 0;

    // Función para mostrar una sección específica
    function showSection(index) {
        timelineSections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
                dots[i].classList.add('active');
            } else {
                section.classList.remove('active');
                dots[i].classList.remove('active');
            }
        });
    }

    // Inicializar la primera sección
    showSection(currentSection);

    // Manejar la navegación con botones
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            currentSection = Math.max(0, currentSection - 1);
            showSection(currentSection);
        });

        nextButton.addEventListener('click', () => {
            currentSection = Math.min(timelineSections.length - 1, currentSection + 1);
            showSection(currentSection);
        });
    }

    // Manejar la navegación con dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSection = index;
            showSection(currentSection);
        });
    });

    // Manejar el hover en el menú About Us
    if (aboutLink && floatingSocial) {
        aboutLink.addEventListener('mouseenter', () => {
            floatingSocial.style.transform = 'translateY(-50%) translateX(0)';
        });

        floatingSocial.addEventListener('mouseleave', () => {
            floatingSocial.style.transform = 'translateY(-50%) translateX(100%)';
        });
    }

    // Manejar el clic en el encabezado de redes sociales
    if (socialHeader) {
        socialHeader.addEventListener('click', () => {
            const isExpanded = floatingSocial.classList.contains('expanded');
            if (isExpanded) {
                floatingSocial.classList.remove('expanded');
                socialHeader.querySelector('i').style.transform = 'rotate(0deg)';
            } else {
                floatingSocial.classList.add('expanded');
                socialHeader.querySelector('i').style.transform = 'rotate(90deg)';
            }
        });
    }

    // Manejar la navegación con teclas
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            currentSection = Math.max(0, currentSection - 1);
            showSection(currentSection);
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            currentSection = Math.min(timelineSections.length - 1, currentSection + 1);
            showSection(currentSection);
        }
    });

    // Animación de los iconos sociales
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        icon.style.transitionDelay = `${index * 0.1}s`;
    });
});

const zona = document.getElementById('zona');
const video = document.getElementById('videoFondo');

zona.addEventListener('mouseenter', () => {
  video.play();
  video.style.opacity = '1';
});

zona.addEventListener('mouseleave', () => {
  video.pause();
  video.style.opacity = '0';
});