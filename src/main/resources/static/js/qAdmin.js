angular.module('reportApp').controller('qAdminController', function ($http, $scope, $location) {
    const serverPath = 'http://localhost:8082/queues';

    $scope.addQueue = function () {
        $http.post(serverPath + '/add', $scope.newQueue)
            .then(function successCallback() {
                $scope.getQueues();
                $scope.newQueue = {};
                $scope.queueForm.$setPristine;
                $scope.queueForm.$setUntouched;
            }, function failureCallback(response) {
                console.log(response.data);
                alert(response.data.messages);
            });
    };

    $scope.deleteQueue = function (queueId) {
        $http.delete(serverPath + '/delete' + queueId)
            .then(function successCallback(response) {
                $scope.getQueues();
            }, function failureCallback(response) {
                console.log(response.data);
            });
    };

    $scope.update = function () {
        $http.post(serverPath + '/update', $scope.updateQueue)
            .then(function successCallback() {
                $scope.getQueues();
                $scope.updateQueue = {};
                $scope.showUpdate = false;
            }, function failureCallback(response) {
                console.log(response.data);
            });
    };

    $scope.getQueues = function () {
        $http.get(serverPath)
            .then(function successCallback(response) {
                $scope.queues = response.data;
            }, function failureCallback(response) {
                console.log(response.data);
                alert(response.data.status + ': ' + response.data.error);
                $location.path('/');
            });
    };
    $scope.getQueues();
});