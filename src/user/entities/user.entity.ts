import { Roles } from 'src/enum/roles';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { Profile } from './profile';
import { Post } from './posts.entity';

@Entity()
export class User extends Base {
  @Column({unique:true})
  email: string;

  @Column()
  password: string;

  @OneToOne(()=>Profile,(profile) => profile.user)
  @JoinColumn()
  profile:Profile;
 
  @OneToMany(()=>Post,(post)=> post.user)
  posts:Post[];



  
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


