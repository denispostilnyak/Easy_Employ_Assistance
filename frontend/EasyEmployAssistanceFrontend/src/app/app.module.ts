import { VoiceRecognitionModule } from './voice-recognition/voice-recognition.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from '@auth0/auth0-angular';
import { TaskModule } from './task/task.module';
import { EquipmentCheckModule } from './equipment-check/equipment-check.module';
import { QuizModule } from './quiz/quiz.module';
import { HttpClientModule } from '@angular/common/http';
import { ResultModule } from './result/result.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    NavBarModule,
    ProfileModule,
    AuthModule.forRoot({
      domain: environment.auth.domain,
      clientId: environment.auth.clientId
    }),
    TaskModule,
    EquipmentCheckModule,
    VoiceRecognitionModule,
    QuizModule,
    HttpClientModule,
    ResultModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
