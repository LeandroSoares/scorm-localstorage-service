class PersistanceFake {
	static Create() {
		return new PersistanceFake();
	}
	constructor() {
		this.name = "PersistanceFake";
		this.db = {};
		console.log(`%c* Persistance - ${this.name} * `, "font-weight:bold; color:purple");
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