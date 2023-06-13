import { VoiceRecognitionModule } from './../voice-recognition/voice-recognition.module';
import { QuizRoutingModule } from './quiz-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';



@NgModule({
  declarations: [QuizComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    VoiceRecognitionModule
  ]
})
export class QuizModule { }
