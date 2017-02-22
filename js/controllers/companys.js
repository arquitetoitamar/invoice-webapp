// controller.js
// Application module
angular
    .module('app')
	.controller('companyController', companyController)
	.controller('companyListController', companyListController);

companyController.$inject = ['$scope', '$http', '$timeout', '$window','$log','$rootScope'];
		function companyController($scope, $http, $timeout,$window,$log,$rootScope) {
  			
  			$scope.vm = this;
  			$scope.details = null;


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

			// Function to get employee details from the database
			init();
			function init() {
				$log.log("stating aplication");
				$scope.insert = false;
			}


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
				$http.post('http://backlaporta.solucaodeti.com:9001/customers', 
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
				$http.delete('/employer', JSON.stringify(detail)).success(function(data) {
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

	companyListController.$inject = ['$scope', '$http', '$timeout', '$window','$log', '$rootScope'];
		function companyListController($scope, $http, 
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
				$http.get('http://backlaporta.solucaodeti.com:9001/customers?page=0&size=20')
				
				.then(function successCallback(response) {
						$scope.details = response.data;
						
						console.log(response);
						}, function errorCallback(response) {
		    			console.log(response);
		    		});
				
			}
    }
