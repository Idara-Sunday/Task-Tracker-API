import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number; 

    @Column()
    firstName: string;
  
    @Column()
    lastName: string;

    @Column() 
    age:number;

    @Column()
    DOB:string;

    // @OneToOne(()=>User)
    // user:User
    // joincolum
}