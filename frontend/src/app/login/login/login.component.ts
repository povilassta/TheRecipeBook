import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentCommunicationService } from 'src/app/services/componentCommunication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private componentCommunicationService: ComponentCommunicationService
  ) {}

  public hide = true;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  public onSubmit(): void {
    const { email, password } = this.loginForm.value;

    localStorage.setItem('email', email);
    this.componentCommunicationService.callUpdateUser();

    this.router.navigateByUrl('/recipes');
  }
}
