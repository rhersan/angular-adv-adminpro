import { Component } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {


  public data1:ChartData<'doughnut'> = {
    labels: [
      'WhatsApp',
      'Messanger',
      'Telegram'
    ],
    datasets: [
      {
        data: [120, 90, 100],
        backgroundColor: ['#03C988', '#A31ACB', '#1C82AD']
      },
    ]
  };

  public data2:ChartData<'doughnut'> = {
    labels: [
      'Spotify',
      'Deezer.',
      'iTunes'
    ],
    datasets: [
      {
        data: [200, 70, 90],
        backgroundColor: ['#03C988', '#567189', '#EEEEEE']
      },
    ]
  };

  public data3:ChartData<'doughnut'> = {
    labels: [
      'Facebook',
      'Instagram',
      'Twitter'
    ],
    datasets: [
      {
        data: [400, 250, 100],
        backgroundColor: ['#00337C', '#FF78F0', '#39B5E0']
      },
    ]
  };

  public data4:ChartData<'doughnut'> = {
    labels: [
      'Mercado Libre',
      'Amazon',
      'Ali Express'
    ],
    datasets: [
      {
        data: [100, 100, 100],
        backgroundColor: ['#F5EA5A', '#86A3B8', '#CD0404']
      },
    ]
  };

}
