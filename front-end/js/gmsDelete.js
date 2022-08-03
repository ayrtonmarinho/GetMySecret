api_link2 = "https://86t3q0mc3f.execute-api.sa-east-1.amazonaws.com/deleteSecret/"; // endereço do fetch para deletar o segredo
const urlBack = "index.html"; //Caminho para a pagina inicial

//Função fetch que pede para a api deletar o segredo com base no token passado
function fetchDeleteSecret(token) {
    //console.log("Fetch")
    fetch(api_link2,
        {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "token": token
            })
        }
    ).then(resp => {
        goBack(); //Apos o sucesso de deletar retorna para pagina inicial
    }).
        catch(err => {
            alertify.alert()
                .setting({ // alerta do framework, o console.log(0) é por ele pedir algum codigo dentro da função criada.
                    'label': 'Ok',
                    'message': 'Algo deu errado. Segredo não existe ou tempo expirou!.',
                    'onok': function () { console.log(0) },
                    'title': 'Aviso'
                }).show();

        })
}

// Função que é invocada para deletar o token e chamar o fetch, ela pede o token para confirmar seu delete.
function deleteSecret() {
    alertify.prompt('Deletar Segredo', 'Digite o token do segredo para confirmar e clique em Ok para deletar', 'Token'
        , function (evt, value) { fetchDeleteSecret(value) }
        , function () { alertify.error('Cancelar') });
}

// Função para retornar a pagina inicial
function goBack() {
    window.location = urlBack;
}
