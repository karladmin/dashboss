import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.scss"],
})
export class FaqComponent implements OnInit {
  data: any = {};
  faq: any;
  isLoading: any = false;
  constructor(
    private modalService: NgbModal,
    private api: ApiService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.isLoading = true;
    this.api.getDataWithToken("faq").subscribe(
      (success: any) => {
        if (success.success) {
          this.faq = success.data;
          this.isLoading = false;
        }
      },
      (err) => {}
    );
  }

  open(content) {
    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.api
            .postDataWithToken("faq", {
              question: this.data.question,
              answer: this.data.answer,
            })
            .subscribe(
              (success: any) => {
                if (success.success) {
                  this.toast.success("Question Added Successfully");
                  this.data = {};
                  this.getData();
                }
              },
              (err) => {
                this.toast.error("Something Went Wrong");
              }
            );
        },
        (reason) => {
          this.getData();
          this.data = {};
        }
      );
  }

  open2(content, item) {
    this.data = item;
    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.api
            .putDataWithToken("faq/" + item.id, {
              question: this.data.question,
              answer: this.data.answer,
            })
            .subscribe(
              (success: any) => {
                if (success.success) {
                  this.toast.success("Question Edited Successfully");
                  this.data = {};
                  this.getData();
                }
              },
              (err) => {
                this.toast.error("Something Went Wrong");
              }
            );
        },
        (reason) => {
          this.getData();
          this.data = {};
        }
      );
  }

  delete(content, item) {
    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.isLoading = true;
          this.api.deleteDataWithToken("faq/" + item.id).subscribe(
            (success: any) => {
              if (success.success) {
                this.toast.success("Question Deleted Successfully");
                this.getData();
                this.isLoading = false;
              }
            },
            (err) => {
              this.toast.error("Something Went Wrong");
              this.isLoading = false;
            }
          );
        },
        (reason) => {
          this.getData();
          this.data = {};
        }
      );
  }
}
