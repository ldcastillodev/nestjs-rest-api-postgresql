import { Test, TestingModule } from '@nestjs/testing';
import { FilterQueryDto } from './dto/filter-query.dto';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { SavedMessage } from './interfaces/feed.interface';
import { Article } from './entities/article.entity';

describe('FeedController', () => {
  let controller: FeedController;
  let fakeFeedService: Partial<FeedService>;

  beforeEach(async () => {
    fakeFeedService = {
      createFeed: () => {
        return Promise.resolve({
          message: 'Feed created successfully',
          savedFeed: [],
        } as SavedMessage);
      },
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          author: 'author',
          tags: [],
          title: 'title',
        }) as Promise<Article>;
      },
      findAll: ({ limit, page, author, tag, title }: FilterQueryDto) => {
        return Promise.resolve({
          feed: [],
        } as unknown as Array<Article>);
      },
      removeAll: () => {
        return Promise.resolve({
          message: 'Feed successfully removed',
        });
      },
      removeOne: (id: number) => {
        return Promise.resolve({
          message: `article with id ${id} successfully removed`,
        });
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [
        {
          provide: FeedService,
          useValue: fakeFeedService,
        },
      ],
    }).compile();

    controller = module.get<FeedController>(FeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a feed of articles', async () => {
    expect(await controller.createFeed()).toEqual({
      message: expect.any(String),
      savedFeed: expect.any(Array),
    });
  });

  it('should return a feed of articles based on query params', async () => {
    const filterQuery: FilterQueryDto = {
      limit: 5,
      page: 1,
      author: 'author',
      tag: 'tag',
      title: 'title',
      storyTitle: 'storyTitle',
    };
    expect(await controller.findAll(filterQuery)).toEqual({
      feed: expect.any(Array),
    });
  });

  it('should find one article based on id', async () => {
    const id = '1';
    expect(await controller.findOne(id)).toEqual({
      id: expect.any(Number),
      author: expect.any(String),
      tags: expect.any(Array),
      title: expect.any(String),
    });
  });

  it('should delete feed', async () => {
    expect(await controller.removeAll()).toEqual({
      message: expect.any(String),
    });
  });

  it('should delete an article based on id', async () => {
    const id = '1';
    expect(await controller.removeOne(id)).toEqual({
      message: expect.any(String),
    });
  });
});

/* 
  const mockFeedService = {
    createFeed: jest.fn(() => {
      return {
        message: 'hello',
        feed: [],
      };
    }),
    findAll: jest.fn(() => {
      return {
        feed: [],
      };
    }),
    findOne: jest.fn((id: number) => {
      return {
        id,
        author: 'author',
        tags: [],
        title: 'title',
      };
    }),
    removeAll: jest.fn(() => {
      return {
        message: 'hello',
      };
    }),
    removeOne: jest.fn(() => {
      return {
        message: 'message',
      };
    }),
  };
*/
