
var closable = alertify.alert().setting({ 'closable': false }); // variavel necessaria para o alertfy.
var api_link = "https://87amlzz1s2.execute-api.sa-east-1.amazonaws.com/createSecret/"; //endereço do fetch --> post
const urlHome = "index.html"; //Caminho para a pagina inicial


function goHome() { //Função que retorna para a pagina inicial.
    window.location = urlHome;
}

function newSecret(secret, lifetime) { //Função Fetch envia os dados via API e recebe uma response com o token referente ao segredo
    console.log("Fetch")
    fetch(api_link,
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "mysecret": secret,
                "lifetime": lifetime
            })
        }
    ).then(response => response.json())
        .then(code => {
            //Alerta do framework alertfy, usado para informar ao usuário o token gerado.
            alertify.alert("SEU TOKEN")
                .setting({
                    'label': 'Ok',
                    'message': '<p style="font-style: bold; text-aling:center;"> Este é seu token para recuperar o segredo:</br></br></p><p style="font-size:20px; color:green;font-weight: bold;">' + code.body + '</p></br> A data de expiração é: <p style="color:orange">' + code.lifetime + '</p>',
                    'onok': function () { resetFields() },
                    'title': 'Segredo Guardado'
                }).show();
        })
}

function create_secret() { // Função avalia o segredo, podendo ser texto ou senha
    const textSecret = document.getElementById("textSecret").value; //Variavel que recebe o texto a partir da tag textarea do HTML
    const lifeTime = document.getElementById("lifeTime").value;     //Variavel que recebe o valor de uma das opções da tag selection do HTML


    if (textSecret != '' && textSecret != null) {                  // Testa se o campo de texto esta vazio '' ou null
        if (document.getElementById('senha').checked && checkPassword(textSecret) == true) { // Avalia se caso seja senha esta de acordo com os requisitos, se estiver ok entra no bloco
            newSecret(textSecret, lifeTime);


        } else if (document.getElementById('texto').checked) { // Caso seja texto vem para esse bloco
            newSecret(textSecret, lifeTime);

        }
    } else { // O if de checagem de campos vazios deu true para vazio, vem para esse bloco

        //Alerta do framework alertFy.
        alertify.alert()
            .setting({
                'label': 'Ok',
                'message': 'Não há texto ou senha digitado.',
                'onok': function () { resetFields() },
                'title': 'Aviso'
            }).show();


    }
}

//Função teste
function resetFields() { // Não faz um reset, mas sim recarrega a pagina para resetar os campos.
    document.location.reload(true);


}


// Função para validar senha com uso de RegEx
function checkPassword(value) {
    let message = [];
    const isWhiteSpace = /^(?=.*\s)/;
    if (isWhiteSpace.test(value)) {
        message.push("A senha não pode conter espaços em branco\n");
    }

    const isContainsUpperCase = /^(?=.*[A-Z])/;
    if (!isContainsUpperCase.test(value)) {                 //Verifica se contem ao menos uma letra Maiuscula
        message.push("É preciso pelo menos uma letra em MAIÚSCULO\n");
    }

    const isContainsLowerCase = /^(?=.*[a-z])/;
    if (!isContainsLowerCase.test(value)) {                 //Verifica se contem ao menos uma letra Minuscula
        message.push("É preciso pelo menos uma letra em MINÚSCULO\n");
    }

    const isContainsNumber = /^(?=.*[0-9])/;
    if (!isContainsNumber.test(value)) {                    //Verifica se contem ao menos um número
        message.push("É preciso pelo menos um número\n")
    }

    const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    if (!isContainsSymbol.test(value)) {                    //Verifica se contem ao menos um caractere especial
        message.push("É preciso pelo menos um caractere especial\n");
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {                       //Verifica se possui a quantidade minima e maxima de caracteres
        message.push("A senha precisa ter entre 8 e 16 caracteres\n")
    }

    if (!message.length == 0) {                              //Se o array message possuir tamanho maior que zero significa que houve algum requisito não sanado
        let warningMessage = message.toString().replaceAll(',', '\n');
        window.alert(warningMessage)
        console.log(warningMessage)
        return false;

    }
    return true



}