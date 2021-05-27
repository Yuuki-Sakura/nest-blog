import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { Module } from '@nestjs/common';
import { SearchService } from '@search/seacrh.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ELASTICSEARCH_NODE } = require('../../config.json');

@Module({
  imports: [
    ElasticsearchModule.register({
      node: ELASTICSEARCH_NODE,
    }),
  ],
  providers: [SearchService],
})
export class SearchModule {}
