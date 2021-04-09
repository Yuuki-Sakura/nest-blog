import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from '@role/role.service';
import { UpdateRoleDto } from '@role/dto/role-update.dto';
import { Role } from '@role/role.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from '@role/dto/role-create.dto';

@ApiTags('角色')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiResponse({ type: Role, isArray: true })
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Role })
  findOne(@Param('id') id: string) {
    return this.roleService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateRoleDto })
  save(@Body() role: Role) {
    return this.roleService.save(role);
  }

  @Put(':id')
  @ApiBody({ type: UpdateRoleDto })
  update(@Param('id') id: string, @Body() role: UpdateRoleDto) {
    return this.roleService.update(id, role);
  }
}
