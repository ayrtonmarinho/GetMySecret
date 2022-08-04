import json
import boto3

def lambda_handler(event, context):
   
    client = boto3.resource("dynamodb") #Da acesso aos recursos do DynamoDB
    table = client.Table("Secrets")     #Da acesso a tabela "Secrets"
    
    #Try e Except para capturar e tratar Exceções que possam ocorrer
    try:
        id = str(event['token'])        #Pega o ID do token passado pelo fetch de Delete
        
        response = table.delete_item(   #Procura na tabela para deletar, se existir delta, caso contrário levanta uma exception
            Key = {
                'secret_id': id
            }
        )
            
        return {                        #Sucesso no delete
            'statusCode': 200,
            'body': json.dumps('Deleted')
        }
    except:
        return {'statusCode': 500}      #O Delete deu errado e a exception foi levantada
