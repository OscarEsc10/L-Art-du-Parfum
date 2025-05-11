document.addEventListener('DOMContentLoaded', () => {
    // Filtros y ordenamiento
    const genderFilter = document.getElementById('filter-gender');
    const priceFilter = document.getElementById('filter-price');
    const grid = document.querySelector('.fragrance-grid');
    let items = Array.from(document.querySelectorAll('.fragrance-item'));

    function renderItems(filteredItems) {
        grid.innerHTML = '';
        filteredItems.forEach(item => grid.appendChild(item));
    }

    function applyFilters() {
        let filtered = items;
        const gender = genderFilter.value;
        const priceOrder = priceFilter.value;

        if (gender !== 'all') {
            filtered = filtered.filter(item => item.getAttribute('data-gender') === gender);
        }
        if (priceOrder === 'asc') {
            filtered = filtered.slice().sort((a, b) => +a.getAttribute('data-price') - +b.getAttribute('data-price'));
        } else if (priceOrder === 'desc') {
            filtered = filtered.slice().sort((a, b) => +b.getAttribute('data-price') - +a.getAttribute('data-price'));
        }
        renderItems(filtered);
    }

    genderFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);

    // Inicializar
    applyFilters();

    // Efecto dinámico en los botones de detalles
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.background = '#ff7f2a';
            btn.style.color = '#181818';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = '';
            btn.style.color = '';
        });
    });
}); 