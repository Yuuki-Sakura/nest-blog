import { TPermissions } from '@app/role/role.entity';

export class UpdateRoleDto {
  name?: string;
  permissions?: TPermissions;
}
