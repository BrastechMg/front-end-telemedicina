import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { StudentDto } from '../models/dto/student.dto';

@Injectable()
export class StudentService {
  constructor(private http: HttpClient) {}

  basePath = '/students';

  findAll() {
    return this.http.get<StudentDto[]>(`${API_CONFIG.baseUrl}${this.basePath}`);
  }

  save(student: StudentDto) {
    return this.http.post<StudentDto>(
      `${API_CONFIG.baseUrl}${this.basePath}`,
      student,
    );
  }

  deleteById(studentId: number) {
    return this.http.delete<void>(
      `${API_CONFIG.baseUrl}${this.basePath}/${studentId}`,
    );
  }
}
