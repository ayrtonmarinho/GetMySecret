import json
import boto3
import base64


def lambda_handler(event, context):
    
    client = boto3.resource("dynamodb") #Da acesso aos recursos do DynamoDB
    table = client.Table("Secrets")     #Da acesso a tabela "Secrets"
    
    #Try e Except para capturar e tratar Exceções que possam ocorrer
    try:
        id = str(event['token'])        #Pega o valor do token que foi passado pelo fetch
        
        response = table.get_item(      #Procura na tabela o item com o id, se não encontrar levanta uma exception
            Key={
                'secret_id': id
            }
        )
        valor = response['Item']        #Pega o item da response e coloca num dictionary
        encoded_secret = valor['secret'] #acessa o valor de secret no dictionary valor, o valor esta codificado
        
        decoded = base64.b64decode(encoded_secret.encode('utf-8')) #decodifica o secret usando o decodificado de base64, utilizando o encode utf-8
        decoded_secret = decoded.decode('utf-8')
            
        return {                        #Sucesso, retorna um json com o segredo e o tempo de vida do segredo
            'statusCode': 200,
            'body': json.dumps(decoded_secret),
            'lifetime':valor['lifetime']
        }   
    except:
        return {                        #A exception foi levantada, não havia qualquer token referente ao ID, retorna o status code de not found, 404
            'statusCode': 404,
            'message': 'Not found'
            
        }
   
