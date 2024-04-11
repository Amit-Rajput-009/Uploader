import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
// import {AngularFireAuthModule} from '@angular/fire/compat/auth'
// import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { getAuth, provideAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LocalStorageComponent } from './components/dashboard/local-storage/local-storage.component';
import { RequestsComponent } from './components/dashboard/requests/requests.component';
import { ThanksComponent } from './components/signup/thanks/thanks.component';
import { NotificationComponent } from './components/notification/notification.component';
import { LogsComponent } from './components/logs/logs.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { TreeViewComponent } from './components/UI/tree-view/tree-view.component';
import { MatIconModule } from '@angular/material/icon';
import { PopupModelComponent } from './components/UI/popup-model/popup-model.component';

import { StoreModule } from '@ngrx/store';
import { NodeReducer } from './Store/node.reducer';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    LocalStorageComponent,
    RequestsComponent,
    ThanksComponent,
    NotificationComponent,
    LogsComponent,
    ProfileComponent,
    ContactAdminComponent,
    TreeViewComponent,
    PopupModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterLink,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,MatIconModule,
    MatSelectModule,MatFormFieldModule, MatInputModule, FormsModule, StoreModule.forRoot({node: NodeReducer}),

    //firebase related imports
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => getFirestore()),
    // AngularFireAuthModule,
    // provideAuth(() => getAuth()),

  ],
  providers: [HttpClient, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
