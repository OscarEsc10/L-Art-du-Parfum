document.addEventListener('DOMContentLoaded', () => {
    // Filtros y ordenamiento
    const genderFilter = document.getElementById('filter-gender');
    const priceFilter = document.getElementById('filter-price');
    const grid = document.querySelector('.fragrance-grid');
    let items = Array.from(document.querySelectorAll('.fragrance-item'));
    const cart = document.querySelector('.header-icons .fa-shopping-bag');
    let cartCount = 0;

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
                    item.style.order = filtered.indexOf(item); // Mantener el orden visual
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
          // O mostrar toast/mensaje
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
}); 