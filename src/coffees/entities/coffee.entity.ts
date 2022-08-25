import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Flavor } from './flavor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  // Como Coffee es la tabla owner, solo aqui se agrega JointTable
  // @JoinTable()
  // @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })
  @Column('json', { nullable: true })
  flavors: string[];
}
