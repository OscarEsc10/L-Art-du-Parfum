document.addEventListener('DOMContentLoaded', () => {
    const fragranceItems = document.querySelectorAll('.fragrance-item');
    const mainContent = document.querySelector('.main-content');
    const backgroundVideo = document.getElementById('background-video');
    const searchInput = document.querySelector('.search-input');
    
    // Estilos dinámicos iniciales
    mainContent.style.transition = 'transform 0.5s ease-out';
    mainContent.style.transform = 'translateY(20px)';
    
    // Función para filtrar elementos
    const filterItems = (searchTerm) => {
        const normalizedSearch = searchTerm.toLowerCase().trim();
        
        fragranceItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const isVisible = title.includes(normalizedSearch) || description.includes(normalizedSearch);
            
            // Aplicar animación de fade
            if (isVisible) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1) translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9) translateY(30px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    };

    // Evento de búsqueda
    searchInput.addEventListener('input', (e) => {
        filterItems(e.target.value);
    });

    // Efecto de aparición suave para los elementos
    fragranceItems.forEach((item, index) => {
        // Estilos iniciales
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9) translateY(30px)';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Aplicar estilos dinámicos
        item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateY(0)';
        }, index * 200);
    });

    // Efecto de movimiento suave al scroll
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Efecto parallax suave para el contenido principal
                mainContent.style.transform = `translateY(${lastScrollY * 0.1}px)`;
                
                // Efecto para los elementos individuales
                fragranceItems.forEach(item => {
                    if (item.style.display !== 'none') {
                        const rect = item.getBoundingClientRect();
                        const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
                        
                        if (isVisible) {
                            const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                            const scale = 1 + (scrollPercent * 0.05);
                            const rotate = (scrollPercent - 0.5) * 2; // Rotación suave
                            
                            item.style.transform = `
                                scale(${scale})
                                rotate(${rotate}deg)
                                translateY(${scrollPercent * -20}px)
                            `;
                        }
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // Manejo del video de fondo
    fragranceItems.forEach(item => {
        const videoSrc = item.getAttribute('data-video');
        
        item.addEventListener('mouseenter', () => {
            // Efecto de elevación al hover
            item.style.transform = 'translateY(-10px) scale(1.02)';
            item.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            
            // Cambiar el video de fondo
            if (videoSrc) {
                backgroundVideo.querySelector('source').src = videoSrc;
                backgroundVideo.load();
                backgroundVideo.play().catch(error => {
                    console.error('Error al reproducir el video:', error);
                });
                backgroundVideo.classList.add('active');
            }
        });
        
        item.addEventListener('mouseleave', () => {
            // Restaurar posición original
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            
            // Detener y ocultar el video
            backgroundVideo.pause();
            backgroundVideo.classList.remove('active');
        });
    });

    // Efecto mejorado al hacer clic en "Ver detalles"
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const item = btn.closest('.fragrance-item');
            
            // Efecto de "pulse" mejorado
            item.style.transform = 'scale(0.95) translateY(5px)';
            item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            
            setTimeout(() => {
                item.style.transform = 'scale(1) translateY(0)';
                item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            }, 200);
        });
    });

    // Efecto de carga inicial
    setTimeout(() => {
        mainContent.style.transform = 'translateY(0)';
    }, 100);
}); 