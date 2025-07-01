import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class AnswerCommentPresenter {
  static toHTTP(answerComment: AnswerComment) {
    return {
      id: answerComment.id.toString(),
      content: answerComment.content,
      answerId: answerComment.answerId.toString(),
      authorId: answerComment.authorId.toString(),
      createdAt: answerComment.createdAt,
      updatedAt: answerComment.updatedAt,
    }
  }
}
