(function () {
    angular
        .module('reportApp', ['ngRoute', 'ngStorage'])
        .config(config)
        .run(run);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/daily.html',
                controller: 'dailyController'
            })
            .when('/call/:eventId', {
                templateUrl: 'templates/call.html',
                controller: 'callDisplayController'
            })
            .when('/stats', {
                templateUrl: 'templates/statistic.html',
                controller: 'statController'
            })
            .when('/download', {
                templateUrl: 'templates/report_download.html',
                controller: 'downloadController'
            })
            .when('/queue_admin', {
                templateUrl: 'templates/qAdmin.html',
                controller: 'qAdminController'
            })
            .when('/user_access', {
                templateUrl: 'templates/uAdmin.html',
                controller: 'uAdminController'
            })
            .when('/welcome', {
                templateUrl: 'templates/welcome.html',
                controller: 'welcomeController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    function run($rootScope, $http, $localStorage) {
        if ($localStorage.appUser) {
            try {
                let jwt = $localStorage.appUser.token;
                let payload = JSON.parse(atob(jwt.split('.')[1]));
                let currentTime = parseInt(new Date().getTime() / 1000);
                console.log("Payload: " + payload.roles);
                if (currentTime > payload.exp) {
                    console.log("Token is expired!");
                    delete $localStorage.appUser;
                    $http.defaults.headers.common.Authorization = '';
                }
            } catch (e) {
                console.log("Error: " + e);
            }

            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.appUser.token;
        }
    }
})();

angular
    .module('reportApp')
    .controller('indexController', function ($rootScope, $scope, $http, $location, $localStorage) {
        const serverPath = 'http://localhost:8082';

        $scope.authenticate = function () {
            $http.post(serverPath + '/auth', $scope.user)
                .then(function successCallback(response) {
                    if (response.data.token) {
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                        $localStorage.appUser = {username: $scope.user.username, token: response.data.token};

                        $scope.user.username = null;
                        $scope.user.password = null;

                        $scope.getUsername();
                        $location.path('/');
                    }
                }, function failureCallback(response) {
                    console.log('Error: ' + response.data);
                });
        }

        $scope.getUsername = function () {
            if ($localStorage.appUser) {
                $scope.appUsername = $localStorage.appUser.username;
            } else {
                $scope.appUsername = 'Not Authenticated!';
            }
        };

        $rootScope.logout = function () {
            $scope.clearUser();
            $location.path('/');
        }

        $scope.isAuthorized = function () {
            if ($localStorage.appUser) {
                return true;
            } else {
                return false;
            }
        }

        $scope.clearUser = function () {
            delete $localStorage.appUser;
            $http.defaults.headers.common.Authorization = '';
            $scope.appUsername = null;
        }
    });