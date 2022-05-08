import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class CommentsService {
  async getTowerEventComments(eventId) {
    const comments =  await dbContext.Comments.find({eventId}).populate('creator', 'name picture')
    return comments
  }
  async createComment(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator', 'name picture')
    return comment
  }
  async deleteComment(commentId, userId) {
    const targetComment = await dbContext.Comments.findById(commentId)
    if(!targetComment) {
      throw new BadRequest('Comment not found')
    }
    if(targetComment.creatorId.toString() !== userId.toString()) {
      throw new BadRequest('You cannot delete comments that you did not create')
    }
    await targetComment.remove()
  }
  
}

export const commentsService = new CommentsService();