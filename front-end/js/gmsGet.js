const urlHome = "index.html"; //Caminho para a pagina inicial
api_link = "https://4uie9wfst8.execute-api.sa-east-1.amazonaws.com/getSecret"; // endereço usado no fetch --> post, o get não tava enviando o dado com body

function goHome() {
    window.location = urlHome;
}

//Função que pega o segredo no banco e exibie
function fetchGetSecret(token) {
    //console.log("Fetch")
    fetch(api_link,
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "token": token
            })
        }
    ).then(response => response.json())
        .then(code => {
            if (code.statusCode == 404) { //Se o retorno do fetch for o status code 404, not found ele retorna 0.
                alertify.alert()
                    .setting({
                        'label': 'Ok',
                        'message': 'Não há segredo para esse token!',
                        'onok': function () { displayDefault(); }, // chama a função displayDefault() para resetar os campos.
                        'title': 'Aviso'
                    }).show();
                return 0;
            }
            displaySecretContent(); //Ocorreu tudo bem e os dados do segredo serão mostrados para o usuário, assim como a opção de deleta-lo.
            setText(code.body, code.lifetime);

        })
}

function getSecret() { //Funão que é chamada pelo botão revelar segredo no HTML
    let token = document.getElementById('textSecret').value;
    if (!check_token_length(token)) { // Um teste de comprimento dos caracteres do token é feito.
        fetchGetSecret(token);
        console.log(token);

    }
}


//Função que mostra os elementos que estavam escondidos(div que tem elementos do segredo) e esconde alguns dos que estavam visiveis.
function displaySecretContent() {
    document.getElementById("textSecret").style.display = 'none';
    document.getElementById("revealButtons").style.display = 'none';
    document.getElementById("secretContent").style.display = 'block';
    document.getElementById("secretButtons").style.display = 'block';
}

// Retorna a visiualização padrão da pagina de revelar segredo.
function displayDefault() {
    document.getElementById("textSecret").style.display = 'block';
    document.getElementById("revealButtons").style.display = 'block';
    document.getElementById("secretContent").style.display = 'none';
    document.getElementById("secretButtons").style.display = 'none';
    document.getElementById("textSecret").value = '';
}

// Seta os valores do segredo e o tempo de vida dele no HTML
function setText(secret, lifetime) {
    document.getElementById('secret').innerHTML = secret;
    document.getElementById('lifetime').innerHTML = 'Segredo expira em:<p style="color:red">' + lifetime + '</p>';
}

// Função de validação da quantidade de caracteres do token
function check_token_length(value) {
    let token_size = /^.{36}$/;
    if (!token_size.test(value)) {
        alertify.alert()
            .setting({
                'label': 'Ok',
                'message': "Os tokens devem possuir 36 characteres incluindo hifens!",
                'onok': function () { console.log(0) },
                'title': 'Aviso'
            }).show();
        return true;
    }
    return false;
}