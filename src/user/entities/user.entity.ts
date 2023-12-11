import { Column, PrimaryColumn } from "typeorm";

export class User {
    @PrimaryColumn('uuid')
    id:string;
    
    @Column()
    email:string;

    @Column()
    password:string;


}
