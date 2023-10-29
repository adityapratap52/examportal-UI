import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  qId:any;
  questions:any;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  constructor(
    private locationStat: LocationStrategy,
    private _route: ActivatedRoute,
    private _quesService: QuestionService
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this._route.snapshot.params.qId;
    this.loadQuestions();
  }
  loadQuestions() {
    this._quesService.getQuestionsOfQuizForUser(this.qId).subscribe((data:any) =>{
      this.questions = data;
      this.questions.forEach((q:any) => {
        q['givenAnswer'] = ''
      });
      console.log(this.questions)
    },
    (error) => {
      Swal.fire('Error', 'Error in loading questions of quiz');
    });
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStat.onPopState(()=>{
      history.pushState(null, '', location.href);
    })
  }
}
