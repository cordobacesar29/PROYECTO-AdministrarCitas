import { quotesData, nuevaCita } from '../funciones.js';
import { 
    petInput, 
    ownerInput, 
    phoneInput, 
    dateInput, 
    hourInput, 
    symptomsInput, 
    form
} from '../selectores.js';

class Apps {
    constructor() {
        this.initApp();
    }

    initApp() {
        petInput.addEventListener('change', quotesData);
        ownerInput.addEventListener('change', quotesData);
        phoneInput.addEventListener('change', quotesData);
        dateInput.addEventListener('change', quotesData);
        hourInput.addEventListener('change', quotesData);
        symptomsInput.addEventListener('change', quotesData);

        form.addEventListener('submit', nuevaCita);
    }
}

export default Apps;