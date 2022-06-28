import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) {}

  public registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
      agreeToTerms: new FormControl(false, [Validators.requiredTrue]),
    },
    [this.confirmPasswordValidator('password', 'repeatPassword')]
  );

  ngOnInit(): void {}

  confirmPasswordValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }

  onSubmit(): void {
    const { email, username, password, repeatPassword } =
      this.registerForm.value;

    this.authService
      .register({
        email: email || '',
        username: username || '',
        password: password || '',
        repeatPassword: repeatPassword || '',
      })
      .subscribe((response: any) => {
        console.log(response.email + ' registered!');
        this.dialogRef.close();
      });
  }
}
