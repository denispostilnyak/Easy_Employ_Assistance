import { Router } from '@angular/router';
import { QuizService } from './../services/quiz/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(public quizService: QuizService, private router: Router) { }

  categories: string[] = [
    'HTML',
    'CSS',
    'C#',
    'TypeScript',
    'JAVA'
  ];

  levels: string[] = [
    'Entry',
    'Beginer',
    'Medium',
    'Hard'
  ];

  tests: any[] = this.quizService.tests;
  filteredTests: any[] = this.tests;
  selectedTest: any;
  activeCategory: any;
  activeLevel: any;

  ngOnInit(): void {
  }

  onCategoryChange(data: any) {
    this.activeCategory = data.value;
    this.filterTests();
  }

  onLevelChange(data: any) {
    this.activeLevel = data.value;
    this.filterTests();
  }

  filterTests() {
    if(this.activeCategory) {
      this.filteredTests = this.tests.filter(test => test.category == this.activeCategory);
    } else {
      this.filteredTests = this.tests;
    }

    if(this.activeLevel) {
      this.filteredTests = this.filteredTests.filter(test => test.level == this.activeLevel);
    }
  }

  onSubmit() {
    this.quizService.selectedTest = this.selectedTest;
    this.router.navigate(['/tasks/check']);
  }
}
