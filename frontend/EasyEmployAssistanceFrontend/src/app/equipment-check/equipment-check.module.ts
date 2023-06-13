import { SharedModule } from './../shared/shared.module';
import { EquipmentCheckRoutingModule } from './equipment-check-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentCheckComponent } from './equipment-check.component';
import { VoiceRecognitionModule } from '../voice-recognition/voice-recognition.module';



@NgModule({
  declarations: [EquipmentCheckComponent],
  imports: [
    CommonModule,
    EquipmentCheckRoutingModule,
    SharedModule,
    VoiceRecognitionModule
  ]
})
export class EquipmentCheckModule { }
