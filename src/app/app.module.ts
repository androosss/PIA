import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GuestComponent } from './guest/guest.component';
import { BooksComponent } from './books/books.component';
import {GuestEventComponent} from './guest-event/guest-event.component'
import { BookComponent } from './book/book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatTableModule} from '@angular/material/table'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatStepperModule} from '@angular/material/stepper'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core'
import {HttpClientModule} from '@angular/common/http'
import {RecaptchaModule , RecaptchaFormsModule} from 'ng-recaptcha';
import { PasswordComponent } from './password/password.component';
import { GuestBookComponent } from './guest-book/guest-book.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfilComponent } from './profil/profil.component';
import { UserChangeComponent } from './user-change/user-change.component';
import {ChartsModule} from 'ng2-charts';
import { ProfiliComponent } from './profili/profili.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { BookAproveComponent } from './book-aprove/book-aprove.component';
import { AdminComponent } from './admin/admin.component'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GuestComponent,
    BooksComponent,
    BookComponent,
    PasswordComponent,
    GuestEventComponent,
    GuestBookComponent,
    ProfilComponent,
    UserChangeComponent,
    ProfiliComponent,
    BookCreateComponent,
    EventComponent,
    EventsComponent,
    EventCreateComponent,
    BookAproveComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatPaginatorModule,
    MatTableModule,
    NgbModule,
    MatExpansionModule,
    ChartsModule,
    MatProgressBarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
