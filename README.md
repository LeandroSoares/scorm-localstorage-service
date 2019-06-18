# Scorm-LocalStorage Service

A biblioteca disponibiliza um encapsulamento da biblioteca pipwerks e do localStorage do browser,
para simular um comportamento de persistencia de dados no localStorge quando não houver scorm.

## Utilização

Instalando:

``` sh
npm i scorm-localstorage-service
```

Instanciando e usando:

``` js
const api = PersistanceService.Create(); //cria a instancia
api.init(); //sempre inicializar primeiro

api.saveObject('points', 10);
let savedPoints = api.loadObject('points');

```

## API

### Padrão scorm - pipwerks

PersistanceService.[init](#persistanceserviceinit)();

PersistanceService.[get](#persistanceserviceget)(String key): String;

PersistanceService.[set](#persistanceserviceset)(String key, String value): Boolean;

PersistanceService.[save](#persistanceservicesave)();

PersistanceService.[quit](#persistanceservicequit)();

### Camada para trabalhar com objetos

PersistanceService.[getObject](#persistanceservicegetObject)(String key): Object;

PersistanceService.[setObject](#persistanceservicesetObject)(String key, Object value);

PersistanceService.[loadObject](#persistanceserviceloadObject)(String key): Object;

PersistanceService.[saveObject](#persistanceservicesaveObject)(String key, Object value): Void;

PersistanceService.[saveQuiz](#persistanceservicesaveQuiz)(String key, Object value);

PersistanceService.[loadQuiz](#persistanceserviceloadQuiz)(String key, Object value);

PersistanceService.[getQuizCollection](#persistanceservicegetQuizCollection)():Object;

PersistanceService.[setLessonStatus](#persistanceservicesetCompleted)(String status):Void;

PersistanceService.[setCompleted](#persistanceservicesetCompleted)():Void;

### PersistanceService.init

Tenta inicializar a api scorm, caso não consiga inicia o serviço de localStorage.

### PersistanceService.get

Faz um get puro da api pipwerks, ou localStorage;

### PersistanceService.set

Faz um set puro da api pipwerks, ou localStorage;

### PersistanceService.save

Faz um save puro da api pipwerks;

### PersistanceService.quit

Faz um quit puro da api pipwerks;

### PersistanceService.getObject

Faz um `PersistanceService.get(key)` mas retorna o o value com *JSON.parse*.

### PersistanceService.setObject

Faz um `PersistanceService.set(key, value)` mas transforma o value em json com o *JSON.stringify*.

### PersistanceService.loadObject

Faz um `PersistanceService.getObject('cmi.suspend_data')[key]`, retornando com *JSON.parse*.

### PersistanceService.saveObject

Faz um `PersistanceService.setObject('cmi.suspend_data')[key]` = value, transforma o value em json com o *JSON.stringify* antes de salvar.

### PersistanceService.loadQuiz

Faz um `PersistanceService.saveObject('cmi.suspend_data')['quizes'][key]`, retornando com *JSON.parse*.

### PersistanceService.saveQuiz

Faz um `PersistanceService.saveObject('cmi.suspend_data')['quizes'][key]` = value, transforma o value em json com o *JSON.stringify* antes de salvar.

### PersistanceService.getQuizCollection

Faz um `PersistanceService.saveObject('cmi.suspend_data')['quizes']`, retornando com *JSON.parse*.

### PersistanceService.setLessonStatus

Faz um `PersistanceService.set(SCORM_API.LESSON_STATUS, status);`.

### PersistanceService.setCompleted

Faz um `PersistanceService.setLessonStatus(STATUS.COMPLETED);`.

#### Constantes de apoio

- STATUS

  - PASSED, COMPLETED, FAILED, INCOMPLETE, BROWSED, NOT_ATTEMPTED

- SCORM_API

  - SUSPEND_DATA, LESSON_STATUS, LESSON_LOCATION, SCORE
