import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from '@app/role/role.service';
import { UpdateRoleDto } from '@app/role/dto/CreateRoleDto';
import { Role } from '@app/role/role.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('角色')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOneByName(id);
  }

  @ApiBody({ type: Role })
  @Post()
  create(@Body() role: Role) {
    return this.roleService.create(role);
  }

  @ApiBody({ type: UpdateRoleDto })
  @Put(':id')
  update(@Param('id') id: string, @Body() role: UpdateRoleDto) {
    return this.roleService.update(id, role);
  }
}
