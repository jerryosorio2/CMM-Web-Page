module.exports = function(grunt){
	
	grunt.initConfig({
		watch: {
		  changedHtml: {
			files: ['public/*.html'],
			tasks: ['shell:restartPM2'],
		  },
		  changedJs: {
			files: ['public/js/**/*.js'],
			tasks: ['shell:restartPM2'],
		  },
		  changedCss: {
			files: ['public/css/**/*.css'],
			tasks: ['shell:restartPM2'],
		  },
		  changedServerJs: {
			files: ['server.js'],
			tasks: ['shell:restartPM2'],
		  },
		  
		},

		shell: {
			options: {
				stderr: false
			},
			startPM2: {
				command: 'pm2 start server.js'
			},
			stopPM2: {
				command: 'pm2 stop server.js'
			},
			restartPM2: {
				command: 'pm2 restart server.js'
			},	
		}
	});

require('load-grunt-tasks')(grunt);
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default',['watch']);
};
