import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Base{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;

    @CreateDateColumn()
    created_At:Date;

    @UpdateDateColumn()
    updated_At:Date;
} 