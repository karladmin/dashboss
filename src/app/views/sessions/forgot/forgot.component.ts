import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ApiService } from "./../../../shared/services/api.service";
import { Component, OnInit } from "@angular/core";
import { SharedAnimations } from "src/app/shared/animations/shared-animations";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"],
  animations: [SharedAnimations],
})
export class ForgotComponent implements OnInit {
  loading;
  email: any;
  otpData;
  newPassword: any;
  signShow: any = 1;
  errdata: any;
  constructor(
    private api: ApiService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit() {}

  doSendOtp() {
    this.loading = true;
    const fd = new FormData();
    fd.append("access", this.email);
    fd.append("type", "2");
    this.api.postDataWithToken("forgot", fd).subscribe(
      (success: any) => {
        if (success.success) {
          this.loading = false;
          this.errdata = "";
          this.toast.success(success.msg);
          this.signShow = 2;
        } else if (success.success == false) {
          this.toast.error(success.msg);
          this.loading = false;
        }
      },
      (err) => {
        console.log("err", err);
        this.loading = false;
        if (err.status == 422) {
          this.errdata = err.error.errors;
        }
      }
    );
  }

  doVerify() {
    this.loading = true;
    let data = {
      access: this.email,
      otp: this.otpData,
      type: 2,
    };
    this.api.postDataWithToken("forgot/validate", data).subscribe(
      (res: any) => {
        if (res.success) {
          this.loading = false;
          this.api.userToken = res.data.token;
          localStorage.setItem("token", res.data.token);
          this.api.isNewLogin.next(true);
          this.toast.success(res.msg);
          this.signShow = 3;
        } else {
          this.toast.error(res.msg);
          this.loading = false;
        }
      },
      (err) => {
        this.loading = false;
        if (err.status == 422) {
          this.errdata = err.error.errors;
        }
      }
    );
  }

  doSetNewPassword() {
    this.loading = true;
    let data = {
      password: this.newPassword,
    };
    this.api.postDataWithToken("newpassword", data).subscribe(
      (res: any) => {
        if (res.success) {
          this.loading = false;
          this.api.isNewLogin.next(true);
          this.api.userToken = res.data.token;
          localStorage.setItem("token", res.data.token);
          this.toast.success(res.msg);
          this.router.navigateByUrl("/dashboard/v1");
        } else {
          this.api.userToken = "";
          localStorage.removeItem("token");
          this.toast.error(res.msg);
          this.loading = false;
        }
      },
      (err) => {
        this.loading = false;
        if (err.status == 422) {
          this.errdata = err.error.errors;
        }
      }
    );
  }
}
