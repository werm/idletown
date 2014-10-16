'use strict';

angular.module('clickerApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, $interval, socket) {

    $scope.totalMoney = parseInt(0, 10).toFixed(2);
    $scope.totalResidents = 0;

    $scope.collapse = {
      sf: false,
      mf: true
    }

    $scope.prices = {
      tent: 50,
      hut: 100,
      cabin: 150,
      house: 250,
      duplex: 300,
      smApt: 400
    }

    $scope.residents = {
      tent: 1,
      hut: 2,
      cabin: 4,
      house: 5,
      duplex: 8,
      smApt: 12
    }

    $scope.owns = {
      tent: false,
      hut: false,
      cabin: false,
      house: false,
      duplex: false,
      smApt: false
    }

    $scope.total = {
      tent: 0,
      hut: 0,
      cabin: 0,
      house: 0,
      duplex: 0,
      smApt: 0
    }

    $scope.canBuyTent = false;
    $scope.canBuyHut = false;
    $scope.canBuyCabin = false;
    $scope.canBuyHouse = false;
    $scope.canBuyDuplex = false;
    $scope.canBuySmApt = false;

    $scope.increment = function(){
      $scope.totalMoney++
      if($scope.totalMoney >= $scope.prices.tent){
        document.getElementById('buyTent').removeAttribute('disabled');
      } else {
        document.getElementById('buyTent').setAttribute('disabled', true);
      }
      if($scope.totalMoney >= $scope.prices.hut){
        document.getElementById('buyHut').removeAttribute('disabled');
      } else {
        document.getElementById('buyHut').setAttribute('disabled', true);
      }
      if($scope.totalMoney >= $scope.prices.cabin){
        document.getElementById('buyCabin').removeAttribute('disabled');
      } else {
        document.getElementById('buyCabin').setAttribute('disabled', true);
      }
      if($scope.totalMoney >= $scope.prices.house){
        document.getElementById('buyHouse').removeAttribute('disabled');
      } else {
        document.getElementById('buyHouse').setAttribute('disabled', true);
      }
      if($scope.totalMoney >= $scope.prices.duplex){
        document.getElementById('buyDuplex').removeAttribute('disabled');
      } else {
        document.getElementById('buyDuplex').setAttribute('disabled', true);
      }
      if($scope.totalMoney >= $scope.prices.smApt){
        document.getElementById('buySmApt').removeAttribute('disabled');
      } else {
        document.getElementById('buySmApt').setAttribute('disabled', true);
      }
    }

    $scope.buyTent = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.prices.tent;
      $scope.owns.tent = true;
      checkTotals();
      $scope.prices.tent = $scope.prices.tent + ($scope.prices.tent * 0.025);
      $scope.totalResidents = $scope.totalResidents + $scope.residents.tent;
      $scope.total.tent++;
    }

    $scope.buyHut = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.prices.hut;;
      $scope.owns.hut = true;
      checkTotals();
      $scope.prices.hut = $scope.prices.hut + ($scope.prices.hut * 0.025);
      $scope.totalResidents = $scope.totalResidents + $scope.residents.hut;
      $scope.total.hut++;
    }

    $scope.buyCabin = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.prices.cabin;
      $scope.owns.cabin = true;
      checkTotals();
      $scope.prices.cabin = $scope.prices.cabin + ($scope.prices.cabin * 0.025);
      $scope.totalResidents = $scope.totalResidents + $scope.residents.cabin;
      $scope.total.cabin++;
    }

    $scope.buyHouse = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.prices.house;
      $scope.owns.house = true;
      checkTotals();
      $scope.prices.house = $scope.prices.house + ($scope.prices.house * 0.025);
      $scope.totalResidents = $scope.totalResidents + $scope.residents.house;
      $scope.total.house++;
    }

    $scope.buyDuplex = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.prices.duplex;
      $scope.owns.duplex = true;
      checkTotals();
      $scope.prices.duplex = $scope.prices.duplex + ($scope.prices.duplex * 0.025);
      $scope.totalResidents = $scope.totalResidents + $scope.residents.duplex;
      $scope.total.duplex++;
    }

    $scope.buySmApt = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.prices.smApt;
      $scope.owns.smApt = true;
      checkTotals();
      $scope.prices.smApt = $scope.prices.smApt + ($scope.prices.smApt * 0.025);
      $scope.totalResidents = $scope.totalResidents + $scope.residents.smApt;
      $scope.total.smApt++;
    }

    $interval(function() {
      checkTotals();
      updateTitle($scope.totalMoney.toFixed(2))
      if($scope.owns.tent === true){
        $scope.totalMoney = $scope.totalMoney + ($scope.total.tent * 0.01);
      }
      if($scope.owns.hut === true){
        $scope.totalMoney = $scope.totalMoney + ($scope.total.hut * 0.025);
      }
      if($scope.owns.cabin === true){
        $scope.totalMoney = $scope.totalMoney + ($scope.total.cabin * 0.05);
      }
      if($scope.owns.house === true){
        $scope.totalMoney = $scope.totalMoney + ($scope.total.house * 0.075);
      }
      if($scope.owns.duplex === true){
        $scope.totalMoney = $scope.totalMoney + ($scope.total.duplex * 0.1);
      }
      if($scope.owns.smApt === true){
        $scope.totalMoney = $scope.totalMoney + ($scope.total.smApt * 0.125);
      }
    }, 100);

     function checkTotals(){
      $scope.income = ($scope.total.tent * 0.1) + ($scope.total.hut * 0.25) + ($scope.total.cabin * 0.5) + ($scope.total.house * 0.75) + ($scope.total.duplex * 1) + ($scope.total.smApt * 1.25);
      if($scope.totalMoney >= $scope.prices.tent){
        document.getElementById('buyTent').removeAttribute('disabled');
      } else {
        document.getElementById('buyTent').setAttribute('disabled', true);
      }
      if($scope.totalMoney >= $scope.prices.hut){
        document.getElementById('buyHut').removeAttribute('disabled');
      } else {
        document.getElementById('buyHut').setAttribute('disabled', true);
      }
      if($scope.totalMoney >= $scope.prices.cabin){
        document.getElementById('buyCabin').removeAttribute('disabled');
      } else {
        document.getElementById('buyCabin').setAttribute('disabled', true);
      }
      if($scope.totalMoney >= $scope.prices.house){
        document.getElementById('buyHouse').removeAttribute('disabled');
      } else {
        document.getElementById('buyHouse').setAttribute('disabled', true);
      }
      if($scope.totalMoney >= $scope.prices.duplex){
        document.getElementById('buyDuplex').removeAttribute('disabled');
      } else {
        document.getElementById('buyDuplex').setAttribute('disabled', true);
      }
      if($scope.totalMoney >= $scope.prices.smApt){
        document.getElementById('buySmApt').removeAttribute('disabled');
      } else {
        document.getElementById('buySmApt').setAttribute('disabled', true);
      }
    }

    function updateTitle(val){
      document.title = '$' + val;
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
