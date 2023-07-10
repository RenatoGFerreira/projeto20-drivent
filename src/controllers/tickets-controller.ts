import { Response, Request } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
    try{
        const ticketTypes = await ticketService.getTicketTypes()
        return res.status(httpStatus.OK).send(ticketTypes)
    }catch(error){
        return res.status(httpStatus.NO_CONTENT).send(error);
    }
    
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const {userId} = req
    try{
        const ticket = await ticketService.getTicketByUserId(userId)
        return res.status(httpStatus.OK).send(ticket)
        
    }catch(error){
        return res.status(httpStatus.NOT_FOUND).send(error);
    }
    
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
    const {userId} = req
    const { ticketTypeId} = req.body

    if(!ticketTypeId) return res.status(httpStatus.BAD_REQUEST).send("ticket not found")
    try{
        const ticket = await ticketService.createTicket(userId, ticketTypeId)
        return res.status(httpStatus.CREATED).send(ticket)
        
    }catch(error){
        return res.status(httpStatus.NOT_FOUND).send(error);
    }
    
}