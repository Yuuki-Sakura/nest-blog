import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
