/**
 * Created by user on 05.06.2015.
 */
app.factory('AppFactory', function ($http) {
    var factory = {};
    //factory.allStudents = function () {
    //    return $http.get('/api/students');
    //};
    //STUDENTS
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
    factory.registerStudent = function (object) {
        return $http.post('/api/registerStudent', object);
    };
    //INSTITUTIONS
    factory.registerInstitution = function (object) {
        return $http.post('/api/registerInstitution', object);
    };
    factory.allInstitutions = function (params) {
        var url = '/api/institutions?size=' + params.count();
        //sort by id
        for (var key in params.sorting()) {
            url = url.concat('&sort=' + key + ',' + params.sorting()[key]);
        }
        if (params.page() >= 1) {
            url = url.concat('&page=' + (params.page() - 1));
        }
        return $http.get(url);
    };

    return factory;
});
