angular.module('reportApp').controller('downloadController', function ($http, $scope) {
    const mainPort = ':8082';
    const queuePort = ':8099';
    const serverPath = 'http://localhost';

    $scope.downloadReport = function () {
        $http.post(serverPath + mainPort + '/download', $scope.dlPeriod)
            .then (function successCallback(response) {
                let file = new Blob([response.data], {type: 'text/csv'});
                let url = window.URL || window.webkitURL;
                let downloadLink = angular.element('<a></a>');
                let filename = $scope.dlPeriod.year
                    + '_' + $scope.dlPeriod.month
                    + '_' + $scope.dlPeriod.queue
                    + '.csv';
                downloadLink.attr('href', url.createObjectURL(file));
                downloadLink.attr('target', '_self');
                downloadLink.attr('download', filename);
                downloadLink[0].click();
            }, function failureCallback(response) {
                console.log(response.data);
                alert(response.data.messages);
            });
    };

    $scope.loadQueues = function () {
        $http.get(serverPath + queuePort + '/queues')
            .then(function successCallback(response) {
                $scope.queueList = response.data;
            }, function failureCallback(response) {
                console.log(response.data);
            });
    };

    $scope.loadQueues();
});