import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private _questionService: QuestionService,
    private _snack: MatSnackBar
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

  public deleteQuestion(quesId:any) {
    Swal.fire({
      icon:"question",
      title:"Do you want to delete this question ?",
      confirmButtonText:"Delete",
      showCancelButton:true
    }).then((result) => {
      if(result.isConfirmed) {
        this._questionService.deleteQuestion(quesId).subscribe((data:any) => {
          this._snack.open("Question deleted successfully","close", {
            duration:3000
          });
          this.questions = this.questions.filter((question:any) => question.id != quesId);
        },
        (error) => {
          Swal.fire("Error","Error occured during question deletion","error");
        });
      }
    });
  }
}
