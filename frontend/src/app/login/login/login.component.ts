import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    public registerDialog: MatDialog,
    private translate: TranslateService
  ) {}

  public hide = true;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  public errorMessage = ''; // Initially there is no error

  ngOnInit(): void {}

  public onSubmit(): void {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/recipes');
      },
      error: (err: any) => {
        if (err.status === 401) {
          this.translate
            .get('errors.incorrectCreds')
            .subscribe((res: string) => {
              this.errorMessage = res;
            });
        } else {
          this.translate.get('errors.500').subscribe((res: string) => {
            this.errorMessage = res;
          });
        }
      },
    });
  }

  public openRegisterDialog(): void {
    const dialogRef = this.registerDialog.open(RegisterComponent);
  }
}
