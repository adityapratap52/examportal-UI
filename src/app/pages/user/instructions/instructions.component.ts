import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qId:any;
  quiz:any;

  constructor(
    private _route:ActivatedRoute,
    private _quizService: QuizService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qId;
    this._quizService.getQuizById(this.qId).subscribe((data:any) => {
      this.quiz = data;
    },
    (error) => {
      Swal.fire(('Error'));
    });
  }

  startQuiz() {
    Swal.fire({
      icon:'question',
      title: 'Do you want to start the quiz ?',
      showDenyButton:true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if(result.isConfirmed) {
        this._router.navigate(['/start-quiz/'+this.qId]);
      }
      return;
    });
  }
}
