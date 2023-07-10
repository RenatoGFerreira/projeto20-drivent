import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentByTicketId, paymentProcess } from "@/controllers";


const paymentsRouter = Router()

paymentsRouter
            .all('/*', authenticateToken)
            .get('/payments/:ticketId', getPaymentByTicketId) 
            .post('/payments/process', paymentProcess) 


export {paymentsRouter}