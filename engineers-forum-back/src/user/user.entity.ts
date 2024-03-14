import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    license: string;

    @Column()
    password: string;
}
