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