angular.module('medidaz.services', [])
  .service('AlimentoAPIService', function ($http, $q) {
    var url = 'https://api.medidaz.com.br/v1/';
    return {
      listaAlimentos: function () {
        return $http.get(url + "alimentos").then(function (response) {
          return response.data;
        });
      },
      quantidadeAlimentos: function () {
        return $http.get(url + "alimentos/quantidade").then(function (response) {
          return response.data;
        });
      },
      buscaAlimento: function (texto) {        
        var data = JSON.stringify({ desc: texto });      
        return $http.post(url + "alimento/search/" , data).then(function (response) {
          return response.data;
        });
      },
      getAlimento: function (id) {        
        return $http.get(url + "alimento/"+ id).then(function (response) {
          return response.data;
        });
      }      
    };
  })
  .service('FonteAPIService', function ($http, $q) {
    var url = 'https://api.medidaz.com.br/v1/';
    return {
      listaFontes: function () {
        return $http.get(url + "fontes").then(function (response) {
          return response.data;
        });
      },
      quantidadeFontes: function () {
        return $http.get(url + "fontes/quantidade").then(function (response) {
          return response.data;
        });
      }
    };
  })
  .service('MedidaAPIService', function ($http, $q) {
    var url = 'https://api.medidaz.com.br/v1/';
    return {
      listaMedidas: function () {
        return $http.get(url + "medidas").then(function (response) {
          return response.data;
        });
      },
      quantidadeMedidas: function () {
        return $http.get(url + "medidas/quantidade").then(function (response) {
          return response.data;
        });
      }
    };
  })
  .service('MedicaoAPIService', function ($http, $q) {
    var url = 'https://api.medidaz.com.br/v1/';
    return {
      listaMedicoes: function () {
        return $http.get(url + "medicoes").then(function (response) {
          return response.data;
        });
      },
      quantidadeMedicoes: function () {
        return $http.get(url + "medicoes/quantidade").then(function (response) {
          return response.data;
        });
      }
    };
  });
