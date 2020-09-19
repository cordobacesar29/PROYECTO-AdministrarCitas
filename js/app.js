// variables form fields
const petInput = document.querySelector('#mascota');
const ownerInput = document.querySelector('#propietario');
const phoneInput = document.querySelector('#telefono');
const dateInput = document.querySelector('#fecha');
const hourInput = document.querySelector('#hora');
const symptomsInput = document.querySelector('#sintomas');

// ui
const form = document.querySelector('#nueva-cita');
const quotesContainer = document.querySelector('#citas');

class Citas {
    constructor() {
        this.citas = [];
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        //crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert', 'd-block', 'col-12');

        //agregar clase en base al tipo de error
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        // mensaje de error
        divMensaje.textContent = mensaje;

        //agregar al dom
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita') );

        //quitar el alert
        setTimeout( () => {
            divMensaje.remove();
        }, 5000 );
    }

}

const ui = new UI();
const administrarCitas = new Citas();

//objet with the quotes information
const quotesObj = {
    mascota : '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//event listeners

eventListeners();


//funciones
// log events
function eventListeners() {
    petInput.addEventListener('change', quotesData);
    ownerInput.addEventListener('change', quotesData);
    phoneInput.addEventListener('change', quotesData);
    dateInput.addEventListener('change', quotesData);
    hourInput.addEventListener('change', quotesData);
    symptomsInput.addEventListener('change', quotesData);

    form.addEventListener('submit', nuevaCita);
}

function quotesData(e) {
    quotesObj [e.target.name] = e.target.value;

    console.log(quotesObj);
}

//valida y agrega unanueva cita a la clase citas
function nuevaCita(e) {
    e.preventDefault();

    //extraer la info del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = quotesObj;

    // validar
    if ( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ) {
        ui.imprimirAlerta('Todos los campos son obligatiors','error');
        return;
    }
}