import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommentService } from '../../services/comment.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [MenuComponent, CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit{
    courses = [
        {
            "code": "0777",
            "name": "Compiladores 1"
        },
        {
            "code": "0964",
            "name": "Organizacion computacional"
        },
        {
            "code": "0772",
            "name": "Estructura de datos"
        },
        {
            "code": "0777",
            "name": "IPC1"
        },
        {
            "code": "0777",
            "name": "IPC1"
        }
    ]
    modelCourseCode: string = ''
    modelTeacher: string = ''
    modelText: string = ''
    modelComment: string = ''
    currentDate: Date = new Date();
    allPosts: any[] = [];
    allUsers: any[] = [];
    allComments: any[] = [];
    inputValues: string[] = [];

    constructor(private postService: PostService, private userService: UserService, private commentService: CommentService){

    }

    async ngOnInit() {
        await this.getAllUsers();
        await this.getPosts()
    }

    async createPost(){
        const body = {
            "idCourse": this.modelCourseCode,
            "teacher": this.modelTeacher,
            "textPost": this.modelText,
            "license_user": sessionStorage.getItem('session'),
            "datePost": this.currentDate.toLocaleDateString(),
            "nameCourse": this.courses.find(c => c.code == this.modelCourseCode)?.name
        }

        const res = await this.postService.insertPost(body);
        if(res?.statusCode == 200){
            console.log('Success')
        }else{
            alert('Error creating post')
        }
    }

    async getPosts(){
        const res = await this.postService.getPosts();
        if(res?.statusCode == 200){
            this.allPosts = res?.data.map((data: any)=>{
                const user = this.allUsers.find((u: any)=> u.license === data.license_user);
                return {... data, name: user ? user.name : '', lastname: user ? user.lastname : ''}
            });
            this.allPosts = this.allPosts.map((data: any)=>{
                return {... data, opened: false}
            })

            this.inputValues = this.allPosts.map(()=> '');
            for (const post of this.allPosts) {
                await this.getComments(post.idPost);
                post.comments = this.allComments;
            }
            console.log(this.allPosts)
        }else{
            alert('Error getting posts')
        }
    }

    async getAllUsers(){
        const res = await this.userService.getUsers();
        if(res?.statusCode == 200){
            this.allUsers = res?.data;
            console.log('Success')
        }else{
            alert('Error getting posts')
        }
    }

    setOpened(post: any){
        this.allPosts = this.allPosts.map((data: any)=>{
            if(data.idPost === post.idPost){
                return {... data, opened: !data.opened}
            }
            return data;
        })
    }

    async insertComment(item: any){
        const body = {
            "idPost": item.idPost,
            "textComment": this.inputValues[item.idPost - 1],
            "license_user": sessionStorage.getItem('session'),
        }

        const res = await this.commentService.insertComment(body);
        if(res?.statusCode == 200){
            console.log('Success')
        }else{
            alert('Error creating post')
        }
    }

    onInputChange(event: Event, index: number): void {
        const target = event.target as HTMLInputElement;
        const newValue = target.value;
        this.inputValues[index] = newValue;
    }

    async getComments(idPost: number){
        const body = {
            "idPost": idPost
        }
        const res = await this.commentService.getComments(body);
        if(res?.statusCode == 200){
            if(res?.data.length == 0){
                this.allComments = [];
            }else{
                this.allComments = res?.data;
            }
        }else{
            alert('Error getting posts')
        }
    }

}
