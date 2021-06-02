import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { Global, Module } from '@nestjs/common';
import { SearchService } from '@search/seacrh.service';
import { SearchController } from '@search/search.controller';

@Global()
@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_NODE,
    }),
  ],
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
