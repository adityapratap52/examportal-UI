import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor:any = ClassicEditor;

  qId:any;
  qTitle:any;
  question:any = {
    quiz:{},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };

  constructor(private _rout: ActivatedRoute,
              private _quesService: QuestionService,
              private _router: Router) { }

  ngOnInit(): void {
    this.qId = this._rout.snapshot.params.qId;
    this.qTitle = this._rout.snapshot.params.qTitle;
    this.question.quiz.id=this.qId;
  }

  public addQuestion() {
    if(this.question.content == null || this.question.content.trim() == '') {
      return;
    }
    if(this.question.option1 == null || this.question.option1.trim() == '') {
      return;
    }
    if(this.question.option2 == null || this.question.option2.trim() == '') {
      return;
    }
    if(this.question.answer == null || this.question.answer == undefined || this.question.answer == '') {
      return;
    }
    this._quesService.addQuestion(this.question).subscribe((data:any) => {
      Swal.fire({
        icon:"question",
        title:"Do you want to add another question ?",
        showCancelButton:true,
        cancelButtonText:"No",
        confirmButtonText:"Yes"
      }).then((result) => {
        if(result.isConfirmed) {
          this.question.content = '';
          this.question.option1 = '';
          this.question.option2 = '';
          this.question.option3 = '';
          this.question.option4 = '';
          this.question.answer = '';
          return;
        } else {
          this._router.navigate(['/admin/view-questions/'+this.qId+'/'+this.qTitle]);
        }
      });
      
    }, 
    (error) => {
      Swal.fire("Error", "Error Occur during save the question", "error");
    });
  }
}
