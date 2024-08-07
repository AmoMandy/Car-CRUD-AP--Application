document.addEventListener('alpine:init', () => {
    Alpine.data('carApp', () => ({
        car: {
            color: '',
            make: '',
            model: '',
            reg_number: ''
        },
        cars: [],
        mostPopularMake: '',

        async init() {
            this.fetchCars();
        },

        async fetchCars() {
            const response = await axios.get('/api/cars');
            this.cars = response.data;
        },

        async saveCar() {
            if (this.car.reg_number) {
                await axios.put(`/api/cars/${this.car.reg_number}`, this.car);
            } else {
                await axios.post('/api/cars', this.car);
            }
            this.car = { color: '', make: '', model: '', reg_number: '' };
            this.fetchCars();
        },

        async editCar(car) {
            await axios.get(`/api/cars/${this.car.reg_number}`, this.car);
            this.car = {...cars}
            this.fetchCar();
        },

        async deleteCar(reg_number) {
            await axios.delete(`/api/cars/${reg_number}`);
            this.fetchCars();
        },

        async getMostPopularMake() {
            const response = await axios.get('/api/cars/mostPopularMake');
            this.mostPopularMake = `Most popular make: ${response.data.mostPopularMake}`;
        }
    }));
});
