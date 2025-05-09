document.addEventListener('DOMContentLoaded', () => {
    // Ejemplo: mostrar alerta al hacer clic en "View Details"
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Detalles del producto próximamente...');
        });
    });
}); 