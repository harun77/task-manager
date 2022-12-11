import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input('task') task: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  openTask(): void {
    this.dialog.open(TaskDialogComponent, {
      width: '60%',
      height: '90%',
      data: { title: 'Edit task', task: this.task }
    });
  }
}
