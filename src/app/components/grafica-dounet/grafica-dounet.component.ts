import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafica-dounet',
  templateUrl: './grafica-dounet.component.html',
  styles: []
})
export class GraficaDounetComponent implements OnInit {


  @Input() ChartLabels: Label[];
  @Input() ChartData: MultiDataSet[];
  @Input() ChartType: ChartType;

  constructor() { }

  ngOnInit() {
  }

}
