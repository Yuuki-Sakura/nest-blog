import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from '@role/role.service';
import { RoleUpdateDto } from '@role/dto/role-update.dto';
import { Role } from '@role/role.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleCreateDto } from '@role/dto/role-create.dto';

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
  async findOne(@Param('id') id: string) {
    return await this.roleService.findById(id);
  }

  @Post()
  @ApiBody({ type: RoleCreateDto })
  save(@Body() role: RoleCreateDto) {
    return this.roleService.save(role);
  }

  @Put(':id')
  @ApiBody({ type: RoleUpdateDto })
  update(@Param('id') id: string, @Body() role: RoleUpdateDto) {
    return this.roleService.update(id, role);
  }
}
