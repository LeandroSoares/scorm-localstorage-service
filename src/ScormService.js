class ScormAPIService {
    constructor() {
        this.name = 'scorm';
        this.scorm = pipwerks.SCORM;
        this.ready = this.init();
    }

    saveData(key, value) {
        this.suspend_data[key] = value;
        this.set(SCORM_API.SUSPEND_DATA, JSON.stringify(this.suspend_data));
    }

    getData(key) {
        return this.suspend_data[key];
    }

    init() {
        return this.scorm.init();
    }

    get(key) {
        return this.scorm.get(key);
    }

    set(key, value) {
        let response = this.scorm.set(key, value);
        this.scorm.save();
        return response;
    }

    getObject(key) {
        return JSON.parse(this.get(key) || "{}");
    }

    setObject(key, value) {
        return this.set(key, JSON.stringify(value));
    }
    
    save() {
        return this.scorm.save();
    }

    quit() {
        this.scorm.quit();
    }
}