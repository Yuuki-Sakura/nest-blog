import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PermissionService } from '@permission/permission.service';
import { Auth } from '@auth/auth.utils';
import { PermissionCreateDto } from '@permission/dto/permission-create.dto';
import { PermissionUpdateDto } from '@permission/dto/permission-update.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('权限')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @Auth('permission.findAll', '查询所有权限')
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.permissionService.findById(id);
  }

  @Post()
  save(@Body() permission: PermissionCreateDto) {
    return this.permissionService.save(permission);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() permission: PermissionUpdateDto) {
    return this.permissionService.update(id, permission);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.permissionService.delete(id);
  }

  @Delete()
  deleteByIds(@Body() ids: string[]) {
    return this.permissionService.delete(ids);
  }
}
