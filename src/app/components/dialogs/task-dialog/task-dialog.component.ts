import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../../services/task/task.service';

@Component({
  selector: 'task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  public formGroup: FormGroup;

  get title(): string {
    return this.data.title;
  }

  get task(): any {
    return this.data.task;
  }

  constructor(public fb: FormBuilder, private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm() {
    this.formGroup = this.fb.group({
      title: [this.task.title, [Validators.required, Validators.maxLength(100)]],
      description: [this.task.description, [Validators.required, Validators.maxLength(150)]],
      priority: [this.task.priority, [Validators.required]],
      startDate: [this.task.startDate, [Validators.required]],
      endDate: [this.task.endDate, [Validators.required]],
      status: [this.task.status, [Validators.required]],
      assignee: [this.task.assignee, [Validators.required]],
      // attachment: [this.task.attachment, [Validators.required]],
      // subTask: [this.task.subTask, [Validators.required]],
    });
  }

  save(): void {
    let task: { [key: string]: any } = {};

    task['title'] = this.formGroup.value.title;
    task['description'] = this.formGroup.value.description;
    task['priority'] = this.formGroup.value.priority;
    task['startDate'] = this.formGroup.value.startDate;
    task['endDate'] = this.formGroup.value.endDate;
    task['status'] = this.formGroup.value.status;
    task['assignee'] = this.formGroup.value.assignee;
    task['attachment'] = this.formGroup.value.attachment;
    task['subTask'] = this.formGroup.value.subTask;

    if (this.title === 'Edit task') {
      task['id'] = this.task.id;
      this.taskService.updateTask(this.task.id, task);
    } else {
      this.taskService.addTask(task);
    }
  }
}
