// variables form fields
let DB;
const petInput = document.querySelector('#mascota');
const ownerInput = document.querySelector('#propietario');
const phoneInput = document.querySelector('#telefono');
const dateInput = document.querySelector('#fecha');
const hourInput = document.querySelector('#hora');
const symptomsInput = document.querySelector('#sintomas');

// ui
const form = document.querySelector('#nueva-cita');
const quotesContainer = document.querySelector('#citas');
let editando;

class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas =[...this.citas, cita];
    }

    deleteQuote(id) {
        this.citas = this.citas.filter( cita => cita.id !== id);
    }

    modifyQuote(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita);
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

    imprimirCitas() {

        this.limpiarHTML();

       //leer el contenido de la base de datos
       const objectStore = DB.transaction('citas').objectStore('citas');

       const total = objectStore.count();
       total.onsuccess = function() {
           console.log(total.result);
       }

       objectStore.openCursor().onsuccess = function(e) {
           
        const cursor = e.target.result;
        
        if(cursor) {
        
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cursor.value;

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

            //añade un boton para editar
            const btnEdit = document.createElement('button');
            btnEdit.classList.add('btn', 'btn-info');
            btnEdit.innerHTML = ' Edit <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEdit.onclick = () => uploadEdit(cita);

            //agregar los parrafos al divCitas
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnDelete);
            divCita.appendChild(btnEdit);

            //agregar citas al HTML
            quotesContainer.appendChild(divCita);

            //ve al siguiente elemento
            cursor.continue();
        
        }
       }
       
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

window.onload = () => {
    eventListeners();

    createDB();
}




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

    if(editando) {
        ui.imprimirAlerta('Editado correctamente');

        //pasar el objeto de la cita a edición
        administrarCitas.modifyQuote({...quotesObj});

        //regresar el texto del boton a su estado original
        form.querySelector('button[type="submit"]').textContent = 'Crear cita';
        
        //quita modo edición
        editando= false;
    } else {
        //generar un id único
        quotesObj.id = Date.now();

        //creamos una nueva cita
        administrarCitas.agregarCita({...quotesObj});

        //insertar registro de indexedDB
        const transaction = DB.transaction(['citas'], 'readwrite');
        //habilitar el objectStore
        const objectStore = transaction.objectStore('citas');
        //insertar en la DB
        objectStore.add(quotesObj);

        transaction.oncomplete = function() {
            console.log('agrega cita');
            //imprimir mensaje de agregado correctamente
            ui.imprimirAlerta('Se agregó correctamente');
        }

        
    }

    

    //reiniciar el objeto para la validacion
    reiniciarObjeto();

    //reiniciar el formulario
    form.reset();

    //mostrar el HTML de las citas
    ui.imprimirCitas();
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
    ui.imprimirCitas();
}

//carga los datos y el modo edicion
function uploadEdit(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //llenar los inputs
    petInput.value = mascota;
    ownerInput.value = propietario;
    phoneInput.value = telefono;
    dateInput.value = fecha;
    hourInput.value = hora;
    symptomsInput.value = sintomas;

    //llenar el objeto
    quotesObj.mascota = mascota;
    quotesObj.propietario = propietario;
    quotesObj.telefono = telefono;
    quotesObj.fecha = fecha;
    quotesObj.hora = hora;
    quotesObj.sintomas = sintomas;
    quotesObj.id = id;

    //cambiar el texxto del boton
    form.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}

function createDB() {
    //crear la base de datos en version 1.0
    const crearDB = window.indexedDB.open('citas', 1);

    //si hay un error
    crearDB.onerror = function() {
        console.log('hubo un error');
    }

    //si todo sale biuen

    crearDB.onsuccess = function() {
        console.log('DB creada');
        DB = crearDB.result;

        //mostrar citas al cargar
        ui.imprimirCitas();
    }

    //definir el schema
    crearDB.onupgradeneeded = function (e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore('citas', {
            keyPath: 'id',
            autoIncrement: true
        });
        objectStore.createIndex('mascota', 'mascota', {unique: false} );
        objectStore.createIndex('propietario', 'propietario', {unique: false} );
        objectStore.createIndex('telefono', 'telefono', {unique: false} );
        objectStore.createIndex('fecha', 'fecha', {unique: false} );
        objectStore.createIndex('hora', 'hora', {unique: false} );
        objectStore.createIndex('sintomas', 'sintomas', {unique: false} );
        objectStore.createIndex('id', 'id', {unique: true} );
        console.log('database creada y lista');
    }
}