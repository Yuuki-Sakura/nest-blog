import { Controller } from '@nestjs/common';
import { SearchService } from '@search/seacrh.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
}
