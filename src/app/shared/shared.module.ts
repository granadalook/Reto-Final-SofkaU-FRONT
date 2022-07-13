import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toaster/toaster.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ToastComponent,
    ToasterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[HeaderComponent,FooterComponent,ToasterComponent]
})
export class SharedModule { }
