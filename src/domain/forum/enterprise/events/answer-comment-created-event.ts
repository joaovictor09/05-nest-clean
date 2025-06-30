import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { DomainEvent } from '@/core/events/domain-event'
import type { AnswerComment } from '../entities/answer-comment'

export class AnswerCommentCreatedEvent implements DomainEvent {
  public occurredAt: Date
  public answerComment: AnswerComment

  constructor(answerComment: AnswerComment) {
    this.answerComment = answerComment
    this.occurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.answerComment.id
  }
}
