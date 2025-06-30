import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { DomainEvent } from '@/core/events/domain-event'
import type { QuestionComment } from '../entities/question-comment'

export class QuestionCommentCreatedEvent implements DomainEvent {
  public occurredAt: Date
  public questionComment: QuestionComment

  constructor(questionComment: QuestionComment) {
    this.questionComment = questionComment
    this.occurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.questionComment.id
  }
}
