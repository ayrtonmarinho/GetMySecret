
# GetMySecret
![GetMySecretLogoContt](https://user-images.githubusercontent.com/76691413/182848532-d7364cb3-e930-43cb-968e-988ff9e81063.png)


*O GetMySecret é uma aplicação que permite ao usuário guardar um segredo, um dado sensível como senhas e mensagens que ele não queira expor de forma pública. Nenhum tipo de relação é associada à pessoa que gerou o segredo. O segredo quando armazenado gera um token de recuperação e o usuário pode usá-lo para recuperar o segredo. O segredo possui tempo de vida definido pelo usuário e após esse tempo o segredo é destruído. O usuário tem controle sobre o segredo e pode destruí-lo quando quiser, desde que ele ainda tenha tempo de vida.*

Experimente o GetMySecret clicando <a href="http://gmsmistiko.s3-website-sa-east-1.amazonaws.com/index.html" target="_blank">aqui.</a>

#### Instruções de Uso:
Na tela inicial você pode escolher entre criar um novo segredo ou revelar um segredo existente que você possua o token:

![gms001](https://user-images.githubusercontent.com/76691413/182849663-a8061612-6d9a-4222-8452-493a77c08a35.png)

Na tela de criação e um novo segredo você pode escolher se quer gerar uma senha ou um texto. Senhas exigem que o usuário obedeça às restrições descritas na própria tela:

![gms002](https://user-images.githubusercontent.com/76691413/182850143-b0dd478a-a06e-4929-b441-29809853ae8b.png)

Após escolher o tipo de segredo você pode escolher o tempo de vida dele. Esse tempo irá definir o quanto este segredo estará disponivel para ser recuperado. Em seguinda o você pode apertar o botão para guardar o segredo e um alerta com o token e o tempo de vida será mostrado:

![gms002-2](https://user-images.githubusercontent.com/76691413/182851454-dc0384dc-6f3d-4857-8432-03ab5f2cfa26.png)

Na tela de revelar segredo você deve digitar o token do segredo para recupera-lo. Se ele existir será exibido para você, assim como a opção para deleta-lo se preferir:

![gms003](https://user-images.githubusercontent.com/76691413/182851963-36d827ff-3699-404b-882c-a65cf69a22ea.png)

O token deve ser as especificações de 36 caracteres, incluindo os hífens. Se você digitar um token referente a o segredo existente verá ele na tela:

![gms003-4](https://user-images.githubusercontent.com/76691413/182852516-49ae36a2-e57d-49c5-b09d-019f273b2147.png)

Se decidir destruir o segredo um alerta em prompt é exibido e você deve digitar o token do segredo:

![gms004](https://user-images.githubusercontent.com/76691413/182852864-7407e6e5-ae15-4e00-a56c-f983aadda56c.png)

Se o token não existir uma mensagem será mostrada falando do erro. Se ele existir, ele deletará o segredo e irá para tela inicial.

### Implantando o projeto:

Primeiramente o GetMySecret é uma aplicação que usa arquitetura serverless e microsserviços. Para tal você precisará de uma conta AWS se não possuir pode conseguir aqui. Caso já possua siga os passos a seguir:

1. Clone o projeto para seu local
1. Vá até o recurso AWS Lambda e crie funções com os respectivos nomes existentes na pasta back-end. Você pode modificar os nomes. Em seguida carregue os zips das funções lambdas respectivas. Os zips estão na pasta zips. É importante ter uma função para cada zip. Você também precisará configurar uma variável de ambiente para sua região, caso contrário estará sujeito ao fuso horário  padrão do AWS e isso pode não corresponder a o da sua região. Você pode checar informações de permissão lambda nos arquivos .yml presentes em cada pagina contida no back-end.
1. No recurso AWS API Gateway configure os métodos post, get, delete para cada uma das funções lambda e associe cada uma também. Lembre-se de ativar o CORS. Se tiver dúvida veja a documentação do AWS sobre esse recurso. Endereço de api será utilizado nas funções de fetch de cada .js da pasta front end. Implante os métodos.
1. Altere o endereço de cada *api_link* nos .js dentro da pasta front-end/js polo endereço criados no API Gateway, será necessário para que funcione corretamente.
1. Crie uma tabela no DynamoBD, o banco noSQL da AWS, configure a partition key dando o nome de *secret_id*, partition key é como a primary key do SQL.
1. Usando o recurso AWS S3 crie um bucket S3 e inclua nele o conteúdo da pasta front-end (com os .js ja modificados para os api_link) e determine em propriedades que ele seja um *static site*, configure as permissões necessárias.
1. Configure um evento usando o recurso AWS Event Bridge para executar a função lambda AutoDelete, esta é a única função que não deve possuir ligação com api. Configure para ocorrer a chamada da função a cada 1 minuto. Se você não souber como configurar o Event Bridge pode procurar na documentação ou vídeo tutoriais na internet. Não é difícil.

Se tudo estiver ok, você conseguirá utilizar a aplicação a partir de sua implantação.

*OBS: AWS possui um free-tier de uso para novos usuários com uma cota mensal de gastos, o Event Bridge pode consumir muito recurso por fazer a chamada de função a cada 1 minuto. Então você pode ativá-lo apenas quando for testar a sua implantação.*

