angular.module('contatooh').controller('ContatosController',
 function($scope, $resource) {
    $scope.filtro = '';
    $scope.contatos = [];
    $scope.mensagem = {texto: ''};

    var Contato = $resource('/contatos/:id');

    function buscaContatos() {
        //Contato = $resource('/contatos'); pode ser usado dessa forma
        Contato.query(function(contatos) {
            $scope.contatos = contatos;
            $scope.mensagem = {};
        },
        function(erro) {
            console.log('Não foi possível obter a lista de contatos');
            console.log(erro);
            $scope.mensagem = {
                texto: 'Não foi possível obter a lista'
            };
        });

    };

    $scope.remove = function(contato) {
        //Contato = $resource('/contatos/:id'); pode ser usado dessa forma
        Contato.delete({id: contato._id},
            buscaContatos,
            function(erro) {
                console.log('Não foi possível remover o contato');
                console.log(erro);
                $scope.mensagem = {
                    texto: 'Não foi possível remover o contato'
                };
            }
        );
        console.log(contato);
    };
    
    buscaContatos();
});