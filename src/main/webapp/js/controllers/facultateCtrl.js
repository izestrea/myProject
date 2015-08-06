/**
 * Created by user on 16.07.2015.
 */
app.controller('facultateCtrl', function ($scope, AppFactory, ngTableParams) {
    $scope.facultati = {};
    $scope.saveFacultate = function () {
        AppFactory.registerFacultate($scope.facultati, $scope.institution)
            .success(function () {
                console.log("facultate inregistrata!");
                $scope.facultateTable.reload();
                $scope.facultati = {};
            })
            .error(function () {
                console.log("inregistrare facultate esuata!");
            })
        $scope.facultati = {};
    };
    $scope.facultateTable = new ngTableParams({
        page: 1,            // show first page
        count: 25,         // count per page
        sorting: {
            id: 'asc'     // initial sorting
        }
    }, {
        getData: function ($defer, params) {
            AppFactory.allFacultatiTable(params).success(function (data) {
                    params.total(data.totalElements);
                    params.page(data.number + 1);
                    // set new data
                    $defer.resolve(data.content);
                }).error(function () {
                    console.log("FAIL load data");
                });
        }
    });
    $scope.deleteFacultate = function (id) {
        AppFactory.deleteFacultate(id).success(function () {
            console.log("Facultate stearsa " + id);
            $scope.facultateTable.reload();
        })
    };
    $scope.updateFacultate = function (id) {
        AppFactory.updateFacultate(id).success(function () {
            console.log("actualizare facultate " + id);
            $scope.facultateTable.reload();
        })
    }
    $scope.getFacultate = function (data) {
        $scope.facultati = data;
        $scope.institution = data.institution.institutionName;
        console.log(data);
    }
    //institution dropdown list
    AppFactory.allInstitutions().success(function (data) {
        $scope.institutions = data;
    });

});