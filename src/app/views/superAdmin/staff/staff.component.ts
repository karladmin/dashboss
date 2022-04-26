import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: "app-staff",
  templateUrl: "./staff.component.html",
  styleUrls: ["./staff.component.scss"],
})
export class StaffComponent implements OnInit {
  isLoading: any = false;
  staff: any;
  passwordLoading: boolean = false;
  pageOfStaff: Array<any>;
  constructor(
    private modalService: NgbModal,
    private api: ApiService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getDataWithToken("staff").subscribe(
      (success: any) => {
        if (success.success) {
          this.staff = success.data;
          this.isLoading = false;
        }
      },
      (err) => {}
    );
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfStaff = pageOfItems;
  }

  open(content) {
    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.isLoading = true;
          this.passwordLoading = true;

          this.staffDataInput.status == true ? 1 : 0;
          this.api.postDataWithToken("staff", this.staffDataInput).subscribe(
            (success: any) => {
              if (success.success) {
                this.toast.success("New Staff Added Successfully");
                this.ngOnInit();
                this.isLoading = false;
                this.passwordLoading = false;
                this.staffDataInput = {};
              }
            },
            (err) => {
              this.toast.error(err.error.message);
              this.isLoading = false;
              this.passwordLoading = false;
            }
          );
        },
        (reason) => {
          this.staffDataInput = {};
          this.isLoading = false;
          this.passwordLoading = false;
          this.ngOnInit();
        }
      );
  }
  staffDataInput: any = {};
  open2(content, item) {
    this.staffDataInput = item;

    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.isLoading = true;

          this.passwordLoading = true;
          this.staffDataInput.status == true ? 1 : 0;
          this.api
            .postDataWithToken("staff/" + item.id, this.staffDataInput.status)
            .subscribe(
              (success: any) => {
                if (success.success) {
                  this.toast.success("Status Updated Successfully");
                  this.passwordLoading = false;
                  this.isLoading = false;
                  this.staffDataInput = {};
                }
              },
              (err) => {
                this.toast.error("Something Went Wrong");
                this.passwordLoading = false;
                this.isLoading = false;
              }
            );
        },
        (reason) => {
          this.staffDataInput = {};
          this.isLoading = false;
          this.ngOnInit();
        }
      );
  }
}
