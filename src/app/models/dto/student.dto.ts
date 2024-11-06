import { CourseDto } from './course.dto';

export class StudentDto {
  id!: number;
  name!: string;
  courses!: CourseDto[];
}
