import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  private linkTheme = document.querySelector('#theme')!;
  constructor() {
    const urlTheme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', urlTheme);
  }



  changeTheme(theme: string) {
    const urlTheme = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', urlTheme);

    localStorage.setItem('theme', urlTheme);
    this.chekCurrentThem();
  }

  
  chekCurrentThem() {
    const links= document.querySelectorAll('.selector');
    links.forEach(element => {

      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if (currentTheme === btnThemUrl) {
        element.classList.add('working');
      }

    });

  }



}
