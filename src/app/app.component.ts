import { UserActions } from 'src/app/store/store_configs';
import { IUserState, userModule } from './store/store_configs';
import { Component, Inject } from '@angular/core';
import { IStoreService, NgxReduxStore } from 'ngx-redux';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isCollapsed = false;

  username!: Observable<string | undefined>;
  constructor(@Inject(userModule) public store: IStoreService<IUserState, UserActions>) {
    this.username = this.store.select(s => s.user?.username);
  }
}
