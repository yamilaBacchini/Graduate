angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    
  

    .state('tP4', {
        url: '/Home',
        templateUrl: 'templates/tP4.html',
        controller: 'tP4Ctrl'
    })

    .state('seleccionarAcciones', {
        url: '/seleccionarAcciones/:ip',
        templateUrl: 'templates/seleccionarAcciones.html',
        controller: 'seleccionarAccionesCtrl'
    })

    .state('nuevoSupermercado', {
        url: '/SupermercadoAdd/:ip',
        templateUrl: 'templates/nuevoSupermercado.html',
        controller: 'nuevoSupermercadoCtrl'
    })

    .state('producto', {
        url: '/ProductoShow/:ip/:codigoBarras',
        templateUrl: 'templates/producto.html',
        controller: 'productoCtrl'
    })

    .state('actualizarPrecio', {
        url: '/ProductoActualizarPrecio/:ip/:codigoBarras/:idSupermercado',
        templateUrl: 'templates/actualizarPrecio.html',
        controller: 'actualizarPrecioCtrl'
    })

    .state('nuevoProducto', {
        url: '/ProductoAdd/:ip/:codigoBarras',
        templateUrl: 'templates/nuevoProducto.html',
        controller: 'nuevoProductoCtrl'
    })

    $urlRouterProvider.otherwise('/Home')

  

});