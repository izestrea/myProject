/**
 * Created by user on 05.06.2015.
 */
app.controller('StudentController', function ($scope, AppFactory, ngTableParams) {
    $scope.student = {};
    //AppFactory.allStudents().success(function (data) {
    //   $scope.allStudents = data.content;
    //    alert($scope.allStudents);
    //});
    $scope.saveStudent = function () {
        AppFactory.registerStudent($scope.student)
            .success(function () {
                console.log("salvat!");
                $scope.student = {};
            })
            .error(function () {
                console.log("eroare!");
            });
    };

    $scope.studentTable = new ngTableParams({
        page: 1,            // show first page
        count: 5,         // count per page
        sorting: {
            id: 'asc'     // initial sorting
        }
    }, {
        getData: function ($defer, params) {
            AppFactory.allStudents(params).success(function (data) {
                params.total(data.totalElements);
                params.page(data.number + 1);
                // set new data
                $defer.resolve(data.content);

            }).error(function () {
                alert("FAIL load data");
            });
        }
    });

});