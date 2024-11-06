import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CourseDto } from '../models/dto/course.dto';

@Injectable()
export class CourseService {
  constructor(private http: HttpClient) {}

  basePath = '/courses';

  findAll() {
    return this.http.get<CourseDto[]>(`${API_CONFIG.baseUrl}${this.basePath}`);
  }

  deleteById(courseId: number) {
    return this.http.delete<any>(
      `${API_CONFIG.baseUrl}${this.basePath}/${courseId}`,
    );
  }

  save(course: CourseDto) {
    return this.http.post<CourseDto>(
      `${API_CONFIG.baseUrl}${this.basePath}`,
      course,
    );
  }
}
