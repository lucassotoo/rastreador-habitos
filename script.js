const form = document.getElementById('habito-form');
const nombreHabito= document.getElementById('nombre-habito');
const listaHabitos = document.getElementById('lista-habitos');

class Habito{
    constructor(nombre){
        this.nombre = nombre;
        this.id=Date.now().toString();
        this.diasCompletados = [];

    }
}

function getHabitos() {
    const habitos = JSON.parse(localStorage.getItem('habitos')) || [];
    return habitos;
}

function saveHabito(habito) {
    const habitos = getHabitos();
    habitos.push(habito);
    localStorage.setItem('habitos', JSON.stringify(habitos));
}

function mostrarHabitos() {
    const habitos = getHabitos();
    listaHabitos.innerHTML = habitos.map(habito => `
        <div class="habito-card">
            <h3>${habito.nombre}</h3>
            <p class="racha">Racha: ${habito.diasCompletados.length} días</p>
            <button onclick="eliminarHabito('${habito.id}')">Eliminar</button>
        </div>
    `).join('');
}

function eliminarHabito(id) {
    let habitos = getHabitos();
    habitos = habitos.filter(habito => habito.id !== id);
    localStorage.setItem('habitos', JSON.stringify(habitos));
}

//App principal

mostrarHabitos();
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nuevoHabito = new Habito(nombreHabito.value);
    saveHabito(nuevoHabito);
    mostrarHabitos();
    
});