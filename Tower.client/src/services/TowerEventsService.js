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
    return res.data
  }
  async getActiveTowerEvent(id) {
    const res = await api.get('api/events/' + id)
    AppState.activeTowerEvent = res.data
  }
}

export const towerEventsService = new TowerEventsService ();