myApp.controller('appCtrl', appCtrl);

appCtrl.$inject = ['$scope', '$timeout', 'servicesData'];

function appCtrl($scope, $timeout, servicesData) { 

	function refresh(){
		servicesData.getAllServices()
		.then(function(data) {
			$scope.servicesList = data;
			
			
			$timeout(function(){
				table = $('#example').dataTable({
						
						"language": {
							"url": "https://cdn.datatables.net/plug-ins/1.10.10/i18n/Spanish.json"
						}					
				});
			}, 2000);
		})
		.catch(function(err){
			// Tratar el error
		});
	};
	
	refresh();
	
	$scope.addAppointment =  addAppointment;
	
	function addAppointment(){
		
		if(!$scope.frm.$valid){		
			angular.forEach($scope.frm.$error.required, function(field) {
				field.$setDirty();
			});
		}
		else{
			servicesData.createAppointment($scope.cita)
			.then(function(data) {
				console.log("agregando appointment" + data);
			})
			.catch(function(err){
				// Tratar el error
			});
		}
		
	};

};