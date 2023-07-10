import { Request, Response } from "express"
import httpStatus from "http-status"
import { AuthenticatedRequest } from "@/middlewares"
import paymentsService from "@/services/payments-service"

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
    const {userId} = req
    const ticketId = Number(req.query.ticketId)
    
    try{
        if(!ticketId) {
            return res.status(httpStatus.BAD_REQUEST).send("Ticket not found.")
        }

        const payment = await paymentsService.getPaymentByTicketId(userId, ticketId)
        if(!payment) return res.status(httpStatus.NOT_FOUND).send("Payment not made.")

        return res.status(httpStatus.OK).send(payment)
    }catch(error){
        if(error.name === 'UnauthorizedError'){
            return res.status(httpStatus.UNAUTHORIZED).send("Unauthorized")
        }
        return res.status(httpStatus.NOT_FOUND).send(error);
    }
}


export async function paymentProcess(req: AuthenticatedRequest, res: Response){
    const { userId} = req
    const { ticketId, cardData} = req.body

    try{
        if(!ticketId){
            return res.status(httpStatus.NOT_FOUND).send("ticket not found")  // colocar BAD REQUEST httpstatus
        }
        if(!cardData){
            return res.status(httpStatus.BAD_REQUEST).send("cardData not found")
        }

        const payment = await paymentsService.paymentProcess(ticketId, userId, cardData)
        if(!payment){
            return res.status(httpStatus.NOT_FOUND).send("payment not found")
        }
        return res.status(httpStatus.OK).send(payment)
    }catch(error){
        if(error.name === 'UnauthorizedError'){
            return res.status(httpStatus.UNAUTHORIZED).send("Unauthorized")
        }
        return res.status(httpStatus.NOT_FOUND).send(error);
    }
}