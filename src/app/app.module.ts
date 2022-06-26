import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './MAIN/app.component';
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [AppComponent],

  imports: [BrowserModule, AppRoutingModule, SharedModule, FormsModule, ReactiveFormsModule, HttpClientModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
