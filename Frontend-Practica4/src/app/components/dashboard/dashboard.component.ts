import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

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
    currentDate: Date = new Date();
    allPosts: any[] = [];
    allUsers: any[] = [];


    constructor(private postService: PostService, private userService: UserService){

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
            console.log('Success')
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


}
