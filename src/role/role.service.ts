import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '@role/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRoleDto } from '@role/dto/role-update.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findById(id: string) {
    return this.roleRepository.findOne(id);
  }

  findByIds(ids: string[]) {
    return this.roleRepository.findByIds(ids);
  }

  findOneByName(name: string) {
    return this.roleRepository.findOne({ name });
  }

  findAll() {
    return this.roleRepository.find();
  }

  save(role: Role) {
    return this.roleRepository.save(role);
  }

  update(id: string, roleDto: UpdateRoleDto) {
    const role = this.roleRepository.findOne(id);
    if (!role) throw new BadRequestException('角色Id无效');
    return this.roleRepository.save(
      (Object.assign(role, roleDto) as unknown) as Role,
    );
  }

  delete(id: string | string[]) {
    return this.roleRepository.delete(id);
  }
}
