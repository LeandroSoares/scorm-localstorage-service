# SCORM LocalStorage Service

Biblioteca para **abstração e persistência de dados em conteúdos E-learning** (SCORM). 

Ela funciona como um *wrapper* inteligente que tenta salvar os dados no **LMS** (via SCORM API); caso falhe ou esteja rodando localmente (fora de um LMS), faz fallback automático para o **LocalStorage** do navegador. Isso permite desenvolver e testar conteúdos localmente sem alterar o código de persistência.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![SCORM](https://img.shields.io/badge/SCORM-1.2%20%2F%202004-blue)

---

## 🚀 Instalação

```bash
npm install scorm-localstorage-service
```

### Pré-requisitos

Esta biblioteca depende do **Pipwerks SCORM API Wrapper** para comunicação com versões SCORM 1.2 e 2004. Certifique-se de carregar o script do pipwerks **antes** desta biblioteca em seu HTML.

```html
<!-- 1. Carregar Pipwerks -->
<script src="path/to/SCORM_API_wrapper.js"></script>

<!-- 2. Carregar esta biblioteca -->
<script src="node_modules/scorm-localstorage-service/dist/scorm-localstorage-service.min.js"></script>
```

---

## 🛠️ Como Usar

### Inicialização

Sempre inicialize o serviço antes de usar. Ele detectará automaticamente se deve usar SCORM ou LocalStorage.

```javascript
// Cria a instância (Factory Pattern)
const api = PersistanceService.Create();

// Inicializa (retorna true se sucesso)
const initialized = api.init();

if (initialized) {
    console.log("Serviço de persistência pronto!");
} else {
    console.error("Falha ao inicializar persistência.");
}
```

### Salvando e Carregando Dados

A biblioteca lida automaticamente com a serialização JSON para objetos complexos.

```javascript
// Salvar um valor simples (String)
api.set("cmi.suspend_data", "dado_bruto");

// Salvar um Objeto (Serialização automática para JSON dentro do suspend_data)
api.saveObject("pontuacao_bonus", 500);
api.saveObject("progresso_fases", { fase1: true, fase2: false });

// Carregar um Objeto
const fases = api.loadObject("progresso_fases");
console.log(fases.fase1); // true

// Salvar status da lição
api.setCompleted(); // Marca como 'completed'
```

---

## 🏗️ Arquitetura e Mock Local

Esta biblioteca foi desenhada pensando na experiência de desenvolvimento local, sem a necessidade de um servidor LMS (Learning Management System) rodando o tempo todo.

### 1. Ambiente LMS (Injeção de API SCORM)
Em um ambiente de produção (LMS), o servidor (ex: PHP, Java, etc.) injeta nativamente uma API SCORM no navegador (geralmente como `window.API` ou `window.API_1484_11`). O **pipwerks** funciona como um wrapper que caça e se conecta a essa API invisível do LMS. Quando a conexão é bem-sucedida, nossa biblioteca utiliza o `ScormAPIService` para salvar e recuperar dados reais do LMS. A constante interna `SCORM_API` serve apenas para mapear os nomes das variáveis padrão (como `cmi.suspend_data`).

### 2. Ambiente Local (`PersistanceFake`)
Quando o conteúdo é aberto localmente (ex: abrindo um `index.html` direto no navegador ou via Live Server) ou quando o LMS falha em injetar a API, o pipwerks não encontra a API do SCORM. Nesse momento, a biblioteca faz um **fallback automático**.
Para testes customizados, você também pode instanciar explicitamente o `PersistanceFake`. Ele simula a persistência de dados em memória e joga logs coloridos no console (`PersistanceFake >> key value`) a cada interação. Isso permite que você desenvolva, teste a lógica de pontuação, progressão de telas e quizes sem depender de um servidor externo, acelerando o desenvolvimento do frontend SCORM.

---

### `PersistanceService`

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `Create()` | `PersistanceService` | Método estático. Retorna a instância configurada. |
| `init()` | `Boolean` | Inicializa a conexão (LMS ou LocalStorage). |
| `save()` | `Boolean` | Força o commit dos dados (LMSCommit/Save). |
| `quit()` | `void` | Encerra a conexão. |

### Manipulação de Dados (Tipados)

| Método | Descrição |
|--------|-----------|
| `saveObject(key, value)` | Salva um valor (objeto/string/int) dentro do `cmi.suspend_data` convertendo para JSON. |
| `loadObject(key)` | Recupera um valor do `cmi.suspend_data` convertendo de JSON para OBJ. |
| `saveQuiz(key, value)` | Atalho para salvar dados de quiz dentro de um objeto 'quizes'. |
| `loadQuiz(key)` | Recupera dados de quiz. |
| `getQuizCollection()` | Retorna todos os quizes salvos. |

### Métodos Nativos (SCORM Puro)

| Método | Descrição |
|--------|-----------|
| `get(key)` | Faz o `LMSGetValue` direto. Ex: `api.get('cmi.core.student_name')`. |
| `set(key, value)` | Faz o `LMSSetValue` direto. |

### Helpers de Status

| Método | Descrição |
|--------|-----------|
| `setCompleted()` | Define `cmi.core.lesson_status` como `completed`. |
| `setLessonStatus(status)` | Define um status personalizado (Ex: `passed`, `failed`). |

---

## 💻 Desenvolvimento

### Instalar dependências
```bash
npm install
```

### Rodar Build (Gulp)
Gera os arquivos minificados na pasta `dist/`.
```bash
npm run build
```

### Rodar Testes
Executa a suíte de testes unitários com Jest.
```bash
npm test
```

---

## 📄 Licença

MIT License - Veja o arquivo [LICENSE](LICENSE) para mais detalhes. (Essencialmente: você pode usar livremente, desde que mantenha os créditos/direitos autorais da implementação original).
