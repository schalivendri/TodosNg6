import { Component, OnInit } from '@angular/core'
import * as _ from "lodash"
import { TodosService } from './todos.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  public todos: Array<todo> = []
  public isTodosEdit: boolean
  public addTodoLabel: string
  public editTodoLabel: string

  constructor(private todosService: TodosService, private _router: Router) {
    this.getTodos()
    this.addTodoLabel = ''
    this.editTodoLabel = ''
  }

  ngOnInit() {
  }

  onCheckTodo = function (todo: todo) {
    console.log('Todo Check: ', todo.label)
  }

  onEditTodo = function (todo: todo) {
    console.log('Todo Edit: ', todo.label)
    this.resetTodoActions()
    todo.isTodoEdit = true
    this.editTodoLabel = todo.label
    this.currentTodo = todo
  }

  onDeleteTodo = function (todo: todo) {
    this.resetTodoActions()
    todo.showConfirmDelete = true
  }

  onConfirmDeleteTodo = function (todo: todo) {
    this.todosService.deleteTodo(todo)
      .subscribe(
        res => {
          console.log('Deleted Todo: ', res)
          this.getTodos()
        },
        err => console.log('Error Deleting Todo: ', err)
      )
    this.showConfirmDelete = false
    this.addTodoLabel = ''
  }

  onCancelTodo = function (todo: todo) {
    todo.isTodoEdit ? this.onCancelEditTodo(todo) : this.onCancelDeleteTodo(todo)
  }

  onCancelDeleteTodo = function (todo: todo) {
    todo.showConfirmDelete = false
  }

  onCancelEditTodo = function (todo: todo) {
    todo.isTodoEdit = false
  }
  getTodos = function () {
    this.isLoading = true;
    let _todos = this.todosService.getTodos()
      .subscribe(
        res => {
          this.todos = res
          this.isLoading = false
        },
        err => {
          console.log('Error Fetching Todos: ', err)
          this.isLoading = false
          if(err instanceof HttpErrorResponse) {
            if(err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        })
    console.log('this.todos: ', this.todos)

  }

  addTodo = function () {
    this.isTodosEdit = false
    if (this.addTodoLabel.length) {
      var todo = {
        label: this.addTodoLabel,
        due: '99/99/9999'
      }
      this.todosService.saveTodo(todo)
        .subscribe(
          res => {
            console.log('Saved Todo: ', res)
            this.getTodos()
          },
          err => console.log('Error Saving Todo: ', err)
        )
      this.addTodoLabel = ''
    }
  }

  editTodo = function (editTodo, editTodoLabel) {
    this.isTodosEdit = false
    editTodo.label = editTodoLabel;
    this.todosService.updateTodo(editTodo)
      .subscribe(
        res => {
          console.log('Updated Todo: ', res)
          this.getTodos()
          editTodo.isTodoEdit = false
        },
        err => console.log('Error Updating Todo: ', err)
      )
    this.addTodoLabel = ''
  }

  resetTodoActions = function() {
    _.map(this.todos, function (todo) {
      todo.showConfirmDelete = false
      todo.isTodoEdit = false
    })
  }

}

interface todo {
  label: string,
  due: string,
  _id: string,
  isTodoEdit: boolean,
  showConfirmDelete: boolean
}