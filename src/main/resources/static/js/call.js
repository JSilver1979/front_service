angular.module('reportApp').controller('callDisplayController', function ($scope, $routeParams, $http) {
    const serverPath = 'http://localhost:8082/report';

    $scope.loadCall = function () {
        $http.get(serverPath + '/call/' + $routeParams.eventId)
            .then(function successCallback(response) {
                $scope.callDetails = response.data;
                $scope.getHistory();
            }, function failureCallback(response) {
                console.log(response.data);
            });
    };

    $scope.getHistory = function () {
        $http.get(serverPath + '/history/' + $scope.callDetails.number + '/' + $scope.callDetails.date)
            .then(function successCallback(response) {
                $scope.historyList = response.data;
            }, function failureCallback(response) {
                console.log(response.data);
            });
    };

    $scope.set_color = function (row, call) {
        if (row === call) {
            return {background: 'aliceblue'}
        }
    };

    $scope.setRecall = function (status) {
        $http({
            url: serverPath + '/recall',
            method: 'GET',
            params: {
                callId: $routeParams.eventId,
                status: status
            }
        }).then (function successCallback() {
            $scope.loadCall();
        }, function failureCallback(response) {
            console.log(response.data);
        });
    };

    $scope.loadCall();
});