import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import {
  Router,
  RouteConfigLoadStart,
  ResolveStart,
  RouteConfigLoadEnd,
  ResolveEnd,
} from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: [SharedAnimations],
})
export class SigninComponent implements OnInit {
  loading: boolean;
  loadingText: string;
  signinForm: FormGroup;
  loginData: any;
  errData: any;
  otpData: any;
  isCheckVerify: boolean = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private api: ApiService,
    private store: LocalStoreService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (
        event instanceof RouteConfigLoadStart ||
        event instanceof ResolveStart
      ) {
        this.loadingText = 'Loading Dashboard Module...';

        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signin() {
    this.loading = true;
    this.loadingText = 'Sigining in...';
    this.api.postData('sign-in', this.signinForm.value).subscribe(
      (success: any) => {
        console.log('success data', success);
        if (success.success) {
          this.router.navigateByUrl('/dashboard/v1');
          this.loading = false;
          this.api.userToken = success.data.token;
          this.store.setItem('token', success.data.token);
          this.store.setItem('demo_login_status', true);
          this.api.isNewLogin.next(true);
          this.toast.success(success.msg);
        } else if (success.twofactor) {
          this.loading = false;
          this.isCheckVerify = true;
          this.loginData = success.data;
          this.toast.success(success.msg);
        } else {
          this.loading = false;
          this.toast.error(success.msg);
        }
      },
      (err) => {
        if (err.status == 422) {
          this.errData = err.error.errors;
          this.api.errData = this.errData;
          console.log(this.errData);
          this.loading = false;
        }
      }
    );
  }

  verify() {
    const fd = new FormData();
    this.loading = true;

    fd.append('access', this.loginData.email.toString());
    fd.append('otp', this.otpData);
    this.api.postData('two-factor-admin', fd).subscribe(
      (res: any) => {
        console.log('response', res);
        this.loading = false;
        if (res.success) {
          this.toast.success(res.msg);
          this.router.navigateByUrl('/dashboard/v1');
          this.api.userToken = res.data.token;
          this.store.setItem('token', res.data.token);
          this.api.isNewLogin.next(true);
        } else {
          this.toast.error(res.msg);
        }
      },
      (err) => {
        this.loading = false;
        console.log('err', err);
      }
    );
  }
}
