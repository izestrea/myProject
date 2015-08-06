/**
 * Created by user on 05.06.2015.
 */
app.factory('AppFactory', function ($http) {
    var factory = {};

    //afisari
    factory.allStudents = function (params) {
        var url = '/api/students?size=' + params.count();
        //sort by id
        for (var key in params.sorting()) {
            url = url.concat('&sort=' + key + ',' + params.sorting()[key]);
        }
        if (params.page() >= 1) {
            url = url.concat('&page=' + (params.page() - 1));
        }
        return $http.get(url);
    };
    factory.allInstitutionsTable = function (params) {
        var url = '/api/institutionView?size=' + params.count();
        for (var key in params.sorting()) {
            url = url.concat('&sort=' + key + ',' + params.sorting()[key]);
        }
        if (params.page() >= 1) {
            url = url.concat('&page=' + (params.page() - 1));
        }
        return $http.get(url);
    };
    factory.allInstitutions = function () {
        return $http.get('/api/institutions');
    };
    factory.allFacultati = function () {
        return $http.get('/api/facultate');
    };
    factory.allFacultatiTable = function (params) {
        var url = '/api/facultateView?size=' + params.count();
        for (var key in params.sorting()) {
            url = url.concat('&sort=' + key + ',' + params.sorting()[key]);
        }
        if (params.page()>= 1) {
            url = url.concat('&page=' + (params.page() - 1));
        }
        return $http.get(url);
    };

    //inregistrari
    factory.registerStudent = function (object, fac_name, inst_name) {
        return $http.post('/api/registerStudent/' + fac_name + '/' + inst_name, object);
    };
    factory.registerInstitution = function (object) {
        return $http.post('/api/registerInstitution/', object);
    };
    factory.registerFacultate = function (object, inst_name) {
        return $http.post('/api/registerFacultate/' + inst_name, object);
    };

    //iradieri
    factory.deleteStudent = function (id) {
        return $http.delete('/api/deleteStudent/' + id);
    };
    factory.deleteInstitution = function (id) {
        return $http.delete('/api/deleteInstitution/' + id);
    };
    factory.deleteFacultate = function (id) {
        return $http.delete('/api/deleteFacultate/' + id);
    }

    return factory;
});
