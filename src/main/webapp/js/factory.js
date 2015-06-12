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
    factory.registerStudent = function (object, id) {
        return $http.post('/api/registerStudent/' + id, object);
    };
    //INSTITUTIONS
    factory.registerInstitution = function (object) {
        return $http.post('/api/registerInstitution', object);
    };
    //factory.allInstitutions = function (params) {
    //    var url = '/api/institutions?size=' + params.count();
    //    //sort by id
    //    for (var key in params.sorting()) {
    //        url = url.concat('&sort=' + key + ',' + params.sorting()[key]);
    //    }
    //    if (params.page() >= 1) {
    //        url = url.concat('&page=' + (params.page() - 1));
    //    }
    //    return $http.get(url);
    //};
    factory.allInstitutions = function () {
        return $http.get('/api/institutions');
    };
    factory.deleteStudent = function (id) {
        return $http.delete('/api/deleteStudent/' + id);
    }

    return factory;
});
