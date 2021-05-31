import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@role/role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PermissionModule } from '@permission/permission.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Role]), PermissionModule],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
