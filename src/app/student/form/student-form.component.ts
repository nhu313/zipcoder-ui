import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Student } from './../student';
import { StudentService } from './../student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  student: Student = new Student();
  id: number;
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private service: StudentService, private router: Router) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.service.get(this.id).subscribe(data => this.student = data);
  }

  submit(){
    this.loading = true;
    let redirectUrl = '/admin/students';
    if (this.id) {
      this.service.update(this.student).subscribe(response => this.router.navigate([redirectUrl]))
    } else {
      this.service.create(this.student).subscribe(response => this.router.navigate([redirectUrl]))
    }
  }
}
