import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Prisma, Comment as PrismaComment } from '@prisma/client'

export class PrismaQuestionCommentMapper {
  static toDomain(raw: PrismaComment): QuestionComment {
    if (!raw.questionId) {
      throw new Error('Invalid comment type.')
    }

    return QuestionComment.create(
      {
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        questionId: new UniqueEntityID(raw.questionId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(raw: QuestionComment): Prisma.CommentUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      content: raw.content,
      questionId: raw.questionId.toString(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      authorId: raw.authorId.toString(),
    }
  }
}
