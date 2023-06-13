import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  tests = [
    {
      name: 'Entry in C#',
      level: 'Entry',
      eta: 20,
      category: 'C#',
      questions: [
        {
          name: 'What is the <span> tag in html ?',
          answer: '',
          correctAnswer: 'The <span> HTML element is a generic inline container for phrasing content',
          result: 0
        },
        {
          name: 'Name four OOP principles.',
          answer: '',
          correctAnswer: 'encapsulation, abstraction, inheritance, polymorphism',
          result: 0
        }
      ]
    }
  ];

  selectedTest;
  seconds: number = 0;
  timer;
  qnProgress: number = 0;
  correctAnswerCount: number = 0;
  videoUrl: any;

  constructor(private http: HttpClient) { }
  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getQuestions() {
    return this.selectedTest.questions;
  }

  submitScore() {
    this.selectedTest.questions.map(qn => {
      let match = this.similarity(qn.correctAnswer, qn.answer);
      qn.result = match;
      return qn;
    })
  }

  similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }
}
