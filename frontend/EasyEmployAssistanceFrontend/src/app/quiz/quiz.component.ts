import { TelegramService } from './../services/telegram/telegram.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  @ViewChild('video') videoElementRef: ElementRef;

  videoElement: HTMLVideoElement;
  recordVideoElement: HTMLVideoElement;
  mediaRecorder: any;
  recordedBlobs: Blob[];
  isRecording: boolean = false;
  downloadUrl: string;
  stream: MediaStream;
  answer: string;

  constructor(private router: Router, public quizService: QuizService, public telegramService: TelegramService) { }

  async ngOnInit() {
    if(!this.quizService.selectedTest) {
      this.router.navigate(['/tasks']);
      return;
    }
    let selectedTest = this.quizService.selectedTest;
    let date = new Date();
    let messageTemplate = `You started test ${selectedTest.name} at ${date.toLocaleString()}`;
    this.telegramService.sendMessage(messageTemplate).subscribe();
    
    if (parseInt(localStorage.getItem('seconds')) > 0) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress') ?? '0');
      if (this.quizService.qnProgress == 10)
        this.router.navigate(['/result']);
      else
        this.startTimer();
    }
    else {
      this.quizService.seconds = 0;
      this.quizService.qnProgress = 0;
      this.startTimer();
    }

    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 130,
          height: 100
        },
        audio: true,
      })
      .then((stream) => {
        this.videoElement = this.videoElementRef.nativeElement;

        this.stream = stream;
        this.videoElement.srcObject = this.stream;
        this.startRecording();
      });
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  moveNext() {
    if (!this.answer) return;

    this.quizService.selectedTest.questions[this.quizService.qnProgress].answer = this.answer;

    if (this.quizService.qnProgress == this.quizService.selectedTest.questions.length - 1) {
      clearInterval(this.quizService.timer);
      this.quizService.submitScore();
      this.stopRecording();

      this.stream?.getTracks().forEach((track) => track.stop());
      this.stream = undefined;
      this.videoElement.pause();
      this.videoElement.srcObject = null;

      setTimeout(h => this.router.navigate(['/tasks/result']), 2000);
    } else {
      this.quizService.qnProgress++;
      this.answer = '';
    }
  }

  moveBack() {
    this.quizService.qnProgress--;
    this.answer = '';
  }

  startRecording() {
    this.recordedBlobs = [];
    let options: any = { mimeType: 'video/webm' };

    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options);
    } catch (err) {
      console.log(err);
    }

    this.mediaRecorder.start(); // collect 100ms of data
    this.isRecording = !this.isRecording;
    this.onDataAvailableEvent();
    this.onStopRecordingEvent();
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording = !this.isRecording;
    console.log('Recorded Blobs: ', this.recordedBlobs);
  }

  playRecording() {
    if (!this.recordedBlobs || !this.recordedBlobs.length) {
      console.log('cannot play.');
      return;
    }
    this.recordVideoElement.play();
  }

  onDataAvailableEvent() {
    try {
      this.mediaRecorder.ondataavailable = (event: any) => {
        if (event.data && event.data.size > 0) {
          this.recordedBlobs.push(event.data);
        }
      };
    } catch (error) {
      console.log(error);
    }
  }

  onStopRecordingEvent() {
    try {
      this.mediaRecorder.onstop = (event: Event) => {
        const videoBuffer = new Blob(this.recordedBlobs, {
          type: 'video/webm',
        });
        this.downloadUrl = window.URL.createObjectURL(videoBuffer); // you can download with <a> tag
        this.quizService.videoUrl = this.downloadUrl;
      };
    } catch (error) {
      console.log(error);
    }
  }

  onTextChanged(text: string) {
    this.answer = text;
  }

  ngOnDestroy(): void {
    localStorage.setItem('seconds', '0');
  }
}
