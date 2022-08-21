import { Controller, Get, Post, Delete, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterQueryDto } from './dto/filter-query.dto';
import { Article } from './entities/article.entity';
import { FeedService } from './feed.service';
import { Message } from './interfaces/feed.interface';

@ApiTags('Feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Feed of articles created' })
  @ApiResponse({ status: 404, description: 'Could not create Feed' })
  async createFeed(): Promise<Message> {
    return this.feedService.createFeed();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns articles based on query',
    type: FilterQueryDto,
  })
  @ApiResponse({ status: 404, description: 'Articles not found' })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'title',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'author',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'tag',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'storyTitle',
    type: String,
    required: false,
  })
  async findAll(
    @Query() filterOptions: FilterQueryDto,
  ): Promise<Array<Article>> {
    return this.feedService.findAll(filterOptions);
  }

  @Get('article/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiResponse({ status: 200, description: 'returns an article based on id' })
  @ApiResponse({ status: 404, description: 'article with given id not found' })
  async findOne(@Param('id') id: string): Promise<Article> {
    return this.feedService.findOne(parseInt(id));
  }

  @Delete()
  @ApiResponse({ status: 200, description: 'All articles deleted' })
  @ApiResponse({ status: 404, description: 'No articles to delete' })
  async removeAll(): Promise<Message> {
    return this.feedService.removeAll();
  }

  @Delete('article/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Article with id was deleted' })
  @ApiResponse({ status: 404, description: 'Article with given id not found' })
  async removeOne(@Param('id') id: string): Promise<Message> {
    return this.feedService.removeOne(parseInt(id));
  }
}
