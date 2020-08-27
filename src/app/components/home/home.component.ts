import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ids: Array<String> = ['Apie mane', 'Paslaugos', 'Kontaktai'];
  constructor(private aR: ActivatedRoute) { }

  ngOnInit(): void {
    this.aR.fragment.subscribe(param => {
      console.log(param)
      console.log(document.querySelector(`#${param}`))
    });
    
  }

  ngAfterViewInit(){
    this.aR.fragment.subscribe(param => {
      setTimeout(()=>{
        document.querySelector(`#${param}`).scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
      }, 500);
    });
  }

}
