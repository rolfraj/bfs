(function() {
  'use strict';

  angular
    .module('one')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr, $scope, $mdToast) {
    $scope.errorMessage = "No Record found";
    $scope.showError = false;
    $scope.graphs = [];
    $scope.graphOf = [];
    $scope.numberToBeSearched = '';
    $scope.q = [];
    $scope.paths = [];
    $scope.reach = [];
    $scope.awesomeThings = [];
    $scope.doBfs = doBfs;
    $scope.creationDate = 1483130431087;
    var tree = new TreeLookup();
    

    function doBfs() {
      /// get all the trees
      $scope.showError = false;
      $scope.paths = [];
      $scope.reach = [];
      tree.getChildrenAsPromise('')
      .then(function(data){ 
        $scope.graphs = data;
        $scope.q = data;
        //got graphs
        _.forEach($scope.q,formGraphs);
        console.log('completed');

      },function(error) {
        $scope.showError = true;
      });

    }

    function formGraphs(parent) {
      if(!parent){
        return;
      }
      if(parent === $scope.numberToBeSearched){
        nodeFound(parent);
      }
      $scope.q.shift();
      $scope.graphOf[parent] = [];
      return tree.getChildrenAsPromise(parent)
      .then(function(data){ 
        _.forEach(data, function(child) {
          if(child === $scope.numberToBeSearched){
            nodeFound(parent + '/' + child);
          }
          $scope.q.push(parent + '/' + child);
          $scope.graphOf[parent].push(parent + '/' + child);
           _.forEach($scope.q,formGraphs);

           if(!$scope.reach.length && parent === '7/14'){
              $scope.showError = true;
           }else{
              $scope.showError = false;
           }
           $scope.$apply();
        });
      },function(error) {
        $scope.showError = true;
      });
    }
    function nodeFound(path) {
      $scope.paths.push(path);
      $scope.reach.push(path);
      document.getElementById('input_0').click();
      console.log('>>>>>>>>>>>>>>>>>>>>>paths ');
      console.log($scope.reach);
      $scope.$apply();
    }
  }
})();
