// Funcionalidad para expandir las cartas en la misma página
const cabeceras = document.querySelectorAll('.carta-cabecera');

cabeceras.forEach(cabecera => {
    cabecera.addEventListener('click', () => {
        const itemActual = cabecera.parentElement;
        
        // Cierra todas las otras cartas cuando abrís una
        document.querySelectorAll('.carta-item').forEach(item => {
            if(item !== itemActual) {
                item.classList.remove('activa');
            }
        });

        // Abre o cierra la carta que tocaste
        itemActual.classList.toggle('activa');
    });
});

// Lógica del contador de días
const fechaInicio = new Date(2025, 11, 12); // Año, Mes (Mayo es 4), Día

function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaInicio;
    const diasTotales = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    
    const contadorElemento = document.getElementById('contador');
    if(contadorElemento) {
        contadorElemento.innerHTML = diasTotales + " días eligiéndonos todos los días.";
    }
}

actualizarContador();
setInterval(actualizarContador, 60000);