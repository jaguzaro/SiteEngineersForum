import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Comments'})
export class CommentsEntity {
    @PrimaryGeneratedColumn()
    idComment: number;

    @Column()
    textComment: string;

    @Column()
    idPost: number;

    @Column()
    license_user: string;
}