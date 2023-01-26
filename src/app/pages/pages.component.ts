import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare const customInitFunctions:any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements AfterViewInit{
      
  constructor(private setting: SettingsService) {
  }


  ngAfterViewInit(): void {
    customInitFunctions();
  }

  year = new Date().getFullYear();

}
