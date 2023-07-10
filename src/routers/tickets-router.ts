import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createTicket, getTicketTypes, getTickets } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
            .all('/*', authenticateToken)
            .get("/tyckets/types", getTicketTypes) 
            .get("/tickets", getTickets) // /tickets
            .post("/tickets", createTicket)  // /tickets

    

export {ticketsRouter};