myApp.controller('appCtrl', appCtrl);

appCtrl.$inject = ['$scope', '$timeout', 'servicesData','Notification'];

function appCtrl($scope, $timeout, servicesData, Notification) { 
	
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
			Notification.error('Por favor rellene todos los campos correctamente');
		}
		else{
			
			$scope.cita.fecha = $('#fecha').val();
			servicesData.createAppointment($scope.cita)
			.then(function(data) {
				console.log("agregando appointment" + data);
				Notification('Su cita ha sido agregada exitosamente recibirá un correo de confirmación');
				$scope.cita="";
				$scope.frm.$setPristine();

	
			})
			.catch(function(err){
				// Tratar el error
			});
		}
		
	};
	
};


/* 
 notificationMessages.controller('notificationController', function($scope, Notification) {
                
                $scope.primary = function() {
                    Notification('Primary notification');
                };

            });
 */