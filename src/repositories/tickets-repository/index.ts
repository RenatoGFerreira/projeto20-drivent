import { prisma } from "@/config";
import { CreateTicketParams } from "@/protocols";
import { TicketStatus } from "@prisma/client";

async function findTicketTypes() {
    return prisma.ticketType.findMany()
}

async function findTicketByEnrollmentId(enrollmentId: number){
    return prisma.ticket.findFirst({
        where: { enrollmentId},
        include: {
            TicketType: true
        }}
    )
}

async function createTicket( ticket: CreateTicketParams){
    return prisma.ticket.create({
        data:{
            ...ticket
            
        }
    })
}

async function findTicketById(ticketId: number){
    return prisma.ticket.findFirst({
        where:{
            id: ticketId
        },
        include: {
            Enrollment: true
            
        }
    })
}

async function findTicketWithTypeById(ticketId: number){
    return prisma.ticket.findFirst({
        where:{
            id: ticketId
        },
        include: {
            TicketType: true
        }
    })
}

async function ticketPayment(ticketId: number){
    return prisma.ticket.update({
        where:{
            id: ticketId
        },
        data: {
            status: TicketStatus.PAID
        }
    })
}
export default { findTicketTypes, createTicket, findTicketByEnrollmentId, findTicketById, findTicketWithTypeById, ticketPayment}