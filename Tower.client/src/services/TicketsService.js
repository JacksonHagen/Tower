import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TicketsService
{
  async getUserTickets() {
    const res = await api.get('account/tickets')
    AppState.userTickets = res.data
  }

  async createTicket(body) {
    const res = await api.post('api/tickets', body)
    AppState.userTickets.unshift(res.data)
    AppState.capacity = res.data.event.capacity
  }
  async deleteTicket(id) {
    await api.delete('api/tickets/' + id)
    const index = AppState.userTickets.findIndex(t => t.id === id)
    AppState.userTickets.splice(index, 1)
    AppState.capacity = res.data.event.capacity
  }
}

export const ticketsService = new TicketsService();