const ScormAPIService = require('../src/ScormService');

// Mock dependencies
global.ScormAPIService = ScormAPIService;

describe('ScormAPIService', () => {
    let service;

    beforeEach(() => {
        jest.clearAllMocks();
        // Reset pipwerks mocks
        global.pipwerks.SCORM.init.mockReturnValue(true);
        global.pipwerks.SCORM.set.mockReturnValue(true);
        global.pipwerks.SCORM.save.mockReturnValue(true);
        global.pipwerks.SCORM.get.mockReturnValue("");

        service = new ScormAPIService();
    });

    test('should identify itself as scorm', () => {
        expect(service.name).toBe('scorm');
    });

    test('should initialize scorm on construction', () => {
        expect(global.pipwerks.SCORM.init).toHaveBeenCalled();
        expect(service.ready).toBe(true);
    });

    test('set should call LMS set and then save', () => {
        service.set('cmi.test', 'value');
        expect(global.pipwerks.SCORM.set).toHaveBeenCalledWith('cmi.test', 'value');
        expect(global.pipwerks.SCORM.save).toHaveBeenCalled();
    });

    test('getObject should parse JSON from LMS', () => {
        const mockData = { points: 100 };
        global.pipwerks.SCORM.get.mockReturnValue(JSON.stringify(mockData));

        const result = service.getObject('someKey');
        expect(global.pipwerks.SCORM.get).toHaveBeenCalledWith('someKey');
        expect(result).toEqual(mockData);
    });

    test('setObject should stringify data to LMS', () => {
        const mockData = { points: 100 };
        service.setObject('someKey', mockData);

        expect(global.pipwerks.SCORM.set).toHaveBeenCalledWith('someKey', JSON.stringify(mockData));
    });

    test('getObject should return empty object if LMS returns nothing', () => {
        global.pipwerks.SCORM.get.mockReturnValue(null);
        const result = service.getObject('someKey');
        expect(result).toEqual({});
    });
});
