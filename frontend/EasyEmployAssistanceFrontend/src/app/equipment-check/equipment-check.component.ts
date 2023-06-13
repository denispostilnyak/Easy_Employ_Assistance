import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
declare function startVoiceRecorder(): void;

@Component({
  selector: 'app-equipment-check',
  templateUrl: './equipment-check.component.html',
  styleUrls: ['./equipment-check.component.scss']
})
export class EquipmentCheckComponent implements OnInit {
  showWebcam = false;
  trigger: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    startVoiceRecorder();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
