import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { Global, Module } from '@nestjs/common';
import { SearchService } from '@search/seacrh.service';
import { SearchController } from '@search/search.controller';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ELASTICSEARCH_NODE } = require('../../config.json');

@Global()
@Module({
  imports: [
    ElasticsearchModule.register({
      node: ELASTICSEARCH_NODE,
    }),
  ],
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
