import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz/quiz.service';
import { TelegramService } from '../services/telegram/telegram.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, AfterViewInit {
  @ViewChild('recordedVideo') recordVideoElementRef: ElementRef;

  generalResult: number;
  passedCount: number;
  recordVideoElement: HTMLVideoElement;

  constructor(public quizService: QuizService, public telegramService: TelegramService, private router: Router) { }

  ngAfterViewInit(): void {
    this.recordVideoElement = this.recordVideoElementRef.nativeElement;
    this.recordVideoElement.src = this.quizService.videoUrl;
  }

  ngOnInit() {
    if(!this.quizService.selectedTest) {
      this.router.navigate(['/tasks']);
      return;
    }

    if (parseInt(localStorage.getItem('qnProgress')) == 2) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.selectedTest.questions = JSON.parse(localStorage.getItem('qns'));   
    }

    var sum = 0;
    this.quizService.selectedTest.questions.forEach(qn => sum += qn.result);
    var count = this.quizService.selectedTest.questions.length;
    this.generalResult = sum / count

    this.passedCount = this.quizService.selectedTest.questions.filter(qn => qn.result > 0.7).length;

    let selectedTest = this.quizService.selectedTest;
    let date = new Date();
    let formattedResult = (this.generalResult * 100).toFixed();
    let messageTemplate = `You finished test ${selectedTest.name} at ${date.toLocaleString()}\nYour result is ${formattedResult}. You passed ${this.passedCount} tests`;
    this.telegramService.sendMessage(messageTemplate).subscribe();
  }

  OnSubmit() {
    localStorage.setItem('qnProgress', "0");
    localStorage.setItem('qns', "");
    localStorage.setItem('seconds', "0");
    this.router.navigate(['/tasks']);
  }

  restart() {
    localStorage.setItem('qnProgress', "0");
    localStorage.setItem('qns', "");
    localStorage.setItem('seconds', "0");
    this.router.navigate(['/quiz']);
  }
}
