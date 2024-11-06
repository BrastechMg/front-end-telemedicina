import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { QuizDTO } from '../models/dto/quiz.dto';

@Injectable({
  providedIn: 'root'
})
export class AttemptService {

  quizPath: string = '/quiz';

  constructor(private http:HttpClient) { }
  sendAttemptsQuiz(customerCpf:string) {
    const registerQuizAttemptDTO: QuizDTO = {
           cpf: customerCpf
       }    
    return this.http.post(`${API_CONFIG.baseUrl}${this.quizPath}`,registerQuizAttemptDTO);
  }

  resetAttemptQuiz(customerCpf:string){
    return this.http.delete(`${API_CONFIG.baseUrl}${this.quizPath}/${customerCpf}`);
  }
}
