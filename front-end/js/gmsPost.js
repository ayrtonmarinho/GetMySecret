
var closable = alertify.alert().setting({ 'closable': false });
var api_link = "https://87amlzz1s2.execute-api.sa-east-1.amazonaws.com/createSecret/"




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
            // alertify.alert(code.body).set({ 'closableByDimmer': false });
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
    const textSecret = document.getElementById("textSecret").value;
    const lifeTime = document.getElementById("lifeTime").value;


    if (textSecret != '' && textSecret != null) {
        if (document.getElementById('senha').checked && checkPassword(textSecret) == true) {
            newSecret(textSecret, lifeTime);


        } else if (document.getElementById('texto').checked) {
            newSecret(textSecret, lifeTime);

        }
    } else {
        //colocar um alerta do framework
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
function resetFields() {
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