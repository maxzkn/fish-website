import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ids: Array<String> = ['Apie-mane', 'Paslaugos', 'Kontaktai'];
  constructor(private aR: ActivatedRoute) { }

  ngOnInit(): void {
  }

  //inicijuoja po puslapio visu elementu uzkrovimo...
  ngAfterViewInit(){
   this.aR.fragment.subscribe(param => {
      setTimeout(()=>{
        if(param){
          document.querySelector(`#${param}`).scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
          });
        }
      }, 0);
    });
  }
}
