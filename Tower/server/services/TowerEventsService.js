import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class TowerEventsService {
  async getAllTowerEvents() {
    return await dbContext.TowerEvents.find({}).populate('creator', 'name picture')
  }
  async getTowerEventById(id) {
    const towerEvent = await dbContext.TowerEvents.findById(id)
    if(!towerEvent) {
      throw new BadRequest('Event Not Found')
    }
    await towerEvent.populate('creator', 'name picture')
    return towerEvent
  }
  async createTowerEvent(body) {
    const towerEvent = await dbContext.TowerEvents.create(body)
    await towerEvent.populate('creator', 'name picture')
    return towerEvent
  }
  async editTowerEvent(body) {
    const targetTowerEvent = await this.getTowerEventById(body.id)
    if(targetTowerEvent.creatorId.toString() !== body.creatorId.toString()) {
      throw new BadRequest('You cannot edit events that you did not create')
    }
    if(targetTowerEvent.isCanceled) {
      throw new BadRequest('Cannot edit canceled events')
    }
    targetTowerEvent.name = body.name || targetTowerEvent.name
    targetTowerEvent.description = body.description || targetTowerEvent.description
    targetTowerEvent.coverImg = body.coverImg || targetTowerEvent.coverImg
    targetTowerEvent.location = body.location || targetTowerEvent.location
    targetTowerEvent.capacity = body.capacity || targetTowerEvent.capacity
    targetTowerEvent.startDate = body.startDate || targetTowerEvent.startDate
    await targetTowerEvent.save()
    return targetTowerEvent
  }
  async cancelTowerEvent(eventId, userId) {
    const targetTowerEvent = await this.getTowerEventById(eventId)
    if(targetTowerEvent.creatorId.toString() !== userId.toString()) {
      throw new BadRequest('You cannot delete events that you did not create')
    }
    targetTowerEvent.isCanceled = true
    targetTowerEvent.save()
    return targetTowerEvent
  }

}
export const towerEventsService = new TowerEventsService()