import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
}
