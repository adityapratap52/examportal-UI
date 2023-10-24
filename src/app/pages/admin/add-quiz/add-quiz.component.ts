import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  qId = 0;

  categories:any =[];

    quiz = {
    id:'',
    title:'',
    description:'',
    maxMarks:'',
    noOfQues:'',
    active:true,
    category:{
      id:''
    }
  }

  constructor(
    private _categoryService:CategoryService,
    private _snack:MatSnackBar,
    private _quizService:QuizService,
    private _route:ActivatedRoute,
    private _router:Router) { }

  ngOnInit(): void {
    this._categoryService.getCategories().subscribe((data:any)=>{
      this.categories = data;
    },
    (error) =>{
      Swal.fire("Error !!", "Server error during fetch category data","error");
    });

    this.qId = this._route.snapshot.params.qid;
    
    if(this.qId != null) {
      this._quizService.getQuizById(this.qId).subscribe((data:any)=>{
        this.quiz = data;
      }, 
      (error)=>{
        Swal.fire("Error", "Something Went Wrong2!!", "error");
      });
    }
  }

  public addQuiz() {
    if(this.quiz.title == null || this.quiz.title.trim() == '') {
      this._snack.open("Title Required !!","Close",{
        duration:3000
      });
      return;
    }
    if(this.quiz.category == null || this.quiz.category.id == undefined || this.quiz.category.id == '') {
      this._snack.open("Category Required !!","Close",{
        duration:3000
      });
      return;
    }
    this._quizService.addQuiz(this.quiz).subscribe((data:any)=>{
      this.quiz = {
        id:'',
        title:'',
        description:'',
        maxMarks:'',
        noOfQues:'',
        active:true,
        category:{
          id:''
        }
      }
      if(this.qId != null) {
        Swal.fire("Success", "Quiz is Successfully updated!!").then((e) => {
          this._router.navigate(['admin/quizzes']);
        });
      } else {
        Swal.fire("Success", "Quiz is Successfully inserted!!").then((e) => {
          this._router.navigate(['admin/quizzes']);
        });
      }  
    },
    (error)=>{
      Swal.fire("Error","Quiz is not add","error");
      console.log(error);
    });
  }
}
