import { Component } from '@angular/core';
import { NgxReduxStore } from 'ngx-redux';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isCollapsed = false;

  username!: Observable<string>;
  constructor(public store: NgxReduxStore<any>) {
    this.username = this.store.select(s => s.user?.username);


  }
}
