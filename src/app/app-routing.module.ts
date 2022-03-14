import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BookAproveComponent } from './book-aprove/book-aprove.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { GuestBookComponent } from './guest-book/guest-book.component';
import { GuestEventComponent } from './guest-event/guest-event.component';
import { GuestComponent } from './guest/guest.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { ProfilComponent } from './profil/profil.component';
import { ProfiliComponent } from './profili/profili.component';
import { RegisterComponent } from './register/register.component';
import { UserChangeComponent } from './user-change/user-change.component';


const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'book', component:BookComponent},
  {path:'books', component:BooksComponent},
  {path:'guest', component:GuestComponent},
  {path:'register', component:RegisterComponent},
  {path:'password', component:PasswordComponent},
  {path:'guestEvent',component:GuestEventComponent},
  {path:'guestBook',component:GuestBookComponent},
  {path:'userChange',component:UserChangeComponent},
  {path:'profil',component:ProfilComponent},
  {path:'profili',component:ProfiliComponent},
  {path:'bookCreate',component:BookCreateComponent},
  {path:'event',component:EventComponent},
  {path:'events',component:EventsComponent},
  {path:'eventCreate',component:EventCreateComponent},
  {path:'bookAprove',component:BookAproveComponent},
  {path:'admin',component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
