function CustomerCtrl ($scope, $http, $timeout, $rootScope){
	$scope.selectedShop = selectedShop;
	$scope.customers = [];
	$scope.hasSelectedCustomer = false;
	$scope.currentlySelectedCustomer = null;
	$scope.addNew = false;
	$scope.new_firstName = '';
	$scope.new_Email = '';

	$scope.init = function (){
		$scope.getCustomers();
	};

	$scope.getCustomers = function (){
		var url = '/api/shops/'+selectedShop.id+'/users?api_token='+window.user.api_token;
		$http.get(url).then(function (response){
			console.log(response);
			$scope.customers = response.data;

			if( $scope.customers.length > 0 ){
				$rootScope.listIsEmpty = false;
			}else{
				$rootScope.listIsEmpty = true;
			}

		}, function (response){
			console.warn(response);
		});
	};

	$scope.viewCustomer = function (index){
		$scope.hasSelectedCustomer = true;
		$scope.currentlySelectedCustomer = $scope.customers[index];
		Materialize.updateTextFields();
	};

	$scope.removeCustomer = function (index){
		var customer = $scope.customers[index];
		var url = '/api/shops/'+selectedShop.id+'/users/'+customer.id+'/remove?api_token='+window.user.api_token;
		window.$.reBuy.confirm("Are you sure to remove this customer?", function (){
			$http.delete(url).then(function (response){
				// $scope.customers = response.data;
				console.log(response);
				if( response.data.success == 1 ){
					$scope.customers.splice(index);
				}

				if( $scope.customers.length < 1 ){
					$rootScope.listIsEmpty = true;
				}

			}, function (response){
				console.warn(response);
			});
		});
	};

	$scope.generatePassword = function (){
		if( $scope.hasSelectedCustomer ){
			$http.post('/api/shops/'+selectedShop.id+'/users/sendpassword').then(function (response){
				console.warn(response);
			}, function (response){
				console.warn(response);
			});
		}
	};

	$scope.addNewCustomer = function (){
		$scope.addNew = true;
		$("html, body").animate({ scrollTop: $('#add_new').offset().top }, 1000);
	};

	$scope.invite = function (button){
		var data = {
				name: $scope.new_firstName,
				email: $scope.new_Email
			},
			url = '/api/shops/'+selectedShop.id+'/invite?api_token='+window.user.api_token;
		button.attr("disabled", "disabled").addClass("disabled");

		$http.post(url, data).then(function (response){
			console.log(response);
		}, function (response){
			if( response.data ){
				window.$.reBuy.showErrors(response.data, $("#add_new"), 8000);
			}
		});
	} 


	// init
	$scope.init();
}

app.controller('CustomerController', CustomerCtrl);