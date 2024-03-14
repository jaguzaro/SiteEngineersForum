import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Posts'})
export class PostEntity {
    @PrimaryGeneratedColumn()
    idPost: number;

    @Column()
    textPost: string;

    @Column()
    license_user: string;

    @Column()
    teacher: string;

    @Column()
    nameCourse: string;

    @Column()
    idCourse: string;
    
    @Column()
    datePost: string;
}
