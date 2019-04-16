# Scorm-LocalStorage Service

A biblioteca disponibiliza um encapsulamento da biblioteca pipwerks e do localStorage do browser,
para simular um comportamento de persistencia de dados no localStorge quando não houver scorm.

## API

- Padrão scorm - pipwerks

ScormAPIService.[init](#ScormAPIService.init)();
ScormAPIService.[get](ScormAPIService.get)(String key): String;
ScormAPIService.[set](ScormAPIService.set)(String key, String value): Boolean;
ScormAPIService.[save](ScormAPIService.save)();
ScormAPIService.[quit](ScormAPIService.quit)();

- Camada para trabalhar com objetos

ScormAPIService.[getObject](ScormAPIService.getObject)(String key): Object;
ScormAPIService.[setObject](ScormAPIService.setObject)(String key, Object value);
ScormAPIService.[loadObject](ScormAPIService.loadObject)(String key): Object;
ScormAPIService.[saveObject](ScormAPIService.saveObject)(String key, Object value): Void;

ScormAPIService.[saveQuiz](ScormAPIService.saveQuiz)(String key, Object value);
ScormAPIService.[loadQuiz](ScormAPIService.loadQuiz)(String key, Object value);
ScormAPIService.[getQuizCollection](ScormAPIService.getQuizCollection)():Object;

ScormAPIService.[setLessonStatus](ScormAPIService.setCompleted)(String status):Void;
ScormAPIService.[setCompleted](ScormAPIService.setCompleted)():Void;

### ScormAPIService.init

Tenta inicializar a api scorm, caso não consiga inicia o serviço de localStorage.

### ScormAPIService.get

Faz um get puro da api pipwerks, ou localStorage;

### ScormAPIService.set

Faz um set puro da api pipwerks, ou localStorage;

### ScormAPIService.save

Faz um save puro da api pipwerks;

### ScormAPIService.quit

Faz um quit puro da api pipwerks;

### ScormAPIService.getObject

Faz um `ScormAPIService.get(key)` mas retorna o o value com *JSON.parse*.

### ScormAPIService.setObject

Faz um `ScormAPIService.set(key, value)` mas transforma o value em json com o *JSON.stringify*.

### ScormAPIService.loadObject

Faz um `ScormAPIService.getObject('cmi.suspend_data')[key]`, retornando com *JSON.parse*.

### ScormAPIService.saveObject

Faz um `ScormAPIService.setObject('cmi.suspend_data')[key]` = value, transforma o value em json com o *JSON.stringify* antes de salvar.

### ScormAPIService.loadQuiz

Faz um `ScormAPIService.saveObject('cmi.suspend_data')['quizes'][key]`, retornando com *JSON.parse*.

### ScormAPIService.saveQuiz

Faz um `ScormAPIService.saveObject('cmi.suspend_data')['quizes'][key]` = value, transforma o value em json com o *JSON.stringify* antes de salvar.

### ScormAPIService.getQuizCollection

Faz um `ScormAPIService.saveObject('cmi.suspend_data')['quizes']`, retornando com *JSON.parse*.

### ScormAPIService.setLessonStatus

Faz um `ScormAPIService.set(SCORM_API.LESSON_STATUS, status);`.

### ScormAPIService.setCompleted

Faz um `ScormAPIService.setLessonStatus(STATUS.COMPLETED);`.

#### Constantes de apoio

- STATUS

  - PASSED, COMPLETED, FAILED, INCOMPLETE, BROWSED, NOT_ATTEMPTED

- SCORM_API

  - SUSPEND_DATA, LESSON_STATUS, LESSON_LOCATION, SCORE