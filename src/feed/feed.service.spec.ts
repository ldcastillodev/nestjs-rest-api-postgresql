import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { FeedService } from './feed.service';

describe('FeedService', () => {
  let service: FeedService;

  const mockArticleRepository = {
    create: jest.fn().mockImplementation((feed: Array<Article>) => feed),
    save: jest
      .fn()
      .mockImplementation((article: Array<Article>) =>
        Promise.resolve({ id: '1', ...article }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedService,
        {
          provide: getRepositoryToken(Article),
          useValue: mockArticleRepository,
        },
      ],
      imports: [HttpModule],
    }).compile();

    service = module.get<FeedService>(FeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
