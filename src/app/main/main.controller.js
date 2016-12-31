(function() {
  'use strict';

  angular
    .module('one')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $scope, $mdToast) {
    var vm = this;
    vm.errorMessage = "No Record found";
    vm.showError = false;
    vm.graphs = [];
    vm.graphOf = [];
    vm.numberToBeSearched = '';
    vm.q = [];
    vm.paths = [];
    vm.awesomeThings = [];
    $scope.doBfs = doBfs;
    vm.creationDate = 1483130431087;
    var tree = new TreeLookup();
    

    function doBfs() {
      /// get all the trees
      vm.paths = [];
      tree.getChildrenAsPromise('')
      .then(function(data){ 
        vm.graphs = data;
        vm.q = data;
        //got graphs
        _.forEach(vm.q,formGraphs);
        console.log('completed');

      },function(error) {
        vm.showError = true;
      });

    }

    function formGraphs(parent) {
      if(!parent){
        return;
      }
      vm.q.shift();
      vm.graphOf[parent] = [];
      return tree.getChildrenAsPromise(parent)
      .then(function(data){ 
        _.forEach(data, function(child) {
          if(child === vm.numberToBeSearched){
            nodeFound(parent + '/' + child);
          }
          vm.q.push(parent + '/' + child);
          vm.graphOf[parent].push(parent + '/' + child);
           _.forEach(vm.q,formGraphs);
        });
      },function(error) {
        vm.showError = true;
      });
    }
    function nodeFound(path) {
      vm.paths.push(path);
      $mdToast.show(
      $mdToast.simple()
        .textContent(path)
        .position('left')
        .hideDelay(3000)
      );
      console.log('>>>>>>>>>>>>>>>>>>>>>paths ');
      console.log(vm.paths);
    }
  }
})();
