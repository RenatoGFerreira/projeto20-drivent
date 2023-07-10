import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function createPayment(ticketId:number, params: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) {
    return prisma.payment.create({
        data:{
            ticketId,
            ...params
        }
    })
}

async function findPaymentByTicketId(ticketId:number) {
    return prisma.payment.findFirst({
        where:{
            ticketId
        }
    })
}



export default { findPaymentByTicketId, createPayment}