import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Permission } from '@permission/permission.entity';
import { PermissionCreateDto } from '@permission/dto/permission-create.dto';
import { PermissionUpdateDto } from '@permission/dto/permission-update.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  findAll() {
    return this.permissionRepo.find();
  }

  findById(id: string) {
    return this.permissionRepo.findOne({ id });
  }

  findByName(name: string) {
    return this.permissionRepo.findOne({ name });
  }

  findByIds(ids: string[]) {
    return this.permissionRepo.findByIds(ids);
  }

  save(permission: PermissionCreateDto) {
    return this.permissionRepo.save(this.permissionRepo.create(permission));
  }

  update(id: string, permission: PermissionUpdateDto) {
    return this.permissionRepo.update(id, permission);
  }

  delete(id: string | string[]) {
    return this.permissionRepo.delete(id);
  }

  async clear() {
    return this.permissionRepo.clear();
  }
}
