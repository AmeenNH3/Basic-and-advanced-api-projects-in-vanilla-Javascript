const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



class Workout{
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords, distance, duration){
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
        this.calcPace();
    }
}

class Running extends Workout{
    constructor(coords,distance,duration,cadence){
        super(coords,distance,duration);
        this.cadence = cadence;
    }
    calcPace(){
        this.pace = this.duration/this.distance;
        return this.pace;
    }
}
class Cycling extends Workout{
    constructor(coords,distance,duration,elevationGain){
        super(coords,distance,duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }
    calcSpeed(){
        //km/hr
        this.speed = this.distance/(this.duration/60);
        return this.speed;
    }
}

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class App{
    #map;
    #mapEvent;
    constructor(){
        this._getPosition();
        form.addEventListener('submit',this._newWorkout.bind(this));
        inputType.addEventListener('change',this._toggleElevationField)
    }
    _getPosition(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                function(){
                alert('Could not access your location');
                 })
            }
    }   

    _loadMap(position){
            const {latitude,longitude} = position.coords;
            // console.log(`https://www.google.com/maps/@${latitude},${longitude},16.39z`);
            const coords = [latitude,longitude];
            console.log(this);
            this.#map = L.map('map').setView(coords, 13);
            
            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);
            
            this.#map.on('click', this._showForm.bind(this));
    }
    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }
    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }
    _newWorkout(e){
        const validInputs = (...inputs) => inputs.every(i => Number.isFinite(i));
        e.preventDefault();

        const type = inputType.value;
        const distance = inputDistance.value;
        const duration = inputDuration.value;

        if(type == 'running'){
            const cadence = +inputCadence.value;
            if(!validInputs(distance,duration,cadence)) 
            return alert('Inputs have to positive numbers!');
        }
        if(type == 'cycling'){
            const elevation = +inputElevation.value;
            if(!validInputs(distance,duration,elevation)) 
            return alert('Inputs have to positive numbers!');
        }


        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =''
        const {lat,lng} = this.#mapEvent.latlng;
        L.marker([lat,lng])
        .addTo(this.#map)
        .bindPopup(L.popup(
            {
                maxWidth:250,
                minWidth:100,
                autoClose:false,
                closeOnClick:false,
                className: 'running-popup'
            })
            )
        .setPopupContent('Workout')
        .openPopup();
    }
}

const app = new App();

