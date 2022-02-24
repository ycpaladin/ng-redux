// import { UserActions } from './../../store/store_configs';
// import { UserState } from './../../../../projects/ngx-redux/src/lib/models';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UploadFilter, NzUploadFile } from 'ng-zorro-antd/upload';
import { NgxReduxStore } from 'ngx-redux';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserState, UserActions } from 'src/app/store/store_configs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  username: Observable<string|undefined>;
  isFetching$!: Observable<boolean>;
  update(): void {
    this.store.actions.updateUser('kkkk', 123);
  }

  constructor(private http: HttpClient, public store: NgxReduxStore<IUserState, UserActions>) {
    this.username = this.store.select(s => s.user?.username);
    this.isFetching$ = this.store.select(s => s.isFetching);
    // this.username.subscribe(v => {
    //   console.log('===>', v);
    // })
  }
  ngOnInit(): void {
  }


}
