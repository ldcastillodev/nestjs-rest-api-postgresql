import { Article } from '../entities/article.entity';

interface AuthorData {
  value: string;
  matchLevel: string;
  matchedWords: Array<string>;
}

interface CommentData {
  value: string;
  matchLevel: string;
  fullyHighligthed: boolean;
  matchedWords: Array<string>;
}

interface StoryData {
  value: string;
  matchLevel: string;
  matchedWords: Array<string>;
}

interface HighlightedData {
  author: AuthorData;
  comment_text: CommentData;
  story_title: StoryData;
  story_url: StoryData;
}

export interface IFeed {
  created_at: Date;
  title: string;
  url: string;
  author: string;
  points: number;
  story_text: string;
  comment_text: string;
  num_comments: number;
  story_id: number;
  story_title: string;
  story_url: string;
  parent_id: number;
  created_at_i: number;
  _tags: Array<string>;
  objectID: string;
  _highlightResult: HighlightedData;
}

export interface SavedMessage {
  message: string;
  savedFeed: Array<Article>;
}

export interface Message {
  message: string;
}
