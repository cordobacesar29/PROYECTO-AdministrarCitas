// variables
const petInput = document.querySelector('#mascota');
const ownerInput = document.querySelector('#propietario');
const phoneInput = document.querySelector('#telefono');
const dateInput = document.querySelector('#fecha');
const hourInput = document.querySelector('#hora');
const symptomsInput = document.querySelector('#sintomas');

const form = document.querySelector('#nueva-cita');

const quotesContainer = document.querySelector('#citas');

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

function eventListeners() {
    petInput.addEventListener('change', quotesData);
    ownerInput.addEventListener('change', quotesData);
    phoneInput.addEventListener('change', quotesData);
    dateInput.addEventListener('change', quotesData);
    hourInput.addEventListener('change', quotesData);
    symptomsInput.addEventListener('change', quotesData);
}

function quotesData(e) {
    quotesObj [e.target.name] = e.target.value;

    console.log(quotesObj);
}