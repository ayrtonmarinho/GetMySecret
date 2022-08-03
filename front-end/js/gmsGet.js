const urlHome = "index.html"; //Caminho para a pagina inicial
api_link = "https://4uie9wfst8.execute-api.sa-east-1.amazonaws.com/getSecret";

function goHome() {
    window.location = urlHome;
}

//Função que pega o segredo no banco
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
            if (code.statusCode == 404) {
                window.alert("Não encontrado");
                displayDefault();
                return 0;
            }
            displaySecretContent();
            setText(code.body, code.lifetime);

        })
}

function getSecret() {
    let token = document.getElementById('textSecret').value;
    if (!check_token_length(token)) {
        fetchGetSecret(token);
        console.log(token);

    }
}


//fUNCTION 2
function displaySecretContent() {
    document.getElementById("textSecret").style.display = 'none';
    document.getElementById("revealButtons").style.display = 'none';
    document.getElementById("secretContent").style.display = 'block';
    document.getElementById("secretButtons").style.display = 'block';
}

function displayDefault() {
    document.getElementById("textSecret").style.display = 'block';
    document.getElementById("revealButtons").style.display = 'block';
    document.getElementById("secretContent").style.display = 'none';
    document.getElementById("secretButtons").style.display = 'none';
    document.getElementById("textSecret").value = '';
}

function setText(secret, lifetime) {
    document.getElementById('secret').innerHTML = secret;
    document.getElementById('lifetime').innerHTML = 'Segredo expira em:<p style="color:red">' + lifetime + '</p>';
}

function check_token_length(value) {
    let token_size = /^.{36}$/;
    if (!token_size.test(value)) {
        window.alert("Os tokens devem possuir 36 characteres incluindo hifens!");
        return true;
    }
    return false;
}