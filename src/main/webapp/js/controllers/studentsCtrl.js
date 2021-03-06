/**
 * Created by user on 05.06.2015.
 */

// create the controller and inject Angular's $scope
app.controller('studentsCtrl', function ($scope, $modal, $log, AppFactory, ngTableParams, toaster) {
    $scope.student = {};
    $scope.saveStudent = function () {
        console.log($scope.facultati);
        AppFactory.registerStudent($scope.student, $scope.facultati, $scope.institution)
            .success(function () {
                console.log("saved!");
                $scope.studentTable.reload();
                $scope.student = {};
                //$scope.institutions = {};
                //$scope.facultatile = {};
                toaster.pop('success', "", "Student adaogat cu succes!");
            })
            .error(function () {
                console.log("error! data is not saved!");
                toaster.pop('error', "", "Eroare");
            })
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
    $scope.submitForm = function (isValid) {
        scope.submitted = true;
        // check to make sure the form is completely valid
        if (isValid) {
            alert('form is validated');
        }
    };
   //institution dropdown list
    AppFactory.allInstitutions().success(function (data) {
        $scope.institutions = data;
    })
    AppFactory.allFacultati().success(function (data) {
        $scope.facultatile = data;
    })
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
        $scope.facultati = data.facultate.numeFacultate;
        console.log(data);
    }
    $scope.clear = function () {
        toaster.clear();
    };
    //modal
    app.config(function ($modalProvider) {
        angular.extend($modalProvider.defaults, {
            html: true
        });
    });
    $scope.animationsEnabled = true;
    $scope.testModal = function (id) {
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'partials/stmodal.html',
            size: 'sm',
            backdrop: true,
            keyboard: true,
            modalFade: true,
            windowClass: 'modal',
            controller: 'modalCtrl'
        }).result.then(function () {
            AppFactory.deleteStudent(id).success(function () {
                console.log("student delete " + id);
                $scope.studentTable.reload();
            })
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});
//modal controller
app.controller('modalCtrl', function ($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})