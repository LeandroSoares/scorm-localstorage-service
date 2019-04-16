const QUIZES = "quizes";
const STATUS = {
    PASSED: "passed",
    COMPLETED: "completed",
    FAILED: "failed",
    INCOMPLETE: "incomplete",
    BROWSED: "browsed",
    NOT_ATTEMPTED: "not attempted"
};

const SCORM_API = {
    SUSPEND_DATA: "cmi.suspend_data",
    LESSON_STATUS: "cmi.core.lesson_status",
    LESSON_LOCATION: "cmi.core.lesson_location",
    SCORE: "cmi.core.score.raw"
};

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
class PersistanceFake {
    constructor() {
        this.name = "PersistanceFake";
        this.db = {};
        console.log(`%c* Persistance - ${this.persistance.name} * `, "font-weight:bold; color:purple");
    }

    init() {
        return true;
    }

    get(key) {
        return this.db[key];
    }

    set(key, value) {
        this.db[key] = value;
        console.log("PersistanceFake >>", key, value);
    }

    save() {
        return true;
    }

    quit() {
        console.log("PersistanceFake >> quit");
        return true;
    }

    getObject(key) {
        return this.get(key);
    }

    setObject(key, value) {
        this.set(key, value);
    }

    saveObject(key, value) {
        let objects = this.getObject(SCORM_API.SUSPEND_DATA) || {};
        objects[key] = value;
        this.setObject(SCORM_API.SUSPEND_DATA, objects);
    }

    loadObject(key) {
        let objects = this.getObject(SCORM_API.SUSPEND_DATA) || {};
        return objects[key];
    }

    saveQuiz(key, value) {
        let quizes = this.loadObject(QUIZES) || {};
        quizes[key] = value;
        this.saveObject(QUIZES, quizes);
    }

    loadQuiz(key) {
        let quizes = this.loadObject(QUIZES) || {};
        return quizes[key];
    }

    getQuizCollection() {
        return this.loadObject(QUIZES);
    }

    setCompleted() {
        this.setLessonStatus(STATUS.COMPLETED);
    }

    setLessonStatus(status) {
        this.set(SCORM_API.LESSON_STATUS, status);
    }
}
class PersistanceService {
    static Create() {
        return new PersistanceService(new ScormAPIService(), new LocstorService());
    }
    constructor(scorm, locstor) {
        this.scorm = scorm;
        this.locstor = locstor;
        this.persistance = this.scorm.ready ? this.scorm : this.locstor;
        console.log(`%c* Persistance - ${this.persistance.name} * `, "font-weight:bold; color:purple");
    }
    // inicializa scorm
    init() {
        return this.persistance.init();
    }
    // retorna dados direto do scorm
    get(key) {
        return this.persistance.get(key);
    }
    // salva dados direto no scorm
    set(key, value) {
        return this.persistance.set(key, value);
    }
    // commit do scorm
    save() {
        return this.persistance.save();
    }
    //scorm quit
    quit() {
        this.persistance.quit();
    }
    // retorna dados do scorm passados pelo JSON.parse
    getObject(key) {
        return this.persistance.getObject(key);
    }
    // salva dados no scorm passados pelo JSON.stringify
    setObject(key, value) {
        return this.persistance.setObject(key, value);
    }

    saveObject(key, value) {
        let objects = this.persistance.getObject(SCORM_API.SUSPEND_DATA) || {};
        objects[key] = value;
        this.persistance.setObject(SCORM_API.SUSPEND_DATA, objects);
    }

    loadObject(key) {
        let objects = this.persistance.getObject(SCORM_API.SUSPEND_DATA) || {};
        return objects[key];
    }

    saveQuiz(key, value) {
        let quizes = this.loadObject(QUIZES) || {};
        quizes[key] = value;
        this.saveObject(QUIZES, quizes);
    }

    loadQuiz(key) {
        let quizes = this.loadObject(QUIZES) || {};
        return quizes[key];
    }

    getQuizCollection() {
        return this.loadObject(QUIZES);
    }

    setCompleted() {
        this.setLessonStatus(STATUS.COMPLETED);
    }

    setLessonStatus(status) {
        this.set(SCORM_API.LESSON_STATUS, status);
    }
}
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