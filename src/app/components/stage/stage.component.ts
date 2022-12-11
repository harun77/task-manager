import { Component, Input } from '@angular/core';

@Component({
  selector: 'stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss'],
  host: {
    '[style.--bgColor]': 'bgColor'
  }
})
export class StageComponent {

  @Input('bgColor') bgColor: string;

  @Input('title') title: string;

  @Input('tasks') tasks: any[];

  constructor() { }
}
