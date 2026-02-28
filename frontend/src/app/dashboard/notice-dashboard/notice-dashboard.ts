import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notice-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notice-dashboard.html',
  styleUrl: './notice-dashboard.scss'
})
export class NoticeDashboard {
  notices: any = [];
  selectedNotice: any = null;
  id: any = '';
  isEdit: boolean = false;
  constructor(
    private apiService: Api,  
    private fb: FormBuilder
  ) {
     this.selectedNotice = this.fb.group({ 
      title: ['',Validators.required],
      category: ['',Validators.required],
      description: ['',Validators.required],
      date: ['',Validators.required]
    });
    }
  ngOnInit() {
    this.onLoad();
  }
  
  onLoad() {
    this.apiService.getNotices().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          this.notices = response.data;
          console.log(this.notices);
        }
      },
      error(error: any) {
        console.error(Error);
      },
    });
  }
  onSubmit(){
    if(this.isEdit){
       this.apiService.updateNotice(this.id, this.selectedNotice.value).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert(response.message);
          this.onLoad();
          this.selectedNotice.reset();
        }
      },
      error(error: any) {
        console.error(Error);
      },
    });
    } else {
      this.apiService.addNotice(this.selectedNotice.value).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert(response.message);
          this.onLoad();
          this.selectedNotice.reset();
        }
      },
      error(error: any) {
        console.error(Error);
      },
    });
   }
  }
  edit(notice: any){
    this.isEdit = true;
    this.selectedNotice.patchValue({
      title: notice.title,
      category: notice.category,
      date: this.formatDateforInput(notice.date),
      description: notice.description,
    });
    this.id = notice._id;
  }
  formatDateforInput(date: any){
    const d = new Date(date);
    const year = d.getFullYear();
    const  month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  delete(notice: any) {
    this.apiService.deleteNotice(notice._id).subscribe({
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
