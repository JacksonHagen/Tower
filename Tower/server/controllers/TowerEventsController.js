import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
      this.router
        .get('', this.getAllTowerEvents)
        .get('/:id', this.getTowerEventById)
        .get('/:id/tickets', this.getTowerEventTickets)
        .get('/:id/comments', this.getTowerEventComments)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createTowerEvent)
        .put('/:id', this.editTowerEvent)
        .delete('/:id', this.cancelTowerEvent)
    }
    async getAllTowerEvents(req, res, next) {
      try {
        const towerEvents = await towerEventsService.getAllTowerEvents()
        res.send(towerEvents)
      } catch (error) {
        next(error)
      }
    }
    async getTowerEventById(req, res, next) {
      try {
        const towerEvent = await towerEventsService.getTowerEventById(req.params.id)
        res.send(towerEvent)
      } catch (error) {
        next(error)
      }
    }
  async getTowerEventTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getTowerEventTickets(req.params.id)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async getTowerEventComments(req, res, next) {
    try {
      const comments = await commentsService.getTowerEventComments(req.params.id)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  
  async createTowerEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.createTowerEvent(req.body)
      res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async editTowerEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const towerEvent = await towerEventsService.editTowerEvent(req.body)
      res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async cancelTowerEvent(req, res, next) {
    try {
      const towerEvent = await towerEventsService.cancelTowerEvent(req.params.id, req.userInfo.id)
      res.send(towerEvent)
    } catch (error) {
      next(error)
    }
}
}