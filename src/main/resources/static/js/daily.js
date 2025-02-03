angular.module('reportApp').controller('dailyController', function ($http, $scope, $localStorage) {
    // const serverPath = 'http://localhost';

    $scope.isListener = function () {
        if ($localStorage.appUser.username.toLowerCase() === 'pachkoriyaao') {
            return true;
        } else {
            return false;
        }
    }

    $scope.detailedSearch = function (page) {
        $scope.newDate.page = page;
        // $http.post('http://localhost:8082/report/daily', $scope.newDate)
        $http.post('http://ac-rj-01:8082/report/daily', $scope.newDate)
            .then(function successCallback(response) {
                $scope.DetailedCallsList = response.data;
            }, function failureCallback(response) {
                console.log(response.data);
                alert(response.data.messages);
            });
    };

    $scope.loadQueues = function () {
        // $http.get(serverPath + ':8099/queues')
        $http.get('http://ac-rj-01:8099/queues')
            .then(function successCallback(response) {
                $scope.queueList = response.data;
            }, function failureCallback(response) {
                console.log(response.data);
            });
    };

    $scope.setLStatus = function (callId, statusId) {
        $http({
            url: 'http://ac-rj-01:8082/report/lstatus',
            method: 'GET',
            params: {
                callId: callId,
                statusId: statusId
            }
        }).then (function successCallback() {
            $scope.detailedSearch($scope.newDate.page);
        }, function failureCallback(response) {
            console.log(response.data);
        });
    };

    $scope.loadQueues();
});