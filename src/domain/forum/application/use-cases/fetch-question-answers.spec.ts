import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    const QUESTION_ID = 'question-01'

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID(QUESTION_ID),
      }),
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID(QUESTION_ID),
      }),
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID(QUESTION_ID),
      }),
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-02'),
      }),
    )

    const result = await sut.execute({
      questionId: QUESTION_ID,
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    const ITEMS_QUANTITY = 21
    const QUESTION_ID = 'question-01'

    for (let i = 1; i <= ITEMS_QUANTITY; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityID(QUESTION_ID) }),
      )
    }

    const result = await sut.execute({
      questionId: QUESTION_ID,
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.answers).toHaveLength(1)
  })
})
