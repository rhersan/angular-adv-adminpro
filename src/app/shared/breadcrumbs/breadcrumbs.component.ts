import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { map, filter, Subscription } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy  {

  public titulo!: string;

  public tituloSub$!: Subscription;

  constructor(private router: Router) {
    this.tituloSub$ = this.getArgumentosRuta()
                      .subscribe(({titulo})=> {
                          this.titulo = titulo;
                          document.title =`AdminPro - ${titulo}`;
                        });
  }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

  getArgumentosRuta(){
    
    return this.router.events
    .pipe(
      filter<any>( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event:ActivationEnd) => event.snapshot.data)
    );
  }


}


