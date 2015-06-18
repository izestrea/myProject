/**
 * Created by user on 05.06.2015.
 */

// create the controller and inject Angular's $scope
app.controller('studentsCtrl', function ($scope, AppFactory, ngTableParams, toaster) {
    $scope.student = {};

    $scope.saveStudent = function () {
        AppFactory.registerStudent($scope.student, $scope.institution)
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
    //table
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
            alert('form is validated');
        }
    };
    // data picker
    $scope.openDatePicker = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    //institution dropdown list
    AppFactory.allInstitutions().success(function (data) {
        $scope.institutions = data;
    })
    //institution dropdown pageable
    //$scope.selectInstitution = function (id) {
    //    $scope.student.inst_id = id;
    //    console.log(id);
    //}
    //delete student
    $scope.deleteStudent = function (id) {
        AppFactory.deleteStudent(id).success(function () {
            console.log("student delete " + id);
            $scope.studentTable.reload();
        })
    }

    //form+table+edit+save
    $scope.updateStudent = function (id) {
        AppFactory.updateStudent(id).success(function () {
            console.log("student update " + id);
            $scope.studentTable.reload();
        })
    }
    $scope.getStudent = function (data) {
        $scope.student = data;
        $scope.institution = data.institution.institutionName;
        console.log(data);
    }
    $scope.pop = function(){
        toaster.pop('success', "title", "text");
    };
    $scope.clear = function(){
        toaster.clear();
    };
});