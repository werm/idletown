'use strict';

angular.module('clickerApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, $interval, socket) {
    $scope.awesomeThings = [];

    $scope.totalMoney = parseInt(0, 10).toFixed(2);

    // HUTS
    $scope.hasHut = false;
    $scope.canBuyHut = false;
    $scope.totalHuts = 0;
    // CABINS
    $scope.hasCabin = false;
    $scope.canBuyCabin = false;
    $scope.totalCabins = 0;

    $scope.increment = function(){
      $scope.totalMoney++
      if($scope.totalMoney >= 50){
        document.getElementById('buyHut').removeAttribute('disabled');
      }
      if($scope.totalMoney >= 100){
        document.getElementById('buyCabin').removeAttribute('disabled');
      }
    }

    $scope.buyHut = function(){
      $scope.totalMoney = $scope.totalMoney - 50;
      $scope.hasHut = true;
      checkTotals();
      $scope.totalHuts++;
    }

    $scope.buyCabin = function(){
      $scope.totalMoney = $scope.totalMoney - 100;
      $scope.hasCabin = true;
      checkTotals();
      $scope.totalCabins++;
    }

    $interval(function() {
      checkTotals();
      if($scope.hasHut === true){
        $scope.totalMoney = $scope.totalMoney + ($scope.totalHuts * 0.025);
      }
      if($scope.hasCabin === true){
        $scope.totalMoney = $scope.totalMoney + ($scope.totalCabins * 0.1);
      }
    }, 100);

     function checkTotals(){
      $scope.income = ($scope.totalHuts * 0.25) + ($scope.totalCabins);
      if($scope.totalMoney >= 50){
        document.getElementById('buyHut').removeAttribute('disabled');
      } else {
        document.getElementById('buyHut').setAttribute('disabled', true);
      }
      if($scope.totalMoney >= 100){
        document.getElementById('buyCabin').removeAttribute('disabled');
      } else {
        document.getElementById('buyCabin').setAttribute('disabled', true);
      }
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
