import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TowerEventsService {
  async getAllTowerEvents() {
    const res = await api.get('api/events')
    AppState.towerEvents = res.data
  }
  async createTowerEvent(formData) {
    const res = await api.post('api/events', formData)
    AppState.towerEvents.unshift(res.data)
    AppState.activeTowerEvent = res.data
    return res.data
  }
  async getActiveTowerEvent(id) {
    const res = await api.get('api/events/' + id)
    AppState.activeTowerEvent = res.data
    AppState.capacity = res.data.capacity
  }
  async getTowerEventTickets(id) {
    const res = await api.get('api/events/' + id + "/tickets")
    AppState.activeTickets = res.data
  }
  async getTowerEventComments(id) {
    const res = await api.get('api/events/' + id + '/comments')
    AppState.comments = res.data
  }
  async cancelEvent(id) {
    await api.delete('api/events/' + id)
    AppState.activeTowerEvent.isCanceled = true
  }
}

export const towerEventsService = new TowerEventsService ();