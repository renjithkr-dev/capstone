import * as AWS from "aws-sdk"
import * as AWSXRay from "aws-xray-sdk-core"

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { v4 as uuid } from 'uuid'
import { logger} from '../util'
//import { UpdateURLForItem } from "../dataaccess/provider"


const xAWS=AWSXRay.captureAWS(AWS)
const s3 = new xAWS.S3({ 'signatureVersion': 'v4' })

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const key = `upload/${uuid()}`

  var params = { Bucket: process.env.BUCKET_NAME, Key: key, Expires: 300 };
  try {
    const url = s3.getSignedUrl('putObject', params)
    //await UpdateURLForItem(apptId, `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`)
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ "uploadUrl": url })
    }
  } catch (err) {
    logger.error(err)
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ "uploadUrl": '' })
    }
  }
}
