'use strict';

angular.module('clickerApp')
  .controller('MainCtrl', function ($scope, $rootScope, $http, $timeout, $interval, socket) {

    $scope.dev = false;
    $scope.devMoney = 0;

    $scope.totalMoney = parseInt(0, 10).toFixed(2);
    $scope.totalResidents = 0;
    $scope.income = 0;
    $scope.taxRate = 0;

    $scope.sliderOpts = {
      from: 0,
      to: 100,
      step: 0.1,
      dimension: "%"        
    };

    $scope.collapse = {
      sf: false,
      mf: true
    }

    $scope.building = {
      tent: {
        name: 'Tent',
        price: 50,
        income: parseFloat(0.1),
        owns: false,
        residents: 1,
        total: 0,
        canBuy: false,
        disabled: true
      },
      hut: {
        name: 'Hut',
        price: parseFloat(100),
        income: parseFloat(0.25),
        owns: false,
        residents: 2,
        total: 0,
        canBuy: false,
        disabled: true
      },
      cabin: {
        name: 'Cabin',
        price: parseFloat(150),
        income: parseFloat(0.5),
        owns: false,
        residents: 4,
        total: 0,
        canBuy: false,
        disabled: true
      },
      house: {
        name: 'House',
        price: parseFloat(250),
        income: parseFloat(0.75),
        owns: false,
        residents: 5,
        total: 0,
        canBuy: false,
        disabled: true
      },
      duplex: {
        name: 'Duplex',
        price: parseFloat(300),
        income: parseFloat(1),
        owns: false,
        residents: 8,
        total: 0,
        canBuy: false,
        disabled: true
      },
      smApt: {
        name: 'Small Apartment',
        price: parseFloat(400),
        income: parseFloat(1.25),
        owns: false,
        residents: 8,
        total: 0,
        canBuy: false,
        disabled: true
      },
      mdApt: {
        name: 'Medium Apartment',
        price: parseFloat(600),
        income: parseFloat(1.75),
        owns: false,
        residents: 12,
        total: 0,
        canBuy: false,
        disabled: true
      },
      lgApt: {
        name: 'Large Apartment',
        price: parseFloat(1000),
        income: parseFloat(2.25),
        owns: false,
        residents: 18,
        total: 0,
        canBuy: false,
        disabled: true
      },
      aptComplex: {
        name: 'Apartment Complex',
        price: parseFloat(2000),
        income: parseFloat(2.25),
        owns: false,
        residents: 36,
        total: 0,
        canBuy: false,
        disabled: true
      }
    }

    function disableBtns() {
      angular.forEach($scope.building, function(v,k){
        if($scope.totalMoney >= v.price){
          v.disabled = false
        } else {
          v.disabled = true
        }
      }) 
    }

    function getIncome(){
      var totalRes = 0;
      var inc = 0;
      var res = []

      angular.forEach($scope.building, function(k,v){
        if(k.owns === true){
          res.push(k.residents)
        }
      })
      angular.forEach(res, function(v, k){
        totalRes += v
      })
      $scope.income = parseFloat($scope.totalResidents * 0.1).toFixed(2);
    }

    function getClick(e){
      var posx = 0;
      var posy = 0;
      if (!e) var e = window.event;
      if (e.pageX || e.pageY)   {
        posx = e.pageX;
        posy = e.pageY;
      }
      else if (e.clientX || e.clientY)  {
        posx = e.clientX + document.body.scrollLeft
          + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop
          + document.documentElement.scrollTop;
      }

    }

    $scope.increment = function($event){
      $scope.totalMoney++
      disableBtns();
    }

    $scope.buyTent = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.building.tent.price;
      $scope.building.tent.owns = true;
      $scope.building.tent.price = $scope.building.tent.price + ($scope.building.tent.price * 0.01);
      $scope.totalResidents = $scope.totalResidents + $scope.building.tent.residents;
      $scope.building.tent.total++;
      getIncome()
    }

    $scope.buyHut = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.building.hut.price;
      $scope.building.hut.owns = true;
      $scope.building.hut.price = $scope.building.hut.price + ($scope.building.hut.price * 0.01);
      $scope.totalResidents = $scope.totalResidents + $scope.building.hut.residents;
      $scope.building.hut.total++;
      getIncome()
    }

    $scope.buyCabin = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.building.cabin.price;
      $scope.building.cabin.owns = true;
      $scope.building.cabin.price = $scope.building.cabin.price + ($scope.building.cabin.price * 0.01);
      $scope.totalResidents = $scope.totalResidents + $scope.building.cabin.residents;
      $scope.building.cabin.total++;
      getIncome()
    }

    $scope.buyHouse = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.building.house.price;
      $scope.building.house.owns = true;
      $scope.building.house.price = $scope.building.house.price + ($scope.building.house.price * 0.01);
      $scope.totalResidents = $scope.totalResidents + $scope.building.house.residents;
      $scope.building.house.total++;
      getIncome()
    }

    $scope.buyDuplex = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.building.duplex.price;
      $scope.building.duplex.owns = true;
      $scope.building.duplex.price = $scope.building.duplex.price + ($scope.building.duplex.price * 0.01);
      $scope.totalResidents = $scope.totalResidents + $scope.building.duplex.residents;
      $scope.building.duplex.total++;
      getIncome()
    }

    $scope.buySmApt = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.building.smApt.price;
      $scope.building.smApt.owns = true;
      $scope.building.smApt.price = $scope.building.smApt.price + ($scope.building.smApt.price * 0.01);
      $scope.totalResidents = $scope.totalResidents + $scope.building.smApt.residents;
      $scope.building.smApt.total++;
      getIncome()
    }

    $scope.buyMdApt = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.building.mdApt.price;
      $scope.building.mdApt.owns = true;
      $scope.building.mdApt.price = $scope.building.mdApt.price + ($scope.building.mdApt.price * 0.01);
      $scope.totalResidents = $scope.totalResidents + $scope.building.mdApt.residents;
      $scope.building.mdApt.total++;
      getIncome()
    }
    $scope.buyLgApt = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.building.lgApt.price;
      $scope.building.lgApt.owns = true;
      $scope.building.lgApt.price = $scope.building.lgApt.price + ($scope.building.lgApt.price * 0.01);
      $scope.totalResidents = $scope.totalResidents + $scope.building.lgApt.residents;
      $scope.building.lgApt.total++;
      getIncome()
    }

    $scope.buyAptComplex = function(){
      $scope.totalMoney = $scope.totalMoney - $scope.building.aptComplex.price;
      $scope.building.aptComplex.owns = true;
      $scope.building.aptComplex.price = $scope.building.aptComplex.price + ($scope.building.aptComplex.price * 0.01);
      $scope.totalResidents = $scope.totalResidents + $scope.building.aptComplex.residents;
      $scope.building.aptComplex.total++;
      getIncome()
    }

    $interval(function() {
      disableBtns();
      var totalBldg = []
      var totalInc = []
      angular.forEach($scope.building, function(k,v){
        if(k.owns === true){
          $scope.totalMoney = $scope.totalMoney + ($scope.income * 0.1);
        }
      })
    }, 100);

    $scope.getTaxRate = function(){
      console.log($scope.taxRate);
    }

    $scope.devMode = function(){
      if($scope.dev === false){
        $scope.dev = true;
        if($scope.devMoney === 0){
          $scope.totalMoney = 10000;
        } else {
          $scope.devMoney = $totalMoney;
        }
      } else if($scope.dev === true){
        $scope.dev = false;
        $scope.totalMoney = $scope.devMoney
      }
    }

    function updateTitle(val){
      document.title = '$' + val;
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
