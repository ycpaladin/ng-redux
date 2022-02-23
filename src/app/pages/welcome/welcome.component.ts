import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UploadFilter, NzUploadFile } from 'ng-zorro-antd/upload';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from 'src/app/store/store';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {



  check$ = of(['application/vnd.ms-excel']); // 通过http获取白名单配置得到字符串数组

  check(file: File) {
    const fileReader = new FileReader();
    fileReader.onloadend = function (e: any) {
      // const arr = (new Uint8Array(e.target.result)).subarray(0, 4);
      // let header = "";
      // for (let i = 0; i < arr.length; i++) {
      //   header += arr[i].toString(16);
      // }
      // console.log(header);
      console.log(e, e.currentTarget.result);
    }
    fileReader.readAsDataURL(file);
    return true;
  }

  // 添加上传过滤器
  filter: UploadFilter[] = [
    {
      name: 'csv',
      fn: (fileList: NzUploadFile[]) => {
        return of(fileList).pipe(
          map(filels => {
            return filels.reduce<NzUploadFile[]>((prev, file) => {
              if (this.check(file as any)) {
              }
              return prev;
            }, [])
          })
        )
      },
    },
  ];

  // name: string;
  // fn(fileList: NzUploadFile[]): NzUploadFile[] | Observable<NzUploadFile[]>;

  previewFile = (file: NzUploadFile): Observable<string> => {
    console.log('Your upload file:', file);
    return this.http
      .post<{ thumbnail: string }>(
        `https://next.json-generator.com/api/json/get/4ytyBoLK8`,
        {
          method: 'POST',
          body: file,
        }
      )
      .pipe(map((res) => res.thumbnail));
  };


  username: Observable<string>;
  update(): void {
    // this.store.dispatch({ type: 'update_user' })
    this.store.dispatch({type: '[user] updateUser',  username: 'kkkk', age: 123})
  }

  constructor(private http: HttpClient, public store: Store) {
    this.username = this.store.select(s => s.user?.username);
    this.username.subscribe(v => {
      console.log('===>', v);
    })
  }
  ngOnInit(): void {
  }


}
