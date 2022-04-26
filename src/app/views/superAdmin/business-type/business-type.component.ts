import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: "app-business-type",
  templateUrl: "./business-type.component.html",
  styleUrls: ["./business-type.component.scss"],
})
export class BusinessTypeComponent implements OnInit {
  data: any = {
    status: true,
  };
  data2: any = {};
  status2: any;
  isLoading: any = false;
  subscriptionDetails: any;
  err: any;
  deleteItem: any;
  pageOfBusinessType: Array<any>;
  constructor(
    private modalService: NgbModal,
    private api: ApiService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.api.sub.subscribe((d) => {
      this.api.getDataWithToken("business-type").subscribe(
        (success: any) => {
          if (success.success) {
            this.subscriptionDetails = success.data;
            this.isLoading = false;
          }
        },
        (err) => {
          this.isLoading = false;
        }
      );
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfBusinessType = pageOfItems;
  }

  open(content) {
    this.modalService
      .open(content, {
        size: "lg",
        ariaLabelledBy: "modal-basic-title",
        centered: true,
      })
      .result.then(
        (result) => {
          this.api.postDataWithToken("business-type", this.data).subscribe(
            (success: any) => {
              if (success.success) {
                this.toast.success("Business_Type Added Successfully");
                this.api.sub.next(true);
                this.data = {};
              }
            },
            (err) => {
              this.err = err.error.errors;

              this.data = {};
              this.toast.error("Something Went Wrong");
            }
          );
        },
        (reason) => {
          this.ngOnInit();
          this.data = {};
        }
      );
  }

  open2(content, i) {
    this.data2 = i;
    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-update-title" })
      .result.then(
        (result) => {
          let status;
          this.data2.status == true ? 1 : 0;

          this.api
            .putDataWithToken("business-type/" + i.id, this.data2)
            .subscribe(
              (success: any) => {
                if (success.success) {
                  this.toast.success("Updated Successfully");
                  this.api.sub.next(true);
                }
              },
              (err) => {}
            );
        },
        (reason) => {
          this.ngOnInit();
        }
      );
  }

  open3(content, item) {
    this.deleteItem = item;
    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-update-title" })
      .result.then(
        (result) => {
          this.api.deleteDataWithToken("business-type/" + item.id).subscribe(
            (success: any) => {
              if (success.success) {
                this.toast.success("Business Type Deleted Successfully");
                this.api.sub.next(true);
              }
            },
            (err) => {}
          );
        },
        (reason) => {
          this.ngOnInit();
        }
      );
  }

  remove(i) {
    this.api.deleteDataWithToken("subscription/" + i.id).subscribe(
      (success: any) => {
        if (success.success) {
          this.toast.success("Subscription Deleted Successfully");
          this.api.sub.next(true);
        }
      },
      (err) => {}
    );
  }
}
