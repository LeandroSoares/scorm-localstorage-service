const PersistanceService = require('../src/PersistanceService');
const ScormAPIService = require('../src/ScormService');
const LocstorService = require('../src/LocstorService');

// Setup Globals for the classes to be able to instantiate each other if needed
global.PersistanceService = PersistanceService;
global.ScormAPIService = ScormAPIService;
global.LocstorService = LocstorService;

describe('PersistanceService', () => {

    describe('Factory (Create)', () => {
        test('should use SCORM if available (init returns true)', () => {
            // Mock SCORM init to succeed
            global.pipwerks.SCORM.init.mockReturnValue(true);

            const api = PersistanceService.Create();
            expect(api.persistance).toBeInstanceOf(ScormAPIService);
            expect(api.persistance.name).toBe('scorm');
        });

        test('should use LocalStorage if SCORM fails (init returns false)', () => {
            // Mock SCORM init to fail
            global.pipwerks.SCORM.init.mockReturnValue(false);

            const api = PersistanceService.Create();

            // Note: In original code, ScormAPIService sets this.ready = init().
            // If init() is false, PersistanceService constructor switches to Locstor.
            expect(api.persistance).toBeInstanceOf(LocstorService);
            expect(api.persistance.name).toBe('localStorage');
        });
    });

    describe('Logic Methods (delegation)', () => {
        let scormServiceMock;
        let locstorServiceMock;
        let service;

        beforeEach(() => {
            scormServiceMock = {
                name: 'scorm',
                init: jest.fn(),
                get: jest.fn(),
                set: jest.fn(),
                save: jest.fn(),
                getObject: jest.fn(),
                setObject: jest.fn(),
                ready: true
            };
            locstorServiceMock = {
                name: 'localStorage',
                init: jest.fn(),
                get: jest.fn(),
                set: jest.fn()
            };

            // Manually inject mocks
            service = new PersistanceService(scormServiceMock, locstorServiceMock);
        });

        test('saveObject should manipulate suspend_data correctly', () => {
            // Mock existing suspend_data
            const currentData = { existing: 1 };
            scormServiceMock.getObject.mockReturnValue(currentData);

            service.saveObject('newKey', 'newValue');

            expect(scormServiceMock.getObject).toHaveBeenCalledWith(SCORM_API.SUSPEND_DATA);

            const expectedData = { existing: 1, newKey: 'newValue' };
            expect(scormServiceMock.setObject).toHaveBeenCalledWith(SCORM_API.SUSPEND_DATA, expectedData);
        });

        test('loadObject should retrieve from suspend_data', () => {
            const currentData = { myKey: 'myValue' };
            scormServiceMock.getObject.mockReturnValue(currentData);

            const result = service.loadObject('myKey');
            expect(result).toBe('myValue');
        });

        test('setCompleted should set correct status', () => {
            service.setCompleted();
            expect(scormServiceMock.set).toHaveBeenCalledWith(SCORM_API.LESSON_STATUS, STATUS.COMPLETED);
        });
    });
});
