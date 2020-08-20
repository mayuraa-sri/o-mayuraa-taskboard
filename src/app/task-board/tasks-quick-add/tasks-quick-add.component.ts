import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {fromEvent} from 'rxjs';
import {exhaustMap, tap} from 'rxjs/operators';
import {TasksService} from '../../service/tasks.service';
import {Task} from '../../model/task';
import {Guid} from 'guid-typescript';

@Component({
  selector: 'tb-tasks-quick-add',
  templateUrl: './tasks-quick-add.component.html',
  styleUrls: ['./tasks-quick-add.component.scss']
})
export class TasksQuickAddComponent implements OnInit, AfterViewInit {
  formGroupQuickAdd: FormGroup;
  task: Task;
  @ViewChild('submitButton') submitButton: ElementRef;

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.formGroupQuickAdd = new FormGroup(
      {
        title: new FormControl('', Validators.required),
        text: new FormControl('', Validators.required),
      });
  }

  ngAfterViewInit(): void {
    fromEvent(this.submitButton.nativeElement, 'click').pipe(
      tap(_ => {
        this.task = {
          guid: Guid.create().toString(),
          isComplete: false,
          isFavorite: false,
          isInProgress: false,
          text: this.formGroupQuickAdd.get('text').value,
          title: this.formGroupQuickAdd.get('title').value
        };
      }),
      exhaustMap(x => this.taskService.createTask(this.task))
    ).subscribe(x => {
      this.task = undefined;
      this.formGroupQuickAdd.reset();
    });
  }

}
