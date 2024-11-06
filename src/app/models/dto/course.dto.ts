import { StudentDto } from './student.dto';

export class CourseDto {
  id!: number;
  description!: string;
  subject!: string;
  students!: StudentDto[];
}
