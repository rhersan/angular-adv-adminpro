import { Injectable } from '@angular/core';


interface IMenuItem{
  title: string,
  icon: string,
  submenu: ISubmenuItem[]
}
interface ISubmenuItem{
  url: string,
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { 
    console.log(this.menu);
  }

  menu: IMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu:[
        { title: 'Main', url: '/dashboard'},
        { title: 'ProgresBar', url: 'progress'},
        { title: 'Gráficas', url: 'grafica1'},
        { title: 'Promesas', url: 'promesas'},
      ]
    },
  ];


}
