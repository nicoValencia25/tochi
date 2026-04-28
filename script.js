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
const fechaInicio = new Date(2025, 11, 11); // Año, Mes (Mayo es 4), Día

function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaInicio;
    const diasTotales = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    
    const contadorElemento = document.getElementById('contador');
    if(contadorElemento) {
        contadorElemento.innerHTML = diasTotales + " días eligiéndonos y amándonos.";
    }
}

actualizarContador();
setInterval(actualizarContador, 60000);

// ==========================================
// CREADOR DE MARIPOSAS (MODO LLUVIA INTENSA)
// ==========================================
function crearMariposa() {
    const mariposa = document.createElement('div');
    mariposa.classList.add('mariposa');
    
    mariposa.innerHTML = '🦋';
    
    // Posición horizontal aleatoria
    mariposa.style.left = Math.random() * 100 + 'vw';
    
    // Duración aleatoria (entre 8 y 15 segundos para que haya distintas velocidades)
    const duracion = Math.random() * 7 + 8;
    mariposa.style.animationDuration = duracion + 's';
    
    // Tamaño aleatorio (entre 1rem y 3rem para más variedad)
    const tamano = Math.random() * 2 + 1; 
    mariposa.style.fontSize = tamano + 'rem';
    
    document.body.appendChild(mariposa);
    
    // Se elimina cuando termina de volar para no saturar la RAM del celu
    setTimeout(() => {
        mariposa.remove();
    }, duracion * 1000);
}

// 1. EXPLOSIÓN INICIAL: Creamos 25 mariposas de golpe apenas entra a la página
// Le ponemos un mini delay aleatorio a cada una para que no salgan exactamente en bloque
for (let i = 0; i < 25; i++) {
    setTimeout(crearMariposa, Math.random() * 3000);
}

// 2. LLUVIA CONSTANTE: Creamos una mariposa nueva cada 350 milisegundos (¡es un montón!)
setInterval(crearMariposa, 350);