import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teachers-dashboard',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './teachers-dashboard.html',
  styleUrl: './teachers-dashboard.scss'
})
export class TeachersDashboard {
  teachers: any = [];
  selectedTeacher: any = null;
  id: any = '';
  isEdit: boolean = false;
  constructor(
    private apiService: Api,  
    private fb: FormBuilder,
  ) {
     this.selectedTeacher = this.fb.group({ 
      name: ['',Validators.required],
      subject: ['',Validators.required],
      designation: ['',Validators.required],
      image: ['',Validators.required],
       bio: ['',Validators.required],
      
    });
    }
  ngOnInit() {
    this.onLoad();
  }
  
  onLoad() {
    this.apiService.getTeachers().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          this.teachers = response.data;
          console.log(this.teachers);
        }
      },
      error(error: any) {
        console.error(Error);
      },
    });
  }
  onSubmit(){
    if(this.isEdit){
       this.apiService.updateTeacher(this.id, this.selectedTeacher.value).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert(response.message);
          this.onLoad();
          this.selectedTeacher.reset();
        }
      },
      error(error: any) {
        console.error(Error);
      },
    });
    } else {
      this.apiService.addTeacher(this.selectedTeacher.value).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert(response.message);
          this.onLoad();
          this.selectedTeacher.reset();
        }
      },
      error(error: any) {
        console.error(Error);
      },
    });
   }
  }
  edit(teacher: any){
    this.isEdit = true;
    this.selectedTeacher.patchValue({
      name: teacher.name,
      subject: teacher.subject,
      designation: teacher.designation,
      image: teacher.image,
      bio: teacher.bio
    });
    this.id = teacher._id;
  }
  
  delete(teacher: any) {
    this.apiService.deleteTeacher(teacher._id).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert(response.message);
          this.onLoad();
        }
      },
      error(error: any) {
        console.error(Error);
      },
    });
  }
}
