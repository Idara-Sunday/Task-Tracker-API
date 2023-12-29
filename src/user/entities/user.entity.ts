import { Roles } from 'src/enum/roles';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from './posts.entity';

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  id:number;

  @CreateDateColumn()
  created_At:Date;

  @UpdateDateColumn()
  updated_At:Date;
  
  @Column({unique:true})
  email: string;

  @Column()
  password: string;
 
  @OneToOne(()=>Profile,(profile) => profile.user,) 
  profile:Profile;
 
  @OneToMany(()=>Post,(post)=> post.user)
  post:Post[];

}

