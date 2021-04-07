import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@app/shared/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';

type TPermission = {
  query?: boolean;
  create?: boolean;
  update?: boolean;
  delete?: boolean;
};
export type TPermissions = { [key: string]: { [key: string]: TPermission } };

@Entity('role')
export class Role extends BaseEntity {
  @ApiProperty()
  @Column({ comment: '角色名称' })
  name: string;

  @ApiProperty()
  @Column('json', { comment: '权限列表' })
  permissions: TPermissions;
}
