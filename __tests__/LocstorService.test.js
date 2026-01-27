const LocstorService = require('../src/LocstorService');

// Make it global to be accessible by PersistanceService if needed indirectly, 
// though we usually inject it.
global.LocstorService = LocstorService;

describe('LocstorService', () => {
    let service;

    beforeEach(() => {
        service = new LocstorService();
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('should identify itself as localStorage', () => {
        expect(service.name).toBe('localStorage');
    });

    test('init should always return true', () => {
        expect(service.init()).toBe(true);
    });

    test('should save and retrieve simple string', () => {
        service.set('testKey', 'testValue');
        expect(service.get('testKey')).toBe('testValue');
        expect(localStorage.getItem('testKey')).toBe('testValue');
    });

    test('should save and retrieve object with automatic serialization', () => {
        const data = { foo: 'bar', num: 123 };
        service.setObject('objKey', data);

        const retrieved = service.getObject('objKey');
        expect(retrieved).toEqual(data);
        expect(localStorage.getItem('objKey')).toBe(JSON.stringify(data));
    });

    test('quit should just log', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        service.quit();
        expect(consoleSpy).toHaveBeenCalledWith('trying to quit...');
    });
});
