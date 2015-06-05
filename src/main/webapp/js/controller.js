/**
 * Created by user on 05.06.2015.
 */
app.controller('StudentController', function($scope, AppFactory){
    $scope.student = {};
    AppFactory.allStudents().success(function (data) {
       $scope.students = data;
    });
    $scope.saveStudent = function () {
        AppFactory.registerStudent($scope.student)
            .success(function () {
                console.log("salvat!");
                $scope.student = {};
        })
            .error(function () {
                console.log("eroare!");
            });
    }
});