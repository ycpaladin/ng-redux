import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IStoreService } from 'ngx-redux';
import { TodoItem, ViewType } from './../../store/todoList';
import { TodoListState, TodoActions, TodoListStateModule } from '../../store/todoList'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.less']
})
export class TodoListComponent implements OnInit {


  todoList$!: Observable<TodoItem[]>;

  statistics$!: Observable<string>;

  text = '';

  status = 1;

  onStatusChange(status: ViewType) {
    this.store.filter(status);
  }

  add(): void {
    if (!this.text) {
      return;
    }
    this.store.addTodoItem({
      title: this.text,
      completed: false,
    })
    this.text = '';
  }

  completed(id: number): void {
    this.store.completed(id)
  }

  constructor(@Inject(TodoListStateModule) public store: IStoreService<TodoListState, TodoActions>) {
    this.todoList$ = store.select(state => Object.values(state.data));
    this.statistics$ = store.select(state => `${Object.keys(state.data).length} of ${state.source.length}`)
  }

  ngOnInit(): void {
  }

}
