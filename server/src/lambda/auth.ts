import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent } from "aws-lambda/trigger/api-gateway-authorizer";
import { verify, decode } from 'jsonwebtoken'
import { SecretsManager } from "aws-sdk"
import { logger } from '../util'
import { JWT } from '../models/jwt'

const client = new SecretsManager()
const secretId: any = process.env.AUTH0_SECRET_ID || 'AUTH0_SECRETS_SET'
const secretField = process.env.AUTH0_SECRET_FIELD || 'AUTH0_SECRET_UDAGRAM'

export const handler = async (
    event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
    let jwt
    try {
        const authHeader = (event.authorizationToken)
        if (!authHeader) throw new Error('No authentication header')

        if (!authHeader.toLowerCase().startsWith('bearer '))
            throw new Error('Invalid authentication header')

        const split = authHeader.split(' ')
        const token = split[1]
        logger.info("decoded :   ", decode(token))
        const secretObj = await client.getSecretValue({
            SecretId: secretId
        }).promise()
        var secretCert = JSON.parse(secretObj.SecretString || "")[secretField]
        if (!secretCert)
            throw new Error("unable to find key to decrypt")
        let buff = new Buffer(secretCert, 'base64');
        const decodedSecret = buff.toString('ascii');
        jwt = verify(token, decodedSecret) as JWT
        logger.info("verify :  ", jwt)
    } catch (e) {
        logger.error(e);
        return {
            principalId: '*',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Deny',
                        Resource: '*'
                    }
                ]
            }
        }
    }
    const principal = jwt ? jwt.sub.toString().split('|')[1] : "none"
    //const permissions:string=jwt?JSON.stringify(jwt.permissions):""
    const permissions=jwt?jwt.permissions as string[]:[""]
    logger.info(`principal : ${principal}`)
    return {
        principalId: `${principal}`,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: 'Allow',
                    Resource: '*'
                }
            ]
        },
        context:{
            "permissions": permissions.toString()
        }
    }
}