document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector('.social-sidebar');
    const toggle = document.querySelector('.social-toggle');
    let hasShown = false;
    let isHovered = false;

    // Función para mostrar el sidebar
    function showSidebar() {
        if (!sidebar.classList.contains('show')) {
            sidebar.classList.add('show');
            hasShown = true;
        }
    }

    // Función para ocultar el sidebar
    function hideSidebar() {
        if (!isHovered) {
            sidebar.classList.remove('show');
        }
    }

    // Mostrar automáticamente después de 3 segundos
    setTimeout(() => {
        if (!hasShown) {
            showSidebar();
        }
    }, 3000);

    // Manejar el clic en el toggle
    toggle.addEventListener('click', () => {
        if (sidebar.classList.contains('show')) {
            hideSidebar();
        } else {
            showSidebar();
        }
    });

    // Manejar el hover en el sidebar
    sidebar.addEventListener('mouseenter', () => {
        isHovered = true;
        showSidebar();
    });

    sidebar.addEventListener('mouseleave', () => {
        isHovered = false;
        setTimeout(() => {
            if (!isHovered) {
                hideSidebar();
            }
        }, 500);
    });

    // Asegurar que los iconos estén visibles y animados
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        // Aplicar opacidad y transformación inicial
        icon.style.opacity = '1';
        icon.style.transform = 'translateX(0)';
        
        // Agregar efecto de aparición escalonada
        icon.style.transitionDelay = `${index * 0.1}s`;
        
        // Agregar efecto hover
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateX(-5px) scale(1.1)';
            icon.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateX(0)';
            icon.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });
});