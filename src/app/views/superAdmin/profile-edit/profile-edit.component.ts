import { ApiService } from "./../../../shared/services/api.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-profile-edit",
  templateUrl: "./profile-edit.component.html",
  styleUrls: ["./profile-edit.component.scss"],
})
export class ProfileEditComponent implements OnInit {
  loading: boolean = false;
  passwordLoading: boolean = false;
  inputProfileData: any = {};
  inputPasswordData: any = {};
  errorData: any;
  profile: any;
  constructor(private api: ApiService, private toast: ToastrService) {}

  ngOnInit() {
    this.api.isNewLogin.subscribe((d) => {
      this.api.getDataWithToken("profile").subscribe(
        (success: any) => {
          if (success.success) {
            this.inputProfileData = success.data;
          }
        },
        (err) => {}
      );
    });
  }

  onFileSelected(event) {}

  saveStaff() {
    this.loading = true;
    this.api.putDataWithToken("profile", this.inputProfileData).subscribe(
      (res: any) => {
        this.loading = false;
        this.errorData = "";
        if (res.success) {
          this.toast.success(res.msg);
          this.api.changeProfile.next(true);
        } else {
          this.toast.error(res.msg);
        }
      },
      (err) => {
        this.loading = false;
        if (err.status == 422) {
          this.errorData = err.error.errors;
        }
      }
    );
  }

  changePassword() {
    this.passwordLoading = true;
    this.api
      .putDataWithToken("profile/password", this.inputPasswordData)
      .subscribe(
        (res: any) => {
          this.passwordLoading = false;
          this.errorData = "";
          if (res.success) {
            this.toast.success(res.msg);
            this.inputPasswordData = {};
          } else {
            this.toast.error(res.msg);
          }
        },
        (err) => {
          this.passwordLoading = false;

          if (err.status == 422) {
            this.errorData = err.error.errors;
          }
        }
      );
  }
}
