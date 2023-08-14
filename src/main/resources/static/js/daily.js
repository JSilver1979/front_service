angular.module('reportApp').controller('dailyController', function ($http, $scope) {
    const serverPath = 'http://localhost';

    $scope.detailedSearch = function (page) {
        $scope.newDate.page = page;
        $http.post('http://localhost:8082/report/daily', $scope.newDate)
            .then(function successCallback(response) {
                $scope.DetailedCallsList = response.data;
            }, function failureCallback(response) {
                console.log(response.data);
                alert(response.data.messages);
            });
    };

    $scope.loadQueues = function () {
        $http.get(serverPath + ':8099/queues')
            .then(function successCallback(response) {
                $scope.queueList = response.data;
            }, function failureCallback(response) {
                console.log(response.data);
            });
    }

    $scope.loadQueues();
});