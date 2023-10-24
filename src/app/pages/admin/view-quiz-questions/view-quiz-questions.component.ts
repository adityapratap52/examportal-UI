import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId = '';
  qTitle='';
  questions:any=[];

  constructor(
    private _route: ActivatedRoute,
    private _questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qId;
    this.qTitle = this._route.snapshot.params.qTitle;
    this._questionService.getQuestionsOfQuiz(this.qId).subscribe((data:any) => {
      this.questions = data;
    },
    (error) => {
      Swal.fire("Error", "Error occur during fetch the questions", "error");
    });
  }

}
