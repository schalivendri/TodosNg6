import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private _todoApiUrl = 'http://localhost:3000/api/todo/';

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<any>(this._todoApiUrl)
  }

  saveTodo(todo) {
    return this.http.post<any>(this._todoApiUrl, todo)
  }

  updateTodo(todo) {
    return this.http.put<any>(this._todoApiUrl, todo);
  }

  deleteTodo(todo) {
    return this.http.delete<any>(this._todoApiUrl + todo._id);
  }
}
