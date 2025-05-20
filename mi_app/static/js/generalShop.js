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
    

    // Manejo del carrito
    document.querySelectorAll('.view-details').forEach(btn => {
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


