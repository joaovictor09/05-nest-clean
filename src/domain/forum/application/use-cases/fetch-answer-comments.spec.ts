import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    const ANSWER_ID = 'answer-01'

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID(ANSWER_ID),
      }),
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID(ANSWER_ID),
      }),
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID(ANSWER_ID),
      }),
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-02'),
      }),
    )

    const result = await sut.execute({
      answerId: ANSWER_ID,
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    const ITEMS_QUANTITY = 21
    const ANSWER_ID = 'answer-01'

    for (let i = 1; i <= ITEMS_QUANTITY; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID(ANSWER_ID) }),
      )
    }

    const result = await sut.execute({
      answerId: ANSWER_ID,
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.answerComments).toHaveLength(1)
  })
})
