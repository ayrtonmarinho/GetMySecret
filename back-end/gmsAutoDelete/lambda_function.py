import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime, timedelta

def lambda_handler(event, context):

    client = boto3.resource("dynamodb") #Da acesso aos recursos do DynamoDB
    table = client.Table("Secrets")     #Da acesso a tabela "Secrets"
    
    #Try e Except para capturar e tratar Exceções que possam ocorrer
    try:
        resp = table.scan(ProjectionExpression = 'secret_id, lifetime')['Items'] #Usa o scan para trazer apenas os atributos descritos na expressão, semelhante ao select dos bancos SQL.
        
        for secret in resp:                 #Itera o response 'resp' para pegar id e lifetime de cada item retornado no response.
            id = secret['secret_id']
            strDate = secret['lifetime']
            
            remainingTime = datetime.strptime(strDate,'%d/%m/%Y as %H:%M:%S' ) #Converte a string para datetime usando o metodo strptime e na formatação desejada, não pode usar acento no as, caso contrario ele da erro.
            if remainingTime <= datetime.now():                                #Se o item estiver com a data e hora menor que o tempo atual (datetime.now()) ele será removido do 
                table.delete_item(
                    Key = {
                        'secret_id': id
                    }
                )
        return {'statusCode':200} #Retorna o status code de sucesso, 200, nem é necessario aqui.
    except:
        return {'statusCode': 500} #Internal Error
    