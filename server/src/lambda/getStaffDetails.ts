import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"
import { Staff } from "../models/Staff";
import { validateUserPermissions } from "../util";

export const handler:APIGatewayProxyHandler=async (event:APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    if ((validateUserPermissions(event,["read:user-appointments"]).status!="OK")) {
        return (
          {
            statusCode: 401,
            headers: {
              "Access-Control-Allow-Origin": "http://localhost:3000",
              'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({ message: "User not authorized" })
          })
      }
    const staff:Staff[]=[
        {
            StaffId:"602966e6c8851c006901d02c",
            StaffName:"Staff1",
            Department:"Sales"
        },
        {
            StaffId:"602f443866abcd006913e2b9",
            StaffName:"Staff2",
            Department:"Support"
        },
        {
            StaffId:"602f445faf50460069626375",
            StaffName:"Staff3",
            Department:"R&D"
        }
    ];
    return (
        {
            statusCode: 200,
              headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                'Access-Control-Allow-Credentials': true
              },
              body:JSON.stringify({
                  "count":staff.length,
                  "data":staff
              })
        }
    )
}