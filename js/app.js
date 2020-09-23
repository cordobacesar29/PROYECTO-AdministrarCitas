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

    agregarCita(cita) {
        this.citas =[...this.citas, cita];
    }

    deleteQuote(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
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

    imprimirCitas({citas}) {

        this.limpiarHTML();
       
        citas.forEach( cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id = id;

            // scripting de los elementos de las citas
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Teléfono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Síntomas: </span> ${sintomas}
            `;

            //borrar citas
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn', 'btn-danger', 'mr-2');
            btnDelete.innerHTML = 'Eliminar';

            btnDelete.onclick = () => deleteQuote(id);

            //agregar los parrafos al divCitas
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appemdChild(btnDelete);

            //agregar citas al HTML
            quotesContainer.appendChild(divCita);
        })
    }

    limpiarHTML() {
        while(quotesContainer.firstChild) {
            quotesContainer.removeChild( quotesContainer.firstChild );
        }
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

    //generar un id único
    quotesObj.id = Date.now();

    //creamos una nueva cita
    administrarCitas.agregarCita({...quotesObj});

    //reiniciar el objeto para la validacion
    reiniciarObjeto();

    //reiniciar el formulario
    form.reset();

    //mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
    quotesObj.mascota = '';
    quotesObj.propietario = '';
    quotesObj.telefono = '';
    quotesObj.fecha = '';
    quotesObj.hora = '';
    quotesObj.sintomas = '';
}

function deleteQuote(id) {
    
    //eliminar la cita
    administrarCitas.deleteQuote(id);

    // mostrar msj
    ui.imprimirAlerta('la cita se eliminó correctamente');

    // refrescar las citas
    ui.imprimirCitas(administrarCitas);
}