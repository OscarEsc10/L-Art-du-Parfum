document.addEventListener('DOMContentLoaded', () => {
    // Efecto dinámico en el botón "SEGUIR COMPRANDO"
    const btn = document.querySelector('.button');
    if (btn) {
        btn.addEventListener('mousemove', e => {
            const percent = (e.offsetX / btn.offsetWidth) * 100;
            btn.style.background = `linear-gradient(90deg, #ff7f2a ${percent}%, #262626 100%)`;
            btn.style.transform = 'scale(1.04)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = '#262626';
            btn.style.transform = 'scale(1)';
        });
        btn.addEventListener('mousedown', () => {
            btn.style.boxShadow = '0 2px 16px #ff7f2a55';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.boxShadow = 'none';
        });
    }

    // Animación de entrada para el panel de la cesta
    const cart = document.querySelector('.empty-cart');
    if (cart) {
        cart.style.opacity = 0;
        cart.style.transform = 'translateY(40px)';
        setTimeout(() => {
            cart.style.transition = 'opacity 0.8s, transform 0.8s';
            cart.style.opacity = 1;
            cart.style.transform = 'translateY(0)';
        }, 200);
    }

    // Efecto dinámico en la barra de progreso
    const progressSpans = document.querySelectorAll('.progress span');
    progressSpans.forEach((span, idx) => {
        span.addEventListener('mouseenter', () => {
            span.style.color = '#ff7f2a';
            span.style.textShadow = '0 2px 8px #ff7f2a88';
        });
        span.addEventListener('mouseleave', () => {
            span.style.color = '';
            span.style.textShadow = '';
        });
        span.addEventListener('click', () => {
            progressSpans.forEach(s => s.style.fontWeight = '');
            span.style.fontWeight = 'bold';
        });
    });

    // Efecto de resplandor en los features
    document.querySelectorAll('.features div').forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            feature.style.boxShadow = '0 2px 16px #ff7f2a55';
            feature.style.background = '#3a2410';
            feature.style.transform = 'scale(1.05)';
        });
        feature.addEventListener('mouseleave', () => {
            feature.style.boxShadow = '';
            feature.style.background = '';
            feature.style.transform = '';
        });
    });
}); 