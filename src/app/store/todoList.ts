import { StateModule } from "ngx-redux";

export interface TodoItem {
  id?: number;
  title: string;
  completed: boolean;
}
export interface TodoListState {
  data: {
    [key: number]: TodoItem;
  },
  source: TodoItem[];
  sort: number[];
  viewType: ViewType;
}

export type ViewType = 1 | 2 | 3;

export interface TodoActions {
  addTodoItem(item: TodoItem): void;
  addTodoItemSucess(id: number): void;
  completed(id: number): void;
  filter(viewType: ViewType): void;
}

export const TodoListStateModule: StateModule<TodoListState, TodoActions> = {
  name: 'todo-list',
  state: {
    source: [],
    data: {
    },
    sort: [],
    viewType: 1
  },
  actions: {
    addTodoItem(item: TodoItem) {
      const [maxId = 0] = this.sort.sort((a, b) => b - a);
      item.id = maxId + 1;
      if (this.viewType !== 2) {
        this.data[item.id] = item;
      }
      this.source.push(item);
    },
    addTodoItemSucess(id: number) {
      this.sort = [...this.sort, id];
    },
    completed(id: number) {
      const item = this.data[id];
      item.completed = true;
    },
    filter(viewType: ViewType) {
      this.viewType = viewType;
      if (viewType === 1) {
        this.data = filter(this.source, () => true);
      } else if (viewType === 2) {
        // completed = true
        this.data = filter(this.source, (item) => item.completed);
      } else {
        // completed = false
        this.data = filter(this.source, (item) => !item.completed);
      }
    }
  },
  effects: {
    addTodoItem(item: TodoItem) {
      this.addTodoItemSucess(item.id!);
      // this.÷
    }
  },
  effectsDep: []
}

// userModule.actions

const filter = (source: TodoItem[], fn: (item: TodoItem) => boolean) => {
  return source.reduce((prev, curr) => {
    if (fn(curr)) {
      prev[curr.id!] = curr;
    }
    return prev;
  }, {} as { [key: number]: TodoItem })
}
