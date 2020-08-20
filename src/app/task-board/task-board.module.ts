import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TasksQuickAddComponent } from './tasks-quick-add/tasks-quick-add.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksCardComponent } from './tasks-card/tasks-card.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DragAndDropDirective} from '../directive/drag-and-drop.directive';



@NgModule({
  declarations: [TaskBoardComponent, TasksQuickAddComponent, TasksListComponent, TasksCardComponent, DragAndDropDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [TaskBoardComponent, TasksQuickAddComponent, TasksListComponent, TasksCardComponent]
})
export class TaskBoardModule { }
