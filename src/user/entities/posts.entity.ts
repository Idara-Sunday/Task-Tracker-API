import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name:'user_posts'})

export class Post {
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;
    
    @ManyToOne(()=>User,(user) => user.posts)
    user:User;
}

