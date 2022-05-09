import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";

class CommentsService {
  async createComment(body) {
    const res = await api.post('api/comments', body)
    AppState.comments.push(res.data)
  }
  async deleteComment(id) {
    await api.delete('api/comments/' + id)
    const index = AppState.comments.findIndex(c => c.id === id)
    AppState.comments.splice(index, 1)
  }
}

export const commentsService = new CommentsService();