import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments Use Case', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    const ANSWER_ID = 'answer-01'

    const student = makeStudent({
      name: 'John Doe',
    })
    inMemoryStudentsRepository.create(student)

    const comment1 = makeAnswerComment({
      answerId: new UniqueEntityID(ANSWER_ID),
      authorId: student.id,
    })
    const comment2 = makeAnswerComment({
      answerId: new UniqueEntityID(ANSWER_ID),
      authorId: student.id,
    })
    const comment3 = makeAnswerComment({
      answerId: new UniqueEntityID(ANSWER_ID),
      authorId: student.id,
    })

    inMemoryAnswerCommentsRepository.create(comment1)
    inMemoryAnswerCommentsRepository.create(comment2)
    inMemoryAnswerCommentsRepository.create(comment3)

    const result = await sut.execute({
      answerId: ANSWER_ID,
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: {
            id: student.id,
            name: 'John Doe',
          },
          commentId: comment1.id,
        }),
        expect.objectContaining({
          author: {
            id: student.id,
            name: 'John Doe',
          },
          commentId: comment2.id,
        }),
        expect.objectContaining({
          author: {
            id: student.id,
            name: 'John Doe',
          },
          commentId: comment3.id,
        }),
      ]),
    )
  })

  it('should be able to fetch paginated answer comments', async () => {
    const ITEMS_QUANTITY = 21
    const ANSWER_ID = 'answer-01'

    const student = makeStudent()
    inMemoryStudentsRepository.create(student)

    for (let i = 1; i <= ITEMS_QUANTITY; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID(ANSWER_ID),
          authorId: student.id,
        }),
      )
    }

    const result = await sut.execute({
      answerId: ANSWER_ID,
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.comments).toHaveLength(1)
  })
})
