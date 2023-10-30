import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
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
  isSubmit = false;
  timer:any;
  totalTime:any;

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

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStat.onPopState(()=>{
      history.pushState(null, '', location.href);
    })
  }

  loadQuestions() {
    this._quesService.getQuestionsOfQuizForUser(this.qId).subscribe((data:any) =>{
      this.questions = data;

      this.timer=this.questions.length*2*60;
      this.totalTime=this.questions.length*2*60;
      console.log(data)
      // this.questions.forEach((q:any) => {
      //   q['givenAnswer'] = ''
      // });
      this.startTimer();
    },
    (error) => {
      Swal.fire('Error', 'Error in loading questions of quiz');
    });
  }

  submitQuiz() {
    Swal.fire({
      icon:'question',
      title:'Do you want to submit the quiz',
      showCancelButton:true,
      confirmButtonText:'Submit'
    }).then((result) => {
      if(result.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t:any = window.setInterval(() => {
      if(this.timer <= 0) {
        clearInterval(t);
        this.evalQuiz();
      } else {
        this.timer--;
      }
    },1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - (mm*60);
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    this._quesService.evalQuiz(this.questions).subscribe((data:any) => {
      this.isSubmit = true;
      this.attempted = data.totalAttampts;
      this.correctAnswers = data.correctAnswers;
      this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
    },
    (error) => {
      console.log(error);
    });
    // 
    // let singleMarks = this.questions[0].quiz.maxMarks/this.questions.length;
    //     this.questions.forEach((q:any) => {
    //       if(q.givenAnswer != '') {
    //         if(q.givenAnswer==q.answer) {
    //           this.correctAnswers++;
    //           this.marksGot += singleMarks;
    //         }
    //         this.attempted++;
    //       }
    //     });
  }

  printPage() {
    window.print();
  }
}
