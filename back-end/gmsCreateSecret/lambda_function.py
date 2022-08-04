import json
from datetime import datetime, timedelta
from uuid import uuid4
import boto3
import base64



def lambda_handler(event, context):
   
    client = boto3.resource("dynamodb") #Da acesso aos recursos do DynamoDB
    table = client.Table("Secrets")     #Da acesso a tabela "Secrets"
    
    #Try e Except para capturar e tratar Exceções que possam ocorrer
    try:
        mysecret = event['mysecret']    #Pega o segredo vindo do fetch e converte em string
        id = str(uuid4()).upper()       #Gera um uuid4 para ser usado como ID e posteriormente token de acesso
        
        
        encode = (base64.b64encode(mysecret.encode('utf-8')))  #Encripta o segredo em base64 e codificação utf-8
        encoded_secret = encode.decode('utf-8')
        
        time = str(event['lifetime'])                          #Pega o valor do tempo de vida de vida que será adicionado ao segredo e converte em string
        time = time.split(':')                                 #Da um split na string
        time = datetime.now()+timedelta(days=int(time[0]), hours=int(time[1]), minutes=int(time[2]), seconds=int(time[3])) #Faz a soma do tempo que será adicionado com tempo atual
        lifetime = str(time.strftime('%d/%m/%Y as %H:%M:%S'))  #Como a ação feita acima converte em datetime, agora é convertido em string usando a formatação do strftime
                                                               #A formatação não pode ter caracteres como acento do 'as', pois la na frente no delete precisaremos converter o valor de volta para datetime e da erro caso seja 'às'
    
        response = table.put_item(                             #Adciona o segredo na tabela 'Secrets'
            Item = {
                "secret_id": id,
                "secret": encoded_secret,
                "lifetime": lifetime
            }
            
            )
        return {                                               #Retorna um json com body contendo o ID --> Token e o Lifetime
            'statusCode': 200,
            'body': json.dumps(id),
            'lifetime': lifetime
        }
    except:
        return  {'message': 'An internal error occurred',  
                'statusCode': 500} #Retorna um erro com status code 500, erro geral.
