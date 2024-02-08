import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;


  @CreateDateColumn()
  created_At:string;

  @UpdateDateColumn()
  updated_At:Date;
  
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  // @Column()
  // DOB: string;

  @OneToOne(() => User, (user) => user.profile,{onDelete:'CASCADE'})
  @JoinColumn()
  user: User;
}

