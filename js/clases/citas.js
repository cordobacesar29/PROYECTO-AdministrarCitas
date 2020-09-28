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

export default Citas;