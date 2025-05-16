document.addEventListener('DOMContentLoaded', () => {
    // Filtros y ordenamiento
    const genderFilter = document.getElementById('filter-gender');
    const priceFilter = document.getElementById('filter-price');
    const grid = document.querySelector('.fragrance-grid');
    let items = Array.from(document.querySelectorAll('.fragrance-item'));
    const cart = document.querySelector('.header-icons .fa-shopping-bag');
    let cartCount = 0;

    // Manejo de videos
    items.forEach(item => {
        const video = item.querySelector('.fragrance-video');
        if (video) {
            // Precargar el video
            video.load();
            
            // Manejar el hover
            item.addEventListener('mouseenter', () => {
                video.play().catch(error => {
                    console.error('Error al reproducir el video:', error);
                });
            });
            
            item.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });

    function renderItems(filteredItems) {
        grid.innerHTML = '';
        filteredItems.forEach(item => grid.appendChild(item));
    }

    function applyFilters() {
        try {
            const gender = genderFilter.value;
            const priceOrder = priceFilter.value;
    
            // Filtros
            let filtered = items;
            if (gender !== 'all') {
                filtered = filtered.filter(item => item.getAttribute('data-gender') === gender);
            }
    
            // Ordenamiento
            if (priceOrder === 'asc') {
                filtered = filtered.slice().sort((a, b) => +a.getAttribute('data-price') - +b.getAttribute('data-price'));
            } else if (priceOrder === 'desc') {
                filtered = filtered.slice().sort((a, b) => +b.getAttribute('data-price') - +a.getAttribute('data-price'));
            }
    
            // Animación: ocultar y mostrar suavemente
            items.forEach(item => {
                if (filtered.includes(item)) {
                    item.classList.remove('hide');
                    item.style.order = filtered.indexOf(item);
                } else {
                    item.classList.add('hide');
                }
            });
    
        } catch (error) {
            console.error('Error al aplicar filtros:', error);
        }
    }

    genderFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);

    // Inicializar
    if (items.length > 0) {
        applyFilters();
    } else {
        console.warn('No se encontraron elementos para mostrar.');
    }

    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', () => {
          cartCount++;
          cart.setAttribute('data-count', cartCount);
        });
    });

    // Efecto dinámico en los botones de detalles
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.background = 'var(--accent-color)';
            btn.style.color = 'var(--background-color)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = '';
            btn.style.color = '';
        });

        btn.addEventListener('click', (e) => {
            const item = e.target.closest('.fragrance-item');
            const clone = item.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.zIndex = '1000';
            document.body.appendChild(clone);

            const rect = item.getBoundingClientRect();
            clone.style.left = `${rect.left}px`;
            clone.style.top = `${rect.top}px`;

            const cartRect = cart.getBoundingClientRect();
            clone.style.transition = 'all 0.5s ease-in-out';
            clone.style.transform = `translate(${cartRect.left - rect.left}px, ${cartRect.top - rect.top}px) scale(0.1)`;

            clone.addEventListener('transitionend', () => {
                clone.remove();
                cartCount++;
                cart.setAttribute('data-count', cartCount);
            });
        });
    });

    // Ajustar la cuadrícula para mostrar 5 elementos por fila
    grid.style.gridTemplateColumns = 'repeat(5, 1fr)';
    grid.style.maxHeight = 'calc(100vh - 220px)'; // Limitar al footer

    // Agregar el efecto de rompecabezas cuando se cargan las imágenes
    window.addEventListener('load', () => {
        createPuzzleEffect();
    });
});

// Animación de rompecabezas para los filtros
window.addEventListener('load', () => {
    const filters = document.querySelector('.shop-filters');
    filters.style.opacity = '0';
    setTimeout(() => {
        filters.style.transition = 'opacity 1s ease-out';
        filters.style.opacity = '1';
    }, 500);
});

// Función para crear el efecto de rompecabezas
function createPuzzleEffect() {
    const fragranceItems = document.querySelectorAll('.fragrance-item');
    
    fragranceItems.forEach(item => {
        const img = item.querySelector('img');
        const originalSrc = img.src;
        
        // Crear el canvas para el rompecabezas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const tempImg = new Image();
        
        tempImg.onload = function() {
            // Configurar el tamaño del canvas
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Dividir la imagen en piezas
            const pieces = 4; // Número de piezas en cada dirección
            const pieceWidth = canvas.width / pieces;
            const pieceHeight = canvas.height / pieces;
            
            // Array para almacenar las piezas
            const puzzlePieces = [];
            
            // Crear las piezas
            for(let y = 0; y < pieces; y++) {
                for(let x = 0; x < pieces; x++) {
                    const piece = {
                        x: x * pieceWidth,
                        y: y * pieceHeight,
                        width: pieceWidth,
                        height: pieceHeight,
                        offsetX: (Math.random() - 0.5) * 50,
                        offsetY: (Math.random() - 0.5) * 50,
                        rotation: (Math.random() - 0.5) * 0.5
                    };
                    puzzlePieces.push(piece);
                }
            }
            
            // Función para dibujar el rompecabezas
            function drawPuzzle() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                puzzlePieces.forEach(piece => {
                    ctx.save();
                    ctx.translate(piece.x + piece.width/2 + piece.offsetX, 
                                piece.y + piece.height/2 + piece.offsetY);
                    ctx.rotate(piece.rotation);
                    ctx.drawImage(tempImg, 
                                piece.x, piece.y, piece.width, piece.height,
                                -piece.width/2, -piece.height/2, piece.width, piece.height);
                    ctx.restore();
                });
            }
            
            // Reemplazar la imagen original con el canvas
            img.style.display = 'none';
            item.insertBefore(canvas, img);
            
            // Animar las piezas
            let animationFrame;
            let startTime = null;
            
            function animate(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                
                puzzlePieces.forEach(piece => {
                    piece.offsetX *= 0.95;
                    piece.offsetY *= 0.95;
                    piece.rotation *= 0.95;
                });
                
                drawPuzzle();
                
                if (progress < 2000) { // 2 segundos de animación
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    // Restaurar la imagen original
                    canvas.remove();
                    img.style.display = 'block';
                }
            }
            
            // Iniciar la animación
            animationFrame = requestAnimationFrame(animate);
        };
        
        tempImg.src = originalSrc;
    });
} 