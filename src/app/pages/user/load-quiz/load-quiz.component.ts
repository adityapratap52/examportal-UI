import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizzes:any;

  constructor(
    private _route: ActivatedRoute,
    private _quizService: QuizService,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((param) => {
      this.catId = param.catId;
    if(this.catId == 0) {
      this._quizService.getActiveQuizzes().subscribe((data:any) => {
        this.quizzes = data;
      },
      (error) => {
        Swal.fire('Error', 'Error occur during fetch the data', 'error');
      });
    } else {
      this._quizService.getActiveQuizzesByCategoryId(this.catId).subscribe((data:any) => {
        this.quizzes = data;
      },
      (error) => {
        Swal.fire('Error', 'Error occur during fetch the data', 'error');
      });
    }
    })
  }

}
