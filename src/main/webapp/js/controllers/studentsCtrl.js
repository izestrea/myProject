/**
 * Created by user on 05.06.2015.
 */

// create the controller and inject Angular's $scope
app.controller('studentsCtrl', function ($scope, AppFactory, ngTableParams) {
    $scope.student = {};

    $scope.saveStudent = function () {
        AppFactory.registerStudent($scope.student)
            .success(function () {
                console.log("save!");
                $scope.studentTable.reload();
                $scope.student = {};
            })
            .error(function () {
                console.log("error!");
            });
        $scope.student = {};
    };

    $scope.studentTable = new ngTableParams({
        page: 1,            // show first page
        count: 25,         // count per page
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
                console.log("FAIL load data");
            });
        }
    });

    // function to submit the form after all validation has occurred
    $scope.submitForm = function(isValid) {
        scope.submitted = true;
        // check to make sure the form is completely valid
        if (isValid) {
            alert('our form is amazing');
        }
    };

    $scope.openDatePicker = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
});