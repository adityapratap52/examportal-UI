import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper/helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  public addQuiz(quiz:any) {
    return this._http.post(`${baseUrl}/quiz/add`, quiz);
  }

  public getQuizzes() {
    return this._http.get(`${baseUrl}/quiz/getAll`);
  }

  public getActiveQuizzes() {
    return this._http.get(`${baseUrl}/quiz/getActiveQuizzes`);
  }

  public getActiveQuizzesByCategoryId(cId:any) {
    return this._http.get(`${baseUrl}/quiz/getActiveQuizzesByCategoryId/${cId}`);
  }

  public getQuizById(qId:any) {
    return this._http.get(`${baseUrl}/quiz/getById/${qId}`);
  }

  public deleteQuiz(id:any) {
    return this._http.delete(`${baseUrl}/quiz/deleteById/${id}`);
  }
}
