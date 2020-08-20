import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../model/task';
import {TasksService} from '../../service/tasks.service';

@Component({
  selector: 'tb-tasks-card',
  templateUrl: './tasks-card.component.html',
  styleUrls: ['./tasks-card.component.scss']
})
export class TasksCardComponent implements OnInit {

  @Input() task: Task;
  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
  }

  deleteTask(guid: string): void {
    this.tasksService.deleteTask(guid).subscribe(_ => {
      console.log('tt deleted');
      },
      error => {
        console.log(error);
      }
    );
  }

}
