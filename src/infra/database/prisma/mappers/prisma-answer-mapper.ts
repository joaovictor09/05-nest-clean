import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Prisma, Answer as PrismaAnswer } from '@prisma/client'

export class PrismaAnswerMapper {
  static toDomain(raw: PrismaAnswer): Answer {
    return Answer.create(
      {
        content: raw.content,
        questionId: new UniqueEntityID(raw.questionId),
        authorId: new UniqueEntityID(raw.authorId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(raw: Answer): Prisma.AnswerUncheckedCreateInput {
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
