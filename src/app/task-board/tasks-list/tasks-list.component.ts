import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {TasksService} from '../../service/tasks.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Task} from '../../model/task';

@Component({
  selector: 'tb-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Input() updateView: any;
  @Input() typeOfList: string;
  listTitle: string;
  tasksToDoList$: Observable<Task[]>;
  tasksList$: Observable<Task[]>;

  constructor(public tasksService: TasksService) { }

  ngOnInit(): void {
    if (this.typeOfList === 'todo') {
      this.listTitle = 'ToDo';
      this.tasksList$ = this.filterToDo();
    }

    if (this.typeOfList === 'inProgress') {
      this.listTitle = 'Doing';
      this.tasksList$ = this.filterInProgress();
    }

    if (this.typeOfList === 'completed') {
      this.listTitle = 'Done';
      this.tasksList$ = this.filterCompleted();
    }
  }

  filterToDo(): Observable<Task[]> {
    return this.tasksService.taskList$.pipe(
      map(tasks => tasks.filter(task => (task.isInProgress === false && task.isComplete === false)))
    );
  }

  filterInProgress(): Observable<Task[]> {
    return this.tasksService.taskList$.pipe(
      map(tasks => tasks.filter(task => (task.isInProgress === true && task.isComplete === false)))
    );
  }

  filterCompleted(): Observable<Task[]> {
    return this.tasksService.taskList$.pipe(
      map(tasks => tasks.filter(task => task.isComplete === true))
    );
  }
}
