import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { Comment as PrismaComment, User as PrismaUser } from '@prisma/client'

type PrismaCommentWithAuthor = PrismaComment & {
  author: PrismaUser
}

export class PrismaCommentWithAuthorMapper {
  static toDomain(raw: PrismaCommentWithAuthor): CommentWithAuthor {
    return CommentWithAuthor.create({
      author: {
        id: new UniqueEntityID(raw.author.id),
        name: raw.author.name,
      },
      commentId: new UniqueEntityID(raw.id),
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
