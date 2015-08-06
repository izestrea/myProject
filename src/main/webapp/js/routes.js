/**
 * Created by user on 08.06.2015.
 */
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: '/partials/dashboard.html'
        })

        // HOME STATES AND NESTED VIEWS
        .state('home', {
            url: '/home',
            templateUrl: '/partials/home.html'
        })
        .state('facultati', {
            url: '/facultati',
            templateUrl: '/partials/facultati.html'
        })

        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: '/partials/home-list.html',
            controller: 'homeListCtrl'
        })

        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'Nested list with just some random string data.'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS
        .state('about', {
            url: '/about',
            //templateUrl: '/partials/about.html'
            views: {
                // the main template will be placed here (relatively named)
                '': { templateUrl: '/partials/about.html' },
                // the child views will be defined here (absolutely named)
                'columnOne@about': { template: 'Look I am a column!' },
                // for column two, we'll define a separate controller
                'columnTwo@about': {
                    templateUrl: '/partials/table-data.html',
                    controller: 'aboutCtrl'
                }
            }
        })

        .state('students', {
            url: '/students',
            templateUrl: '/partials/students.html',
            controller: 'studentsCtrl'
        })

        .state('institutions', {
            url: '/institutions',
            templateUrl: '/partials/institutions.html',
            controller: 'institutionsCtrl'
        })
        //.state('editable-row', {
        //    url: '/editable-row.html',
        //    templateUrl: '/partials/editable-row.html',
        //    controller: 'EditableRowCtrl'
        //})
})