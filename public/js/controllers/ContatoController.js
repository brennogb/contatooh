angular.module('contatooh').controller('ContatoController',
 function($scope, $routeParams, $resource) {
    // aqui continua no plural, é a rota no lado do servidor
    var Contato = $resource('/contatos/:id');
    
    if($routeParams.contatoId) {
        Contato.get({id: $routeParams.contatoId},
        function(contato) {
            $scope.contato = contato;
        },
            function(erro) {
                $scope.mensagem = {
                    texto: 'Contato não existe. Novo contato.'
                };
            }
        );
    } else {
        $scope.contato = new Contato();;
    }

    $scope.salva = function() {
        $scope.contato.$save()
            .then(function() {
                $scope.mensagem = {texto: 'Salvo com sucesso'};
                // limpa o formulário
                $scope.contato = new Contato();
            })
            .catch(function(erro) {
                $scope.mensagem = {texto: 'Não foi possível salvar'};
            });
    };
});