import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzUploadModule } from 'ng-zorro-antd/upload';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';


@NgModule({
  imports: [WelcomeRoutingModule, NzUploadModule, NzButtonModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
