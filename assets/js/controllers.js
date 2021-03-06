angular.module('medidaz.controllers', [])

  .controller('SobreCtrl', function ($scope, AlimentoAPIService, FonteAPIService, MedidaAPIService, MedicaoAPIService) {
    AlimentoAPIService.quantidadeAlimentos().then(function (data) {
      $scope.quantidade_alimentos = data.quantidade;
    });

    FonteAPIService.quantidadeFontes().then(function (data) {
      $scope.quantidade_fontes = data.quantidade;
    });

    FonteAPIService.listaFontes().then(function (data) {
      $scope.fontes = data.fonte;
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
      $scope.loading = true;
      AlimentoAPIService.buscaAlimento($scope.consulta.texto).then(function (data) {

        if (data.alimentos.length > 0) {
          $scope.alimentos = data.alimentos;
          $scope.loading = false;
        } else {
          Materialize.toast('Desculpe, não existe alimento com o nome pesquisado em nossa base!', 3000, 'rounded');
        }
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
      return alimentoTratado;
    };

    AlimentoAPIService.getAlimento($routeParams.idAlimento).then(function (data) {
      $scope.alimento = _tratarAlimento(data.alimento[0]);
    });
  })

  .controller('SugestaoCtrl', function ($scope) {
  })
  
  .controller('FonteCtrl', function ($scope, $routeParams, FonteAPIService) {
    FonteAPIService.getFonte($routeParams.idFonte).then(function (data) {
      $scope.fonte = data.fonte[0];
    });
  });