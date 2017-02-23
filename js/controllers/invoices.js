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
			$scope.selectedItem = null;
			$scope.items = [];
			$scope.qtdeItems = 0;
			$scope.termInvoice = null;

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
					orderDate: new Date(),
					orderStatus: null,
					datePayment: null,
					paymentStatus: null,
					shippingDate: null,
					shippingStatus: null,
					total: 0,
					discount: null,
					sinal: null,
					cost: null,
					statusProcess: "PROCESSING",
					totalTaxes: 0,
					customer :  {
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
						
					},
					company : {
							id : 0,
							name : null,
							email : null,
							phone : null,
							cel : null,
							address : null,
							cnae : null,
							document : null,
							nickname : null,
							note : null,
							createDate : null,
					},

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
				console.log(info);
				$http.post('http://localhost:9000/invoice', 
					JSON.stringify(info)).then(function(data) {
						//$rootScope.$broadcast('updateList');
						 $window.location.reload();
				});
			}
			$scope.testList = function() {
				
				$rootScope.$broadcast('updateList');
			}

			$scope.filterByCompanyOrItem = function() {
				
				$rootScope.$broadcast('filterByCompanyOrItem',
				{
					term : $scope.termInvoice
				});
			}

			
			
			$scope.updateItems = function($index) {
				var total =  parseFloat($scope.invoice.total) + ( parseFloat($scope.invoice.items[$index].price)* parseFloat($scope.invoice.items[$index].quantity));
				$scope.invoice.total = total;	
			}

			$scope.removeItem = function($index) {

				var total =  parseFloat($scope.invoice.total) - parseFloat($scope.invoice.items[$index].price);
				$scope.invoice.total = total;
				$scope.qtdeItems = $scope.qtdeItems - 1;
				$scope.invoice.items.splice($index,1);    
			}
			$scope.addItem = function(item) {
				item.quantity = 1;
				var total =  parseFloat($scope.invoice.total) + ( parseFloat(item.price)* parseFloat(item.quantity));
				$scope.qtdeItems += 1;
				$scope.invoice.total = total;
				$scope.invoice.items.push(item);
				$scope.items = [];
				$scope.term = '';
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
			
			$scope.localSearch = function() {
				console.log($scope.term);
				$scope.items = [];
				if($scope.term.length > 2) {
					$http.get('http://localhost:9000/item?nome='+$scope.term)
				
				     .then(function successCallback(response) {
							//response.data;
							$scope.items = response.data;
							//console.log(reponse.data);
						}, function errorCallback(response) {
		    				console.log(response);
		    		});
				} else {
					$scope.items = [];
				}
				
			};

			
			$scope.selectedHandle = function ($item) {
				console.log($item);
				//$item.title // or description, or image - from your angucomplete attribute configuration
				//$item.originalObject // the actual object which was selected
				//this.$parent // the control which caused the change, contains useful things like $index for use in ng-repeat.

			}

	}

	invoiceListController.$inject = ['$scope', '$http', '$timeout', '$window','$log', '$rootScope'];
		function invoiceListController($scope, $http, 
			$timeout,$window,$log, $rootScope) {
  			
  			$scope.details = null;
  			$scope.loadList = getInfo();
			$scope.term = null;
		

			// Function to get employee details from the database
			getInfo();
			$rootScope.$on("updateList", function(){
				console.log("update list");
           		getInfo();
        	});
			$rootScope.$on("filterByCompanyOrItem", function(event, args){
				console.log("filterByCompanyOrItem");
				console.log(args);
           		filterByCompanyOrItem(args.term);
        	});
			function filterByCompanyOrItem(term) {
				console.log(term);
				$scope.items = [];
				if(term.length > 2) {
					$http.get('http://localhost:9000/invoice?filteByCompanyOrItem='+term)
				
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
				
			}
			function getInfo() {
				$http.get('http://localhost:9000/invoice')
				
				.then(function successCallback(response) {
						$scope.details = response.data;
						
						console.log(response.data);
						}, function errorCallback(response) {
		    			console.log("erro");
						console.log(response);
		    		});
				
			}
    }
