import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TaskBoardModule} from './task-board/task-board.module';
import {HttpClientModule} from '@angular/common/http';
// import { DragAndDropDirective } from './directive/drag-and-drop.directive';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TaskBoardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
