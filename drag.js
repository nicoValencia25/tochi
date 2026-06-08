// drag.js - Lógica Universal (Mouse y Táctil) para las Polaroids

document.addEventListener('DOMContentLoaded', () => {
    const polaroids = document.querySelectorAll('.polaroid');
    const escritorio = document.getElementById('escritorio');
    
    // Variable para controlar cuál Polaroid está más arriba (z-index)
    let highestZ = 10;

    // Objeto para guardar el estado del arrastre actual
    let activeDrag = null;

    polaroids.forEach(polaroid => {
        // Al hacer clic o tocar (mousedown / touchstart)
        const onStart = (e) => {
            e.preventDefault(); // Previene scrolls y comportamientos raros

            // Sincronizamos eventos de Mouse y Táctil para obtener coordenadas
            const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

            // Obtenemos la posición actual de la Polaroid
            const rect = polaroid.getBoundingClientRect();

            activeDrag = {
                target: polaroid,
                // Calculamos el desfase (offset) para no "clavar" el puntero en la esquina
                offsetX: clientX - rect.left,
                offsetY: clientY - rect.top,
                initialRotation: polaroid.style.transform // Guardamos la rotación original
            };

            // Ponemos esta Polaroid arriba de todo y le damos clase de arrastre
            highestZ++;
            polaroid.style.zIndex = highestZ;
            polaroid.classList.add('dragging');
        };

        // Al mover (mousemove / touchmove)
        const onMove = (e) => {
            if (!activeDrag || activeDrag.target !== polaroid) return;

            const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

            // Calculamos la nueva posición (restando el offset inicial)
            const x = clientX - activeDrag.offsetX;
            const y = clientY - activeDrag.offsetY;

            // Aplicamos la posición directamente en style (top/left)
            // Manteniendo la rotación original
            polaroid.style.left = `${x}px`;
            polaroid.style.top = `${y}px`;
        };

        // Al soltar (mouseup / touchend)
        const onEnd = (e) => {
            if (!activeDrag || activeDrag.target !== polaroid) return;

            polaroid.classList.remove('dragging');
            activeDrag = null; // Limpiamos el estado
        };

        // REGISTRO DE EVENTOS (Ambos mundos)
        
        // Ratón
        polaroid.addEventListener('mousedown', onStart);
        window.addEventListener('mousemove', onMove); // Movemos en Window para no perder el foco si vas rápido
        window.addEventListener('mouseup', onEnd);

        // Táctil (Móvil)
        polaroid.addEventListener('touchstart', onStart, { passive: false });
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onEnd);
    });
});