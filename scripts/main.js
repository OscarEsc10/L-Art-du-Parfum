// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Animaciones y efectos visuales
    const productSections = document.querySelectorAll('.product-section');
    
    // Mejorar las animaciones de los elementos
    window.addEventListener('scroll', function() {
        productSections.forEach(section => {
            if (isElementInViewport(section)) {
                section.style.opacity = '1';
            }
        });
    });
    
    // Funcionalidad del buscador
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('focus', function() {
        this.placeholder = '';
    });
    
    searchInput.addEventListener('blur', function() {
        this.placeholder = 'Search for products, scents, samples';
    });
    
    // Simulación de carrito
    const cartIcon = document.querySelector('.fa-shopping-bag');
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        alert('El carrito está vacío. ¡Añade algunos productos primero!');
    });
    
    // Hover en botones de productos
    const viewMoreBtns = document.querySelectorAll('.view-more-btn');
    viewMoreBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.textContent = 'Descubrir';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.textContent = 'View more';
        });
    });
    
    // Función de ayuda para detectar si un elemento está en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Mensaje de Windows
    const windowsMsg = document.querySelector('.windows-activation');
    if (windowsMsg) {
        setTimeout(() => {
            windowsMsg.style.opacity = '0';
            setTimeout(() => {
                windowsMsg.style.display = 'none';
            }, 1000);
        }, 5000);
    }

    
    let cambio = document.getElementById("img")
    
    imagen.addEventListener("mouseover", () => {
        imagen.src = "./Images/fondo2.jpg"
    
    imagen.addEventListener("mouseout", () => {
        imagen.src = "./Images/fondo.jpg"
    })
    })
}); 

