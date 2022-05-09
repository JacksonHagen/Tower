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
    AppState.userTickets = [res.data, ...AppState.userTickets]
    logger.log(AppState.userTickets, res.data)
  }
}

export const ticketsService = new TicketsService();