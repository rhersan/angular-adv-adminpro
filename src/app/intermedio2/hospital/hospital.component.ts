import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent {

  constructor() {
    const observable = new Observable(function subscribe(subscriber)
    { 
      subscriber.next("One"); 
      subscriber.next("Two"); 
      subscriber.complete(); 
    });
  
    console.log("Three")
    
    observable.subscribe(x => console.log(x), (e) => console.log(e), () => console.log("Four")); console.log('Five');
    
  }

}
