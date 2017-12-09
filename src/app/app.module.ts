import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {Routes, RouterModule} from '@angular/router';
import {QuestionsComponent} from './questions/questions.component';
import {FormsModule} from '@angular/forms'; // <-- NgModel lives here


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'questions', component: QuestionsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
