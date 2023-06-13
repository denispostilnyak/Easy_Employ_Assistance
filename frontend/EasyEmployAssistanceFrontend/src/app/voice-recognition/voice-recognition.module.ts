import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceRecognitionComponent } from './voice-recognition.component';
import { VoiceRecorderComponent } from './voice-recorder/voice-recorder.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [VoiceRecognitionComponent, VoiceRecorderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule
  ],
  exports: [VoiceRecognitionComponent, VoiceRecorderComponent]
})
export class VoiceRecognitionModule { }
