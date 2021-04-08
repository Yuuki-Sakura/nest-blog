import { TPermissions } from '@role/role.entity';

export class UpdateRoleDto {
  name?: string;
  permissions?: TPermissions;
}
