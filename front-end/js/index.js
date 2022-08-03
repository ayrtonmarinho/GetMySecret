const urlCreate = "gmsCreate.html"; //Caminho para a pagina que guarda o segredo
const urlReveal = "gmsGet.html"; //Caminho para a pagina que revela o segredo

function goToCreate() { //Direciona o usuário para pagina de guardar segredo
    window.location = urlCreate;
}

function goToGet() { //direciona o usuário para a pagina de revelar segredo
    window.location = urlReveal;
}