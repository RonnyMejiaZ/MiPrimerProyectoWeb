// 1. Constantes del ejercicio
const META_ML = 2000;  // Meta diaria recomendada en mililitros (8 vasos)
const VASO_ML = 250;   // Cantidad de mililitros por cada vaso

// 2. Cargar consumo previo de LocalStorage (si no hay nada, empieza en 0)
let agua = Number(localStorage.getItem('hydrofit_consumed_ml')) || 0;

// 3. Referencias a los elementos del HTML
const txtMl = document.getElementById('current-ml');
const txtVasos = document.getElementById('current-glasses');
const txtPorcentaje = document.getElementById('percentage-value');
const barraProgreso = document.getElementById('progress-fill');
const textoProgreso = document.getElementById('progress-indicator-text');
const mensajeEstado = document.getElementById('status-message');

const btnAgregar = document.getElementById('btn-add');
const btnRestar = document.getElementById('btn-subtract');
const btnReiniciar = document.getElementById('btn-reset');

// 4. Función para actualizar la pantalla y guardar los datos
function actualizarUI() {
  const vasos = (agua / VASO_ML);
  const porcentaje = Math.round((agua / META_ML) * 100);

  // Actualizar números en pantalla
  txtMl.textContent = agua;
  txtVasos.textContent = vasos;
  txtPorcentaje.textContent = porcentaje;

  // Actualizar la barra visual (máximo 100% de ancho)
  barraProgreso.style.width = Math.min(porcentaje, 100) + '%';
  textoProgreso.textContent = porcentaje + '% completado';

  // Si está en 0 ml, desactivar el botón de restar
  btnRestar.disabled = (agua <= 0);

  // Mensaje dinámico según el agua tomada
  if (agua === 0) {
    mensajeEstado.className = 'status-alert';
    mensajeEstado.innerHTML = '💡 Comienza tu día bebiendo tu primer vaso para activar tu metabolismo.';
  } else if (agua < META_ML) {
    mensajeEstado.className = 'status-alert';
    mensajeEstado.innerHTML = `💧 Llevas <strong>${agua} ml</strong> (${porcentaje}%). ¡Buen avance para tu recuperación física!`;
  } else {
    mensajeEstado.className = 'status-alert goal-reached';
    mensajeEstado.innerHTML = '🏆 <strong>¡META CUMPLIDA!</strong> Alcanzaste los 2,000 ml recomendados para el día.';
  }

  // Guardar en el navegador para no perder el progreso al recargar (F5)
  localStorage.setItem('hydrofit_consumed_ml', agua);
}

// 5. Eventos de los botones

// Botón: Agregar vaso (+250 ml)
btnAgregar.addEventListener('click', () => {
  agua += VASO_ML;
  actualizarUI();

  console.log(`💧 Se agregó 1 vaso (+250 ml). Total actual: ${agua} ml (${agua / VASO_ML} vasos).`);
  if (agua >= META_ML) {
    console.log('🏆 ¡Meta diaria alcanzada! Se completaron los 2,000 ml recomendados.');
  }
});

// Botón: Restar vaso (-250 ml)
btnRestar.addEventListener('click', () => {
  if (agua > 0) {
    agua -= VASO_ML;
    actualizarUI();
    console.log(`➖ Se restó 1 vaso (-250 ml). Total restante: ${agua} ml.`);
  }
});

// Botón: Reiniciar día (0 ml)
btnReiniciar.addEventListener('click', () => {
  if (confirm('¿Deseas reiniciar el contador de agua a 0 ml?')) {
    agua = 0;
    actualizarUI();
    console.log('🔄 El contador diario de agua fue reiniciado a 0 ml.');
  }
});

// 6. Ejecutar la actualización al abrir la página
actualizarUI();
console.log(`🚀 HydroFit iniciado con éxito. Consumo cargado de LocalStorage: ${agua} ml.`);
