import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: any[] = [];

  private readonly taskUpdatedSubject = new ReplaySubject<boolean>(1);
  public readonly taskUpdated$ = this.taskUpdatedSubject.asObservable();

  constructor() { 
    let data = localStorage.getItem('tasks');
    if(data) {
      this.tasks = JSON.parse(data);
    }
  }

  getTasks() {
    return this.tasks;
  }

  addTask(task: any): void {
    task.id = this.tasks? this.tasks.length + 1 : 1;
    this.tasks.push(task);
    this.emitupdateTask();
  }

  updateTask(id: number, editedTask: any): void {
    this.tasks[id - 1] = editedTask;
    this.emitupdateTask();
  }

  emitupdateTask(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.taskUpdatedSubject.next(true);
  }
}
