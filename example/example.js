(function () {
    let api = null;
    let buttonWasClicked = false;

    function clickTest() {
        buttonWasClicked = true;
        api.saveObject('clicked', buttonWasClicked);
        print();
    }

    function clickClear() {
        api.setObject(SCORM_API.SUSPEND_DATA, {});
        location.reload();
    }

    function clickReload() {
        window.location.reload()
    }

    function print() {
        document.querySelector('#print').innerHTML = buttonWasClicked ? "YES" : "NO";
    }

    function startApp() {
        api = PersistanceService.Create();
        api.init();

        buttonWasClicked = api.loadObject('clicked') || false;
        print();

        document.querySelector('#btn-test').addEventListener('click', clickTest);
        document.querySelector('#btn-clear').addEventListener('click', clickClear);
        document.querySelector('#btn-reload').addEventListener('click', clickReload);
    }

    document.addEventListener('DOMContentLoaded', startApp);
})();