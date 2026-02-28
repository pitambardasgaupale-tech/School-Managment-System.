import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './events-dashboard.html',
  styleUrl: './events-dashboard.scss'
})
export class EventsDashboard {
  events: any = [];
  selectedEvent: any = null;
  id: any = '';
  isEdit: boolean = false;
  constructor(
    private apiService: Api,  
    private fb: FormBuilder
  ) {
     this.selectedEvent = this.fb.group({ 
      title: ['',Validators.required],
      date: ['',Validators.required],
      location: ['',Validators.required],
      description: ['',Validators.required],
      shortDescription: ['',Validators.required]
    });
    }
  ngOnInit() {
    this.onLoad();
  }
  
  onLoad() {
    this.apiService.getEvents().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          this.events = response.data;
          console.log(this.events);
        }
      },
      error(error: any) {
        console.error(Error);
      },
    });
  }
  onSubmit(){
    if(this.isEdit){
       this.apiService.updateEvent(this.id, this.selectedEvent.value).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert(response.message);
          this.onLoad();
          this.selectedEvent.reset();
        }
      },
      error(error: any) {
        console.error(Error);
      },
    });
    } else {
      this.apiService.addEvent(this.selectedEvent.value).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert(response.message);
          this.onLoad();
          this.selectedEvent.reset();
        }
      },
      error(error: any) {
        console.error(Error);
      },
    });
  }
  }
  edit(event: any){
    this.isEdit = true;
    this.selectedEvent.patchValue({
      title: event.title,
      date: this.formatDateforInput(event.date),
      location: event.location,
      description: event.description,
      shortDescription: event.shortDescription
    });
    this.id = event._id;
  }
  formatDateforInput(date: any){
    const d = new Date(date);
    const year = d.getFullYear();
    const  month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  delete(event: any) {
    this.apiService.deleteEvent(event._id).subscribe({
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
