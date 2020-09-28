import Citas from './clases/Citas.js';
import UI from './clases/UI.js';

import { 
    petInput, 
    ownerInput, 
    phoneInput, 
    dateInput, 
    hourInput, 
    symptomsInput, 
    form 
} from './selectores.js';

let editando;

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


export function quotesData(e) {
    quotesObj [e.target.name] = e.target.value;

}


//valida y agrega unanueva cita a la clase citas
export function nuevaCita(e) {
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

        //imprimir mensaje de agregado correctamente
        ui.imprimirAlerta('Se agregó correctamente');
    }

    

    //reiniciar el objeto para la validacion
    reiniciarObjeto();

    //reiniciar el formulario
    form.reset();

    //mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
    quotesObj.mascota = '';
    quotesObj.propietario = '';
    quotesObj.telefono = '';
    quotesObj.fecha = '';
    quotesObj.hora = '';
    quotesObj.sintomas = '';
}

export function deleteQuote(id) {
    
    //eliminar la cita
    administrarCitas.deleteQuote(id);

    // mostrar msj
    ui.imprimirAlerta('la cita se eliminó correctamente');

    // refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

//carga los datos y el modo edicion
export function uploadEdit(cita) {
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