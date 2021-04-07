import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '@app/role/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRoleDto } from '@app/role/dto/CreateRoleDto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  findByIds(ids: string[]) {
    return this.roleRepository.findByIds(ids);
  }
  findOneByName(name: string) {
    return this.roleRepository.findOne({ name });
  }
  findAll() {
    return this.roleRepository.find();
  }
  create(role: Role) {
    return this.roleRepository.save(role);
  }
  update(id: string, role: UpdateRoleDto) {
    return this.roleRepository.update(id, role);
  }
}
