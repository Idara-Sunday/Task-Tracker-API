import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users_profile'})
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
}