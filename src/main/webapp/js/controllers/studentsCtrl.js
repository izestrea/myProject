/**
 * Created by user on 05.06.2015.
 */

// create the controller and inject Angular's $scope
app.controller('studentsCtrl', function ($scope,  $modal, $log, AppFactory, ngTableParams, toaster) {
    $scope.student = {};
    $scope.saveStudent = function () {
        AppFactory.registerStudent($scope.student, $scope.institution)
            .success(function () {
                console.log("saved!");
                $scope.studentTable.reload();
                $scope.student = {};
                toaster.pop('success', "", "Student adaogat cu succes!");
            })
            .error(function () {
                console.log("error! data is not saved!");
                toaster.pop('error', "", "Eroare");
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
    $scope.testModal = function () {
        $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'partials/stmodal.html',
            size: 'sm',
            backdrop: true,
            keyboard: true,
            modalFade: true,
            windowClass: 'modal',
            //controller: function ($scope, $modalInstance, $log) {
            //    $scope.ok = function () {
            //        $log.log('Submiting user info.');
            //        $modalInstance.dismiss('cancel');
            //    }
            //    $scope.cancel = function () {
            //        $modalInstance.dismiss('cancel');
            //    };
            //}
        });
        $scope.close = function () {
            $modalInstance.close("Someone Closed Me");
        };
        $scope.ok = function () {
            $modalInstance.close();
        };
    };

        //modalInstance.result.then(function (selectedItem) {
        //    $scope.selected = selectedItem;
        //}, function () {
        //    $log.info('Modal dismissed at: ' + new Date());
        //});
        //$scope.toggleAnimation = function () {
        //    $scope.animationsEnabled = !$scope.animationsEnabled;
        //};
});