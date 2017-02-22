// controller.js
// Application module
angular
    .module('app')
	.controller('invoiceController', invoiceController)
	.controller('invoiceListController', invoiceListController);

invoiceController.$inject = ['$scope', '$http', '$timeout', '$window','$log','$rootScope'];
		function invoiceController($scope, $http, $timeout,$window,$log,$rootScope) {
  			
  			$scope.vm = this;
  			$scope.details = null;
			$scope.apiUrl = 'http://localhost:9000/invoice';

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

			  $scope.invoice =  {
					id: 0,
					orderDate: null,
					orderStatus: null,
					datePayment: null,
					paymentStatus: null,
					shippingDate: null,
					shippingStatus: null,
					total: null,
					discount: null,
					sinal: null,
					cost: null,
					statusProcess: "PROCESSING",
					totalTaxes: null,
					items: []
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
				$http.post($scope.apiUrl, 
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
				$http.delete($scope.apiUrl, JSON.stringify(detail)).success(function(data) {
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
				$http.post($scope.apiUrl, JSON.stringify(detail)).success(function(data) {
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

	invoiceListController.$inject = ['$scope', '$http', '$timeout', '$window','$log', '$rootScope'];
		function invoiceListController($scope, $http, 
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
				$http.get('http://localhost:9000/invoice')
				
				.then(function successCallback(response) {
						$scope.details = response.data;
						
						console.log("Entrou" + response);
						}, function errorCallback(response) {
		    			console.log(response);
		    		});
				
			}
    }
