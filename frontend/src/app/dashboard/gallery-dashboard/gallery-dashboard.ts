import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-gallery-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gallery-dashboard.html',
  styleUrl: './gallery-dashboard.scss',
})
export class GalleryDashboard {
  galleries: any = [];
  selectedGallery: any = null;
  id: any = '';
  isEdit: boolean = false;
  constructor(
    private apiService: Api, 
    private sanitizer: DomSanitizer, 
    private fb: FormBuilder
  ) {
     this.selectedGallery = this.fb.group({ 
      title: ['',Validators.required],
      date: ['',Validators.required],
      imagesUrl: ['',Validators.required]
      });
    }
  ngOnInit() {
    this.onLoad();
  }
  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  onLoad() {
    this.apiService.getGallery().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          response.data.map((obj: any) => {
            obj['images'] = obj.imagesUrl.split(',');
          });
          this.galleries = response.data;
          console.log(this.galleries);
        }
      },
      error(error: any) {
        console.error(Error);
      },
    });
  }
  onSubmit(){
    if(this.isEdit){
       this.apiService.updateGallery(this.id, this.selectedGallery.value).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert(response.message);
          this.onLoad();
          this.selectedGallery.reset();
        }
      },
      error(error: any) {
        console.error(Error);
      },
    });
    } else {
      this.apiService.addGallery(this.selectedGallery.value).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert(response.message);
          this.onLoad();
          this.selectedGallery.reset();
        }
      },
      error(error: any) {
        console.error(Error);
      },
    });
  }
  }
  edit(gallery: any){
    this.isEdit = true;
    this.selectedGallery.patchValue({
      title: gallery.title,
      date: this.formatDateforInput(gallery.date),
      imagesUrl: gallery.imagesUrl
    });
    this.id = gallery._id;
  }
  formatDateforInput(date: any){
    const d = new Date(date);
    const year = d.getFullYear();
    const  month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
   delete(gallery: any) {
    this.apiService.deleteGallery(gallery._id).subscribe({
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
