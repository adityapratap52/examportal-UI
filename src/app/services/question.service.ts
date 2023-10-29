import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper/helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private _http: HttpClient
  ) { }

  public addQuestion(question:any) {
    return this._http.post(`${baseUrl}/question/add`, question);
  }

  public getQuestionsOfQuiz(qId:any) {
    return this._http.get(`${baseUrl}/question/getByQuizId/all/${qId}`);
  }

  public getQuestionsOfQuizForUser(qId:any) {
    return this._http.get(`${baseUrl}/question/getByQuizId/${qId}`);
  }

  public deleteQuestion(quesId:any) {
    return this._http.delete(`${baseUrl}/question/deleteById/${quesId}`);
  }
}
