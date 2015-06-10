/**
 * Created by user on 10.06.2015.
 */
app.controller('institutionsCtrl', function ($scope, AppFactory, ngTableParams) {
    $scope.institution = {};

    $scope.saveInstitution = function () {
        AppFactory.registerInstitution($scope.institution)
            .success(function () {
                console.log("save!");
                //$scope.institutionTable.reload();
                $scope.institution = {};
            })
            .error(function () {
                console.log("error!");
            });
        $scope.institution = {};
    };

    $scope.institutionTable = new ngTableParams({
        page: 1,            // show first page
        count: 25,         // count per page
        sorting: {
            id: 'asc'     // initial sorting
        }
    }, {
        getData: function ($defer, params) {
            AppFactory.allInstitutions(params).success(function (data) {
                params.total(data.totalElements);
                params.page(data.number + 1);
                // set new data
                $defer.resolve(data.content);

            }).error(function () {
                console.log("FAIL load data");
            });
        }
    });
});