// controller.js
// Application module
angular
    .module('app')
	.controller('itemController', itemController)
	.controller('itemListController', itemListController);

itemController.$inject = ['$scope', '$http', '$timeout', '$window','$log','$rootScope','ngNotify'];
		function itemController($scope, $http, $timeout,$window,$log,$rootScope,ngNotify) {
  			
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
			
			
			$scope.edit = function(data) {
				console.log("editan");
				$scope.item = data;
				$scope.insert =true;
				
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
			$scope.insertInfo = function(item) {
				if(item.name == null || item.name == ''){
					ngNotify.set('Informe o nome do item!', 'error');
					return false;
				}
				if(item.price == null || item.price == ''){
					ngNotify.set('Informe o valor do item!', 'error');
					return false;
				}
				$http.post('http://localhost:9000/item', 
					JSON.stringify(item)).then(function(data) {
						 $window.location.reload();
				});
			}
			$scope.testList = function() {
				
				$rootScope.$broadcast('updateList');
			}
			$scope.format = function(text) {
				var position = text.indexOf(":");
				
				return text.substring(position + 1, text.length);
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
			
			$rootScope.$on("edit", function(event,args){
				console.log("edit");
           		$scope.edit(args.item);
        	});
		

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
			$scope.edit = function(item){
				$rootScope.$broadcast('edit',{ item: item});
			}
			function getInfo() {
				$http.get('http://localhost:9000/item?page=0&size=20')
				
				.then(function successCallback(response) {
						$scope.details = response.data;
						
						console.log(response);
						}, function errorCallback(response) {
		    			console.log(response);
		    		});
				
			}
			$scope.remove = function(item) {
				
				console.log("excluindo: "+JSON.stringify(item));
				$http.delete('http://localhost:9000/item', JSON.stringify(detail)).success(function(data) {
					
						
						getInfo();
				
				});
			}
    }
