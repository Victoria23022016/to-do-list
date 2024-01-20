import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthData, User } from '../models/models';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  formData: AuthData;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    if (this._authService.checkTokenInLocalStorage()) {
      this._authService.auth();
      this._router.navigate(['/todo']);
    }
  }

  submit(): void {
    this.formData = { ...this.form.value };
    this._authService.login(this.formData);
    this.form.reset();
    this._router.navigate(['/todo']);
  }
}
