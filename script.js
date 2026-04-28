document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LÓGICA DE LAS CARTAS (ACORDEÓN)
    const cabeceras = document.querySelectorAll('.carta-cabecera');
    cabeceras.forEach(cabecera => {
        cabecera.addEventListener('click', () => {
            const itemActual = cabecera.parentElement;
            document.querySelectorAll('.carta-item').forEach(item => {
                if(item !== itemActual) {
                    item.classList.remove('activa');
                }
            });
            itemActual.classList.toggle('activa');
        });
    });

    // 2. LÓGICA DEL CONTADOR Y EXPLOSIÓN
    const fechaInicio = new Date(2025, 11, 12); // Año, Mes (Mayo es 4), Día
    const contadorElemento = document.getElementById('contador');

    function actualizarContador() {
        const ahora = new Date();
        const diferencia = ahora - fechaInicio;
        const diasTotales = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        
        if(contadorElemento) {
            contadorElemento.innerHTML = diasTotales + " días eligiéndonos y amándonos siempre.";
        }
    }
    actualizarContador();
    setInterval(actualizarContador, 60000);

    // Acá está el evento del clic para la EXPLOSIÓN
    if (contadorElemento) {
        contadorElemento.addEventListener('click', () => {
            // Dispara 60 mariposas aleatoriamente de golpe al tocar los días
            for (let i = 0; i < 60; i++) {
                setTimeout(crearMariposa, Math.random() * 800);
            }
        });
    }

    // 3. LÓGICA DE LAS MARIPOSAS
    function crearMariposa() {
        const mariposa = document.createElement('div');
        mariposa.classList.add('mariposa');
        mariposa.innerHTML = '🦋';
        
        // Posición y tamaño aleatorio
        mariposa.style.left = Math.random() * 100 + 'vw';
        const duracion = Math.random() * 7 + 8; // Vuelo lento y sutil entre 8 y 15 seg
        mariposa.style.animationDuration = duracion + 's';
        
        const tamano = Math.random() * 2 + 1; // Tamaño entre 1 y 3 rem
        mariposa.style.fontSize = tamano + 'rem';
        
        document.body.appendChild(mariposa);
        
        // Se elimina cuando termina para no trabar el celular
        setTimeout(() => {
            mariposa.remove();
        }, duracion * 1000);
    }

    // Explosión inicial suave (solo 5 mariposas para dar la bienvenida)
    for (let i = 0; i < 5; i++) {
        setTimeout(crearMariposa, Math.random() * 2000);
    }

    // Lluvia constante de fondo mucho más relajada (1 mariposa nueva cada 2.5 segundos)
    setInterval(crearMariposa, 2500);

});