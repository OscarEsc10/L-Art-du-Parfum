document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector('.social-sidebar');
    const toggle = document.querySelector('.social-toggle');
    let hasShown = false;

    // Función para mostrar el sidebar
    function showSidebar() {
        sidebar.classList.add('show');
        hasShown = true;
    }

    // Función para ocultar el sidebar
    function hideSidebar() {
        sidebar.classList.remove('show');
    }

    // Mostrar automáticamente después de 5 segundos
    setTimeout(() => {
        if (!hasShown) {
            showSidebar();
        }
    }, 5000);

    // Manejar el clic en el toggle
    toggle.addEventListener('click', () => {
        if (sidebar.classList.contains('show')) {
            hideSidebar();
        } else {
            showSidebar();
        }
    });

    // Asegurar que los iconos estén visibles
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.style.opacity = '1';
        icon.style.transform = 'translateX(0)';
    });
});
