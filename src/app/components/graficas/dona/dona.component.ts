import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html'
})
export class DonaComponent {
  @Input() title: string = 'Sin Titulo';
  
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Label1', 'Label2','Label3'],
    datasets: [
      {
        data: [10, 10, 10],
        backgroundColor: ['#FFEA20', '#13005A', '#03C988']
      },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';


  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
