angular.module('app.controllers', ['ionic'])

.controller('tP4Ctrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {
    $scope.conectar = function () {
        var texto = $scope.$$childHead.txtIP;
        if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(texto))
            document.getElementById("mensaje").innerText = "direccion IP invalida";
        else
            $state.go("seleccionarAcciones", { 'ip': texto });
    }
}])

.controller('seleccionarAccionesCtrl', ['$scope', '$stateParams', '$state', 'apiRest', 'scannerService', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, apiRest, scannerService, $ionicPopup) {
    var ip = $stateParams.ip;
    $scope.$on('$ionicView.enter', function (event) {
        apiRest.getSupermercados(ip).then(
            function (respuesta) {
                if (respuesta != "0") {
                    resultado = respuesta.data;
                    if (resultado.supermercados.length != "0") {
                        var comboSupermercados = document.getElementById("selSupermercado");
                        for (var i = comboSupermercados.options.length - 1 ; i >= 0 ; i--)
                            comboSupermercados.remove(i);
                        comboSupermercados.add(new Option("", -1, false, false));
                        for (var i in resultado.supermercados) {
                            var opcionSuper = new Option(resultado.supermercados[i].nombre, resultado.supermercados[i].id, false, false);
                            comboSupermercados.add(opcionSuper);
                        }
                    } else {
                        $ionicPopup.alert({
                            title: 'Cargar supermercados',
                            template: 'Aun no hay supermercados cargados, por favor cargue primero los mismos'
                        });
                    }
                } else {
                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'Error cargando parametros'
                    });
                    $state.go("tP4");
                }
            });
    });
    $scope.producto = function () {
        var codigoBarras = "";
        scannerService.escanear().then(
        function (respuesta) {
            if (!respuesta.cancelled) {
                codigoBarras = respuesta.text;
                var superSeleccionado = document.getElementById("selSupermercado").value;
                if (superSeleccionado == -1)
                    $state.go("producto", { 'ip': ip, 'codigoBarras': codigoBarras });
                else
                    $state.go("actualizarPrecio", { 'ip': ip, 'codigoBarras': codigoBarras, 'idSupermercado': superSeleccionado });
            }
        });
    }
    $scope.nuevoSupermercado = function () {
        $state.go("nuevoSupermercado", { 'ip': ip });
    }
}])

.controller('nuevoSupermercadoCtrl', ['$scope', '$stateParams', '$state', 'locationService', 'apiRest', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, locationService, apiRest, $ionicPopup) {
    var ip = $stateParams.ip;
    $scope.$on('$ionicView.enter', function (event) {
        locationService.getCurrentLocation().then(
        function (respuesta) {
            var txtLat = document.getElementById('txtLatitud');
            var txtLon = document.getElementById('txtLongitud');
            txtLat.value = respuesta.latitude;
            txtLon.value = respuesta.longitude;
        });
    });
    $scope.guardar = function () {
        var nombre = $scope.$$childHead.txtNombre;
        var latitud = document.getElementById('txtLatitud').value;
        var longitud = document.getElementById('txtLongitud').value;
        if (nombre != "" && nombre != undefined && latitud != "" && latitud != undefined && longitud != "" && longitud != undefined) {
            apiRest.postSupermecado(ip, nombre, latitud, longitud).then(
                function (respuesta) {
                    if (respuesta != "0") {
                        $state.go("seleccionarAcciones", { 'ip': ip });
                    } else {
                        $ionicPopup.alert({
                            title: 'Error de comunicacion',
                            template: 'Hubo un error de comunicacion con el WS'
                        });
                        //$state.go("seleccionarAcciones", { 'ip': ip });
                    }
                });
        } else {
            $ionicPopup.alert({
                title: 'Error de validacion',
                template: 'Debe completar todos los campos para guardar el supermercado'
            });
        }
    }
}])

.controller('productoCtrl', ['$scope', '$stateParams', '$state', 'apiRest', 'locationService', '$ionicPopup', 'scannerService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, apiRest, locationService, $ionicPopup, scannerService) {
    var ip = $stateParams.ip;
    var codigoBarras = $stateParams.codigoBarras;
    var posicion = {};
    $scope.producto = { descripcion: "", uMedida: "", tamanio: "", precio: "", precio1: "", precio2: "" };
    $scope.$on('$ionicView.enter', function (event) {
        locationService.getCurrentLocation().then(
        function (respuesta) {
            posicion = respuesta;
        }).then(function () {
            apiRest.getProducto(ip, codigoBarras, posicion.latitude, posicion.longitude).then(
            function (respuesta) {
                if (respuesta != "0") {
                    if (respuesta.data.producto != "0") {
                        var datosProducto = respuesta.data;
                        cargarFormProductos(datosProducto);
                    } else {
                        apiRest.getProductoSinPrecios(ip, codigoBarras).then(
                        function (respuesta) {
                            if (respuesta != "0") {
                                if (respuesta.data.id != "0") {
                                    //aca hay que mandar a actualizar precio
                                    $ionicPopup.alert({
                                        title: 'Producto existente',
                                        template: 'Existe producto'
                                    });
                                } else {
                                    $state.go("nuevoProducto", { 'ip': ip , 'codigoBarras':codigoBarras});
                                }
                            } else {
                                $ionicPopup.alert({
                                    title: 'Error de comunicacion',
                                    template: 'Hubo un error de comunicacion con el WS'
                                });
                                $state.go("seleccionarAcciones", { 'ip': ip });
                            }
                        });
                    }
                } else {
                    $ionicPopup.alert({
                        title: 'Error de comunicacion',
                        template: 'Hubo un error de comunicacion con el WS'
                    });
                    $state.go("seleccionarAcciones", { 'ip': ip });
                }
            });
        });
    });
}])

.controller('actualizarPrecioCtrl', ['$scope', '$stateParams', '$state', 'apiRest', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, apiRest, $ionicPopup) {
    var ip = $stateParams.ip;
    var codigoBarras = $stateParams.codigoBarras;
    var idSupermercado = $stateParams.idSupermercado;
    var producto = {};
    $scope.$on('$ionicView.enter', function (event) {
        apiRest.getProductoSinPrecios(ip, codigoBarras).then(function (resultado) {
            if (resultado != "0") {
                if (resultado.data.id != "0") {
                    producto = resultado.data;
                    var lblProd = document.getElementById('lblProducto');
                    lblProd.innerText = producto.descripcion;
                } else {
                    $ionicPopup.alert({
                        title: 'No se encontro el producto',
                        template: 'No se pudo encontrar el producto, por favor vuelva a escanearlo'
                    });
                    $state.go("seleccionarAcciones", { 'ip': ip });
                }
            } else {
                $ionicPopup.alert({
                    title: 'Error de comunicacion',
                    template: 'Hubo un error de comunicacion con el WS'
                });
                $state.go("seleccionarAcciones", { 'ip': ip });
            }
        });
    });
    $scope.guardar = function () {
        var precio = document.getElementById('txtPrecio').value;
        if (precio != "" && precio != undefined) {
            apiRest.putPrecio(ip, producto.id, precio, idSupermercado).then(
                function (respuesta) {
                    if (respuesta != "0") {
                        $state.go("seleccionarAcciones", { 'ip': ip });
                    } else {
                        $ionicPopup.alert({
                            title: 'Error de comunicacion',
                            template: 'Hubo un error de comunicacion con el WS'
                        });
                        $state.go("seleccionarAcciones", { 'ip': ip });
                    }
            });
        } else {
            $ionicPopup.alert({
                title: 'Error de validacion',
                template: 'Debe completar el precio del producto en el supermercado'
            });
        }
    }
}])

.controller('nuevoProductoCtrl', ['$scope', '$stateParams', '$state', 'apiRest', '$ionicPopup', 'photoService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, apiRest, $ionicPopup, photoService) {
    var ip = $stateParams.ip;
    var codigoBarras = $stateParams.codigoBarras;
    var foto = "";
    $scope.guardar = function () {
        var descripcion = $scope.$$childHead.txtDescripcion;
        var unidad = $scope.$$childHead.txtUnidad;
        var tamanio = $scope.$$childHead.txtTamanio;
        if (descripcion != "" && descripcion != undefined && unidad != "" && unidad != undefined && tamanio != "" && tamanio != undefined && foto != "" && foto != undefined) {
            apiRest.postProducto(ip, descripcion, codigoBarras, unidad, tamanio, foto).then(
                function (respuesta) {
                    if (respuesta != "0") {
                        $state.go("seleccionarAcciones", { 'ip': ip });
                    } else {
                        $ionicPopup.alert({
                            title: 'Error de comunicacion',
                            template: 'Hubo un error de comunicacion con el WS'
                        });
                        $state.go("seleccionarAcciones", { 'ip': ip });
                    }
                });
        } else {
            $ionicPopup.alert({
                title: 'Error de validacion',
                template: 'Debe completar todos los campos para guardar el producto'
            });
        }
    }
    $scope.tomarFoto = function () {
        photoService.takePhoto().then(function (respuesta) {
            if (respuesta) {
                foto = 'data:image/jpeg;base64,' + respuesta;
            }
        });
    }
    $scope.cancelar = function () {
        $state.go("seleccionarAcciones", { 'ip': ip });
    }
}]);

function cargarFormProductos(datosProducto, $scope) {
    var imagen = document.getElementById('imgProd');
    imagen.src = datosProducto.producto.foto;
    var desc = document.getElementById("txtDescripcion");
    desc.innerHTML = "Descripcion:" + " " + datosProducto.producto.descripcion;
    var uMedida = document.getElementById("txtUnidadMedida");
    uMedida.innerHTML = "Unidad de medida:" + " " + datosProducto.producto.unidadMedida;
    var tamanio = document.getElementById("txtTamanio");
    tamanio.innerHTML = "Tamaño:" + " " + datosProducto.producto.tamanio;
    var precio = document.getElementById("txtPrecio");
    var precio1 = document.getElementById("txtPrecio1");
    var precio2 = document.getElementById("txtPrecio2");
    if (datosProducto.ofertas.length>0) {
        precio.innerHTML = "Precio:" + " " + datosProducto.ofertas[0].precio;
        if (datosProducto.ofertas.length > 1) {
            precio1.innerHTML = "Precio alternativo:" + " " + datosProducto.ofertas[1].precio;
        } else {
            precio1.innerHTML = "Precio alternativo:" + " " + "No hay precio alternativo cercano";
        }
        if (datosProducto.ofertas.length > 2) {
            precio2.innerHTML = "Precio alternativo 2:" + " " + datosProducto.ofertas[2].precio;
        } else {
            precio2.innerHTML = "Precio alternativo 2:" + " " + "No hay precio alternativo cercano";
        }
    } else {
        precio.innerHTML = "Precio:" + " " + "No hay precios para este producto";
        precio1.innerHTML = "Precio alternativo:" + " " + "No hay precios para este producto";
        precio2.innerHTML = "Precio alternativo 2:" + " " + "No hay precios para este producto";
    }
}

function showCarterErrorComunicacionWS($ionicPopup) {
    $ionicPopup.alert({
        title: 'Error de comunicacion',
        template: 'Hubo un error de comunicacion con el WS'
    });
}