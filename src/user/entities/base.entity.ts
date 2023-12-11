import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Base{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @CreateDateColumn()
    created_At:Date;

    @UpdateDateColumn()
    updated_At:Date;
}