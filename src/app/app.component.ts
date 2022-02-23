import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from './store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isCollapsed = false;

  username!: Observable<string>;
  constructor(public store: Store) {
    this.username = this.store.select(s => s.user?.username);


  }
}
