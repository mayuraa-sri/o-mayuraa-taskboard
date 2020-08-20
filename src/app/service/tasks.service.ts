import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, map, share, switchMap, tap} from 'rxjs/operators';
import {Task} from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  /**
   * behaviorsubject which is private ang has empty array
   * @private
   */
  private taskListSub$$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  /**
   * observable to access behaviorSub from outside
   */
  public taskList$ = this.taskListSub$$.asObservable();
  /**
   *
   * @param http client to do http requests
   */
  constructor(private http: HttpClient) {
    this.getTasksList().subscribe();
  }

  /**
   * returns an Observable of type array of any -> contains tasks
   */
  getTasksList(): Observable<any> {
    return this.http.get<Task[]>('http://localhost:3000/tasks').pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      }),
      tap(taskList => {
        this.taskListSub$$.next(taskList);
      })
    );
  }


  /**
   * create a task
   * @param task -> task object
   */
  createTask(task: Task): Observable<any> {
    return this.http.post('http://localhost:3000/tasks', task).pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      }),
      switchMap(taskList => this.getTasksList())
    );
  }

  /**
   * deletes task and returns message Task deleted
   * @param guid string
   */
  deleteTask(guid: string): Observable<string> {
    return this.http.delete('http://localhost:3000/tasks/' + guid).pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      }),
      switchMap(taskList => this.getTasksList())
    );
  }
}
