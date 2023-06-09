import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private tasksService: TaskService) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
  deleteTasks(task: Task): void {
    this.tasksService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.tasksService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task): void {
    this.tasksService.addTask(task).subscribe((task) => this.tasks.push(task));
  }
}
