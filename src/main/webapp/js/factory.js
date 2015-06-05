/**
 * Created by user on 05.06.2015.
 */
var app = angular.module('example', []);

app.factory('AppFactory', function ($http) {
    var factory = {};
    factory.allStudents = function () {
        return $http.get('/api/students');
    };
    factory.registerStudent = function (object) {
        return $http.post('/api/registerStudent', object);
    };
    return factory;
});
