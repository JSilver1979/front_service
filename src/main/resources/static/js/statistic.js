angular.module('reportApp').controller('statController', function ($http, $scope) {
    // const mainPort = ':8082';
    // const queuePort = ':8099';
    // const serverPath = 'http://localhost';
    const reportPath = 'http://ac-rj-01:8082';
    const queuePath = 'http://ac-rj-01:8099';

    $scope.searchStats = function () {
        // $http.post(serverPath + mainPort + '/stats', $scope.statDate)
        $http.post(reportPath + '/stats', $scope.statDate)
            .then (function successCallback(response) {
                $scope.Stats = response.data;
            }, function failureCallback(response) {
                console.log(response.data);
                if (response.data.messages) {
                    alert(response.data.messages);
                }
            });
    };

    $scope.loadQueues = function () {
        // $http.get(serverPath + queuePort + '/queues')
        $http.get(queuePath + '/queues')
            .then (function successCallback(response) {
                $scope.queueList = response.data;
            }, function failureCallback(response) {
                console.log(response.data);
            });
    };

    $scope.loadQueues();
});