# Scorm-LocalStorage Service

A biblioteca disponibiliza um encapsulamento da biblioteca pipwerks e do localStorage do browser,
para simular um comportamento de persistencia de dados no localStorge quando não houver scorm.

## API

### Padrão scorm - pipwerks

ScormAPIService.[init](#scorm-api-service-init)();

ScormAPIService.[get](#scorm-api-service-get)(String key): String;

ScormAPIService.[set](#scorm-api-service-set)(String key, String value): Boolean;

ScormAPIService.[save](#scorm-api-service-save)();

ScormAPIService.[quit](#scorm-api-service-quit)();

### Camada para trabalhar com objetos

ScormAPIService.[getObject](#scorm-api-service-getObject)(String key): Object;

ScormAPIService.[setObject](#scorm-api-service-setObject)(String key, Object value);

ScormAPIService.[loadObject](#scorm-api-service-loadObject)(String key): Object;

ScormAPIService.[saveObject](#scorm-api-service-saveObject)(String key, Object value): Void;

ScormAPIService.[saveQuiz](#scorm-api-service-saveQuiz)(String key, Object value);

ScormAPIService.[loadQuiz](#scorm-api-service-loadQuiz)(String key, Object value);

ScormAPIService.[getQuizCollection](#scorm-api-service-getQuizCollection)():Object;

ScormAPIService.[setLessonStatus](#scorm-api-service-setCompleted)(String status):Void;

ScormAPIService.[setCompleted](#scorm-api-service-setCompleted)():Void;

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
