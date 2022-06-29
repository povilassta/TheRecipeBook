import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentCommunicationService } from 'src/app/services/componentCommunication.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private componentCommunicationService: ComponentCommunicationService,
    private authService: AuthService,
    public registerDialog: MatDialog
  ) {}

  public hide = true;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  public onSubmit(): void {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe((data) => {
      this.componentCommunicationService.callUpdateUser();
      this.router.navigateByUrl('/recipes');
    });
  }

  public openRegisterDialog(): void {
    const dialogRef = this.registerDialog.open(RegisterComponent, {
      width: '40%',
    });
  }
}
