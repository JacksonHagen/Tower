import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { accountService } from "./AccountService.js";

class TicketsService {
  async getTowerEventTickets(eventId) {
    return await dbContext.Tickets.find({eventId}).populate('event account')
  }
  async getUserTickets(accountId) {
    return await dbContext.Tickets.find({accountId}).populate('event')
  }
  async deleteTicket(ticketId, userId) {
    const targetTicket = await dbContext.Tickets.findById(ticketId)
    if(!targetTicket) {
      throw new BadRequest('Could not find ticket')
    }
    if(targetTicket.accountId.toString() !== userId.toString()) {
      throw new BadRequest('You cannot delete tickets that are not yours')
    }
    let towerEvent = await dbContext.TowerEvents.findById(targetTicket.eventId)
    towerEvent.capacity = towerEvent.capacity + 1
    await towerEvent.save()
    await targetTicket.remove()
  }
  async createTicket(body) {
    const towerEvent = await dbContext.TowerEvents.findById(body.eventId)
    if(towerEvent.capacity <= 0) {
      throw new BadRequest('No tickets are available')
    }
    towerEvent.capacity = towerEvent.capacity - 1
    await towerEvent.save()
    const ticket = await dbContext.Tickets.create(body)
    await ticket.populate('event')
    await ticket.populate('account')
    return ticket
  } 
}

export const ticketsService = new TicketsService();