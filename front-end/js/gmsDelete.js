api_link2 = "https://86t3q0mc3f.execute-api.sa-east-1.amazonaws.com/deleteSecret/";
const urlBack = "index.html"; //Caminho para a pagina inicial


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
        goBack();
    }).
        catch(err => {
            window.alert("Segredo não existe!");
        })
}

function deleteSecret() {
    alertify.prompt('Deletar Segredo', 'Digite o token do segredo para confirmar e clique em Ok para deletar', 'Token'
        , function (evt, value) { fetchDeleteSecret(value) }
        , function () { alertify.error('Cancelar') });
}

function goBack() {
    window.location = urlBack;
}
