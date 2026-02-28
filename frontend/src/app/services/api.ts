import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Api {
   constructor (private http: HttpClient){}
   getNotices(){
    return this.http.get(`${environment.apiUrl}/notice`);
   }
   getEvents(){
    return this.http.get(`${environment.apiUrl}/event`);
    }
   getContacts(){
    return this.http.get(`${environment.apiUrl}/contact`);
    }
   deleteContact(id: string){
    return this.http.delete(`${environment.apiUrl}/contact/${id}`);
    }
   deleteGallery(id: string){
    return this.http.delete(`${environment.apiUrl}/gallery/${id}`);
    }
   deleteEvent(id: string){
    return this.http.delete(`${environment.apiUrl}/event/${id}`);
    }
   deleteNotice(id: string){
    return this.http.delete(`${environment.apiUrl}/notice/${id}`);
    }
   deleteTeacher(id: string){
    return this.http.delete(`${environment.apiUrl}/teacher/${id}`);
    }
   getGallery(){
    return this.http.get(`${environment.apiUrl}/gallery`);
    }
   getTeachers(){
    return this.http.get(`${environment.apiUrl}/teacher`);
    }
   submitForm(formData: any){
    return this.http.post(`${environment.apiUrl}/contact`, formData);
   }
   addGallery(formData: any){
    return this.http.post(`${environment.apiUrl}/gallery`, formData);
   }
   addEvent(formData: any){
    return this.http.post(`${environment.apiUrl}/event`, formData);
   }
   addNotice(formData: any){
    return this.http.post(`${environment.apiUrl}/notice`, formData);
   }
   addTeacher(formData: any){
    return this.http.post(`${environment.apiUrl}/teacher`, formData);
   }
   updateGallery(id: string, formData: any){
    return this.http.put(`${environment.apiUrl}/gallery/${id}`, formData);
   }
   updateEvent(id: string, formData: any){
    return this.http.put(`${environment.apiUrl}/event/${id}`, formData);
   }
   updateNotice(id: string, formData: any){
    return this.http.put(`${environment.apiUrl}/notice/${id}`, formData);
   }
   updateTeacher(id: string, formData: any){
    return this.http.put(`${environment.apiUrl}/teacher/${id}`, formData);
   }
}
