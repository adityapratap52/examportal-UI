import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any = [];

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    this._quiz.getQuizzes().subscribe((data:any)=>{
      this.quizzes = data;
    },
    (error)=>{
      Swal.fire('Error !!', 'Error during loading data !', 'error');
    });
  }

  public deleteQuiz(id:any) {
    Swal.fire({
      icon:'warning',
      title:"are you sure ?",
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed) {
        this._quiz.deleteQuiz(id).subscribe((data:any)=>{
          this.quizzes = this.quizzes.filter((quiz:any) => quiz.id != id);
          Swal.fire("Success","Quiz Successfully deleted !!",'success');
        },
        (error)=>{
          Swal.fire("Error", "Error Occured during Quiz deletion!");
        });
      }
    });
  }
}
