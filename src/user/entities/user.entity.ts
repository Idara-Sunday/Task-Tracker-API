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
 
  @OneToOne(()=>Profile,(profile) => profile.user) 
  @JoinColumn()
  profile:Profile;
 
  @OneToMany(()=>Post,(post)=> post.user)
  post:Post[];



  
  // @Column()
  // task_title: string;
 
  // @Column()
  // task_description: string;

  // @Column()
  // task_status: string;

  // @Column({
  //   type: 'enum',
  //   enum: Roles,
  //   default: Roles.user,
  // })
  // role: Roles;
}


