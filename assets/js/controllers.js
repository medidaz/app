angular.module('medidaz.controllers', [])

  .controller('HomeCtrl', function ($scope, AlimentoAPIService, FonteAPIService, MedidaAPIService, MedicaoAPIService) {
    AlimentoAPIService.quantidadeAlimentos().then(function (data) {
      $scope.quantidade_alimentos = data.quantidade;
    });

    FonteAPIService.quantidadeFontes().then(function (data) {
      $scope.quantidade_fontes = data.quantidade;
    });

    MedidaAPIService.quantidadeMedidas().then(function (data) {
      $scope.quantidade_medidas = data.quantidade;
    });

    MedicaoAPIService.quantidadeMedicoes().then(function (data) {
      $scope.quantidade_medicoes = data.quantidade;
    });

  })

  .controller('ConsultaCtrl', function ($scope, AlimentoAPIService) {

    $scope.consulta = {};

    $scope.consultar = function () {
      AlimentoAPIService.buscaAlimento($scope.consulta.texto).then(function (data) {
        $scope.alimentos = data.alimentos;
      });
    }
  })


  .controller('AlimentosCtrl', function ($scope, $routeParams, AlimentoAPIService) {

    var _tratarAlimento = function (alimento) {

      var alimentoTratado = {};
      alimentoTratado.id = alimento.id;
      alimentoTratado.descricao = alimento.descricao;
      alimentoTratado.medidas = [];

      var _obterMedida = function (medida_id) {
        for (var i = 0, len = alimentoTratado.medidas.length; i < len; i++) {
          if (alimentoTratado.medidas[i]['id'] === medida_id) return i;
        }
        return -1;
      }

      var _construirMedida = function (medida_id, texto_exibicao) {
        return {
          id: medida_id,
          descricao: texto_exibicao,
          showMedicoes: false,
          medicoes: []
        }
      }

      var _construirMedicao = function (fonte, valor) {
        return {
          fonte: fonte,
          valor: valor
        }
      }

      alimento.Medicaos.forEach(function (elemento) {

        var possui = false;

        possui = alimentoTratado.medidas.some(function (e) {
          return e.id == elemento.medida_id;
        });

        if (!possui) {
          var medidaCriada = _construirMedida(elemento.medida_id, elemento.Medida.descricao);
          medidaCriada.medicoes.push(_construirMedicao(elemento.Fonte.texto_exibicao, elemento.value));
          alimentoTratado.medidas.push(medidaCriada);
        } else {
          alimentoTratado.medidas[_obterMedida(elemento.medida_id)].medicoes.push(_construirMedicao(elemento.Fonte.texto_exibicao, elemento.value));
        }

      });
      console.log(alimentoTratado);
      return alimentoTratado;
    };

    AlimentoAPIService.getAlimento($routeParams.idAlimento).then(function (data) {
      console.log(data);
      $scope.alimento = _tratarAlimento(data.alimento[0]);
    });
  })

  .controller('SugestaoCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
