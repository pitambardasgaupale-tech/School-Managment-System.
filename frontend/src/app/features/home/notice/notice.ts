import { Component } from '@angular/core';
import { Api } from '../../../services/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notice',
  imports: [RouterModule],
  templateUrl: './notice.html',
  styleUrl: './notice.scss'
})
export class Notice {
   notices ='';
   constructor(private apiService: Api){}
   ngOnInit(){
    this.getNotices();
   }
     getNotices(){
      this.apiService.getNotices().subscribe({
        next:(response: any) =>{
          if(response && response['status'] === 'Y'){
             let noticeArray: any = [];
             response.data.map((obj: any) => {
              noticeArray.push(obj.title);
             });
             this.notices = noticeArray.join(', ');
             console.log(this.notices);
          }
        },
        error(error: any){
          console.error(Error);
        },
        
        
     });
     }
}
