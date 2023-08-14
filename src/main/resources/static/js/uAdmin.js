angular.module('reportApp').controller('uAdminController', function ($http, $scope, $location) {
    const serverPath = 'http://localhost:8082/access';

    $scope.addUser = function () {
        $http.post(serverPath + '/add', $scope.accessUser)
            .then(function successCallback(response) {
                $scope.userList();
                $scope.accessUser = null;
            }, function failureCallback(response) {
                console.log(response.data);
                alert(response.data.messages);
            });
    };

    $scope.deleteUser = function (userId) {
        $http.delete(serverPath + '/delete/' + userId)
            .then(function successCallback() {
                $scope.userList();
            }, function failureCallback(response) {
                console.log(response.data);
            });
    };

    $scope.addRole = function (user, rId) {
        let userRoles = user.roles;
        let isRolePresent = false;
        for(let i = 0; i < userRoles.length; i++) {
            if (userRoles[i].id.toString() === rId) {
                isRolePresent = true;
            }
        }
        if (isRolePresent) {
            alert('пользователь уже состоит в этой группе!');
        } else {
            let Role = {
                userId: user.id,
                roleId: rId
            };
            $http.post(serverPath + '/add_role', Role)
                .then(function successCallback() {
                    $scope.userList();
                }, function failureCallback(response) {
                    console.log(response.data);
                    alert(response.data.messages);
                });
        }
    };

    $scope.removeRole = function (uId, rId) {
        let Role = {
            userId: uId,
            roleId: rId
        };
        $http.post(serverPath + '/remove_role', Role)
            .then(function successCallback() {
                $scope.userList();
            }, function failureCallback(response) {
                console.log(response.data);
            });
    };

    $scope.getUnusedRoles = function (userRoles) {
        let unusedRoles = [];

        for (let i = 0; i < $scope.rolesList.length; i++) {
            let unusedRole = true;
            let userRole = $scope.rolesList[i];

            for (let j = 0; j < userRoles.length; j++) {
                if (userRole.id === userRoles[j].id) {
                    unusedRole = false;
                }
            }

            if(unusedRole) {
                unusedRoles.push(userRole);
            }
        }
        return unusedRoles;
    };

    $scope.getRoles = function () {
        $http.get(serverPath + '/roles')
            .then(function successCallback(response) {
                $scope.rolesList = response.data;
            }, function failureCallback(response) {
                console.log(response.data);
            });
    };

    $scope.userList = function () {
        $http.get(serverPath + '/list')
            .then(function successCallback(response) {
                $scope.allUsers = response.data;
            }, function failureCallback(response) {
                console.log(response.data);
                alert(response.data.error);
                $location.path('/');
            });
    };

    $scope.getRoles();
    $scope.userList();
});