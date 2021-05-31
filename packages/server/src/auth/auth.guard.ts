import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SearchService } from '@search/seacrh.service';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') implements CanActivate {
  @Inject(SearchService)
  private readonly searchService: SearchService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context
      .switchToHttp()
      .getRequest()
      .headers?.authorization?.split(' ')[1];
    const { body } = await this.searchService.client.exists({
      index: 'expired-token',
      id: token,
    });
    if (body) throw new UnauthorizedException('token has expired');
    return super.canActivate(context) as boolean;
  }
}
