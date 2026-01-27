// Setup mock for localStorage if needed (though jsdom provides one)
// Setup mock for verify browser globals
global.pipwerks = {
    SCORM: {
        init: jest.fn(),
        get: jest.fn(),
        set: jest.fn(),
        save: jest.fn(),
        quit: jest.fn(),
    },
    debug: {
        isActive: true
    }
};

// Mock SCORM_API constants global
global.SCORM_API = {
    SUSPEND_DATA: "cmi.suspend_data",
    LESSON_STATUS: "cmi.core.lesson_status",
    LESSON_LOCATION: "cmi.core.lesson_location",
    SCORE: "cmi.core.score.raw"
};

global.STATUS = {
    PASSED: "passed",
    COMPLETED: "completed",
    FAILED: "failed",
    INCOMPLETE: "incomplete",
    BROWSED: "browsed",
    NOT_ATTEMPTED: "not attempted"
};

global.QUIZES = "quizes";
