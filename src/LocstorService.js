class LocstorService {
    constructor() {
        this.name = 'localStorage';
    }

    init() {
        return true;
    }

    get(key) {
        return localStorage.getItem(key);
    }

    set(key, value) {
        localStorage.setItem(key, value);
        return true;
    }
    getObject(key) {
        return JSON.parse(this.get(key));
    }
    setObject(key, value) {
        this.set(key, JSON.stringify(value));
        return true;
    }
    save() {
        console.log('trying to save...');
        return true;
    }
    quit() {
        console.log('trying to quit...');
    }
}