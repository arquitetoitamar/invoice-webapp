// controller.js
// Application module
angular
    .module('app')
	.controller('itemController', itemController)
	.controller('itemListController', itemListController);

itemController.$inject = ['$scope', '$http', '$timeout', '$window','$log','$rootScope'];
		function itemController($scope, $http, $timeout,$window,$log,$rootScope) {
  			
  			$scope.vm = this;
  			$scope.details = null;
			$scope.term = '';


  			$scope.cliente =  {
			      name : "",
			      email : "",
			      phone : "",
					cel : "",
					address : "",
					gender : "",
					document : "",
					nickname : "",
					note : "",
					createDate : new Date()
		     
		      }
			$scope.item = {
					id: 0,
					dateCreate: new Date(),
					dateUpdate: null,
					name: "",
					ncm: null,
					description: null,
					brand: null,
					category: null,
					url: null,
					statusProcess: "PROCESSED",
					price: "",
					cost: null,
					sku: null,
					thumbnail: null
			}

			// Function to get employee details from the database
			init();
			function init() {
				$log.log("stating aplication");
				$scope.insert = false;
			}
			$scope.localSearch = function() {
				console.log($scope.term);
				$scope.details = [];
				if($scope.term.length > 2) {
					$http.get('http://localhost:9000/item?nome='+$scope.term)
				
				     .then(function successCallback(response) {
							//response.data;
							$scope.details = response.data;
							//console.log(reponse.data);
						}, function errorCallback(response) {
		    				console.log(response);
		    		});
				} else {
					$scope.details = [];
				}
				
			};

			$scope.setPage = function (pageNo) {
    			$scope.currentPage = pageNo;
  			};
  			$scope.pageChanged = function() {
    			$log.log('Page changed to: ' + $scope.currentPage);
  			};

			$scope.exportHref = '';
			// Setting default value of gender
			$scope.empInfo = {
				'gender' : 'male'
			};
			// Enabling show_form variable to enable Add employee button
			$scope.show_form = true;
			// Function to add toggle behaviour to form
			$scope.formToggle = function() {
				$('#empForm').slideToggle();
				$('#editForm').css('display', 'none');
			}
			$scope.insertInfo = function(info) {
				$http.post('http://localhost:9000/item', 
					JSON.stringify(info)).then(function(data) {
						$rootScope.$broadcast('updateList');
						init();
				});
			}
			$scope.testList = function() {
				
				$rootScope.$broadcast('updateList');
			}
			$scope.format = function(text) {
				var position = text.indexOf(":");
				
				return text.substring(position + 1, text.length);
			}
			$scope.deleteInfo = function(detail) {
				detail.emp_id = $scope.format(detail.$$hashKey);
				detail.$$hashKey = null;
				console.log("excluindo: "+JSON.stringify(detail));
				$http.delete('http://localhost:9000/item', JSON.stringify(detail)).success(function(data) {
					if (data == true) {
						getInfo();
					}
				});
			}
			$scope.currentUser = {};
			$scope.editInfo = function(info) {
				$scope.currentUser = info;
				$('#empForm').slideUp();
				$('#editForm').slideToggle();
			}
			$scope.UpdateInfo = function(detail) {
				$http.post('/employer', JSON.stringify(detail)).success(function(data) {
					$scope.show_form = true;
					if (data == true) {
						getInfo();
					}
				});
			}
			$scope.updateMsg = function(emp_id) {
				$('#editForm').css('display', 'none');
			}
			
		

	}

	itemListController.$inject = ['$scope', '$http', '$timeout', '$window','$log', '$rootScope'];
		function itemListController($scope, $http, 
			$timeout,$window,$log, $rootScope) {
  			
  			$scope.details = null;
  			$scope.loadList = getInfo();
			// Function to get employee details from the database
			getInfo();
			$rootScope.$on("updateList", function(){
				console.log("update list");
           		getInfo();
        	});

			function getInfo() {
				$http.get('http://localhost:9000/item?page=0&size=20')
				
				.then(function successCallback(response) {
						$scope.details = response.data;
						
						console.log(response);
						}, function errorCallback(response) {
		    			console.log(response);
		    		});
				
			}
    }
