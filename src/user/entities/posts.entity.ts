import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Comments } from "./comments.entity";

@Entity({name:'user_posts'})

export class Post {
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;
    
    @ManyToOne(()=>User,(user) => user.post,{onDelete:'SET NULL'})
    @JoinColumn()
    user:User;

    @ManyToMany(()=>Comments,(comment)=>comment.post)
    @JoinTable()
    comment:Comments[];
}  

