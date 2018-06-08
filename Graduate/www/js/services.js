angular.module('app.services', ['ionic.native'])

.factory('apiRest', ['$http', '$q', function ($http, $q) {
    var getSupermercados = function (ip) {
        return $http({
            method: 'GET',
            url: 'http://' + ip + ':3000/supermercados'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            return response;
        }, function errorCallback(response) {
            return "0";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    var getProducto = function (ip, codigoBarras, lat, lon) {
        return $http({
            method: 'GET',
            url: 'http://' + ip + ':3000/producto/' + codigoBarras + '/' + lat + '/' + lon
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            return response;
        }, function errorCallback(response) {
            return "0";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    var postSupermecado = function (ip, nombre, lat, lon) {
        return $http({
            method: 'POST',
            url: 'http://' + ip + ':3000/supermercado/' + nombre + '/' + lat + '/' + lon
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            return response;
        }, function errorCallback(response) {
            return "0";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    var postProducto = function (ip, desc, codBarras, uMedida, tamanio, foto) {
        return $http({
            method: 'POST',
            url: 'http://' + ip + ':3000/producto/' + desc + '/' + codBarras + '/' + uMedida + '/' + tamanio,
           /* headers: {
                'Content-Type': 'multipart/form-data',
                'boundary': '----WebKitFormBoundary7MA4YWxkTrZu0gW'
            },*/
            data: {
                foto: foto
            }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            return response;
        }, function errorCallback(response) {
            return "0";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    var putPrecio = function (ip, id, precio, idSupermercado) {
        return $http({
            method: 'PUT',
            url: 'http://' + ip + ':3000/producto/' + id + '/' + precio + '/' + idSupermercado
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            return response;
        }, function errorCallback(response) {
            return "0";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    var getProductoSinPrecios = function (ip, codBarras) {
        return $http({
            method: 'GET',
            url: 'http://' + ip + ':3000/producto/' + codBarras
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            return response;
        }, function errorCallback(response) {
            return "0";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    return { getSupermercados: getSupermercados, getProducto: getProducto, postSupermecado: postSupermecado, postProducto: postProducto, putPrecio: putPrecio, getProductoSinPrecios: getProductoSinPrecios };
}])

.service('scannerService', [function ($scope) {
    this.escanear = function () {
        return new Promise(function (resolve, reject) {
            cordova.plugins.barcodeScanner.scan(
            function (result) {
                resolve(result);
            },
            function (error) {
                reject(Error(error));
            }
            );
        });
    }
}])

.service('photoService', [function ($scope) {
    this.takePhoto = function () {
        return new Promise(function (resolve, reject) {
            navigator.camera.getPicture(function (imageData) {
                resolve(imageData);
            }, function (message) {
                reject(Error(message));
            }, {
                quality: 30,
                targetWidth: 600,
                targetHeight: 600,
                destinationType: navigator.camera.DestinationType.DATA_URL,
                sourceType: navigator.camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: navigator.camera.EncodingType.JPEG,
                saveToPhotoAlbum: false,
                cameraDirection: navigator.camera.Direction.BACK
            });
        });
    }
}])

.service('locationService', [function ($scope) {
    this.getCurrentLocation = function () {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(function positionSuccessCallback(position) {
                resolve(position.coords);
            }, function positionErrorCallback(error) {
                reject(Error(error));
            }, { timeout: 10000 });
        });
    }
}]);






