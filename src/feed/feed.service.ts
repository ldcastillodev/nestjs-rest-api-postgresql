import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository, ArrayContains } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { FilterQueryDto } from './dto/filter-query.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { IFeed, Message, SavedMessage } from './interfaces/feed.interface';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Article) private _articleRepository: Repository<Article>,
    private readonly _httpService: HttpService,
  ) {}

  @Cron('0 * * * *')
  async createFeed(): Promise<SavedMessage> {
    let response: Array<IFeed>;
    try {
      response = await this._getFeedData();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    const feed = response.map(({ title, author, _tags, story_title }) => ({
      title,
      author,
      tags: _tags,
      storyTitle: story_title,
    })) as Array<Article>;

    let savedFeed: Array<Article>;
    try {
      const createdFeed: Array<Article> = this._articleRepository.create(feed);
      savedFeed = await this._articleRepository.save(createdFeed);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    return { message: 'Feed successfully created', savedFeed };
  }

  async _getFeedData() {
    return lastValueFrom(
      this._httpService
        .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
        .pipe(
          map((res) => {
            return res.data.hits;
          }),
        ),
    );
  }

  async findOne(id: number): Promise<Article> {
    let article: Article;

    try {
      article = await this._articleRepository.findOneBy({ id });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    if (!article)
      throw new NotFoundException(`article with id ${id} not found`);

    return article;
  }

  async findAll({
    limit = 5,
    page = 1,
    title,
    author,
    tag,
    storyTitle,
  }: FilterQueryDto): Promise<Array<Article>> {
    const take = limit;
    const offset = (page - 1) * take;
    let feed: Array<Article>;

    try {
      feed = await this._articleRepository.find({
        skip: offset,
        take,
        where: {
          title: title ? title : undefined,
          author: author ? author : undefined,
          storyTitle: storyTitle ? storyTitle : undefined,
          tags: tag ? ArrayContains([tag]) : undefined,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    if (feed.length === 0) throw new NotFoundException('No articles found');

    return feed;
  }

  async removeAll(): Promise<Message> {
    let feed: Array<Article>;

    try {
      feed = await this._articleRepository.find();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    if (feed.length === 0) throw new NotFoundException('No feed found');

    try {
      await this._articleRepository.remove(feed);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    return { message: 'All articles successfully removed' };
  }

  async removeOne(id: number): Promise<Message> {
    let article: Article;

    try {
      article = await this.findOne(id);
    } catch (e) {
      throw new NotFoundException(`post with id ${id} not found`);
      ;
    }
    
    if (!article) throw new NotFoundException(`post with id ${id} not found`);

    try {
      await this._articleRepository.remove(article);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    return { message: `article with id ${id} successfully removed` };
  }
}
