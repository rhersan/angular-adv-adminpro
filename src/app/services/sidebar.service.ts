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

  public menu!:IMenuItem;

  getMenu(){
    return this.menu =JSON.parse(localStorage.getItem('menu')!) || [];
  }

}
