import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../services/task/task.service';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';

@Component({
  selector: 'manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent {

  tasks: any[];

  todo: any[];

  inprogress: any[];

  done: any[];

  constructor(public dialog: MatDialog, private taskService: TaskService) {
    this.getTasks();
    this.taskService.taskUpdated$.subscribe(() => {
      this.getTasks();
    });
  }

  getTasks() {
    this.tasks = this.taskService.getTasks();
    this.todo = this.tasks?.filter(t => t.status === 'todo');
    this.inprogress = this.tasks?.filter(t => t.status === 'inprogress');
    this.done = this.tasks?.filter(t => t.status === 'done');
  }

  addTask() {
    this.dialog.open(TaskDialogComponent, {
      width: '60%',
      height: '90%',
      data: { title: 'Add task', task: {} }
    });
  }
}
