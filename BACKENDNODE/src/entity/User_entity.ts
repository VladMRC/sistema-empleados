import {Entity, 
    PrimaryGeneratedColumn, Column, 
    Unique, ManyToMany, 
    JoinTable} from "typeorm";
import {MinLength, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcrypt";

@Entity()
export class usuarios {

    constructor( name, email) {
        this.Nombre = name;
        this.Email = email;
        this.FechaCreacion = new Date();
    }

    @PrimaryGeneratedColumn()
    EmpleadoID: number;

    @Column()
    @MinLength(4)
    Nombre: string;

    @Column()
    @IsNotEmpty()
    Email: string;

    @Column()
    @IsNotEmpty()
    FechaCreacion: Date;
}
