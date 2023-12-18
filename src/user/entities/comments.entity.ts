import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Post } from "./posts.entity";

@Entity()

export class Comments {
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;

    @Column()
    comment:string;

    @ManyToMany(()=>Post,(post)=>post.comment)
    post:Post[];

}