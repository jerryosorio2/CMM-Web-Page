myApp.service('servicesData', servicesData);
	
servicesData.$inject = ['$http', '$q'];

function servicesData($http, $q) { 

	return {	
		getAllServices: getAllServices,
		createAppointment: createAppointment
	}

	function getAllServices () {
		
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http.get('/serviceList')
			.success(function(response){
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err)
			});
			
		return promise;	
	};
	
	function createAppointment (cita) {
		
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http.post('/createAppointment',cita)
			.success(function(response){
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err)
			});
			
		return promise;	
	};
	
};

