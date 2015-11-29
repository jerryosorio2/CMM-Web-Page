var myApp = angular.module('myApp', ['ui-notification']);

myApp.config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 6000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'left',
            positionY: 'bottom'
        });
    });