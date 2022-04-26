import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "src/app/shared/services/api.service";
import htmlToPdfmake from "html-to-pdfmake";

@Component({
  selector: "app-salon-owner",
  templateUrl: "./salon-owner.component.html",
  styleUrls: ["./salon-owner.component.scss"],
})
export class SalonOwnerComponent implements OnInit {
  data = [];
  pageOfData: Array<any>;
  isLoading: any = false;
  ownerDataInput: any = {
    name: "",
    company_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  };
  loading: boolean = false;
  isEdit: boolean = false;
  errorData: any;
  deleteId: any;
  @ViewChild("owners", { static: false }) content: ElementRef;
  constructor(
    private api: ApiService,
    private modalService: NgbModal,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getOwnerData();
  }

  getOwnerData() {
    this.isLoading = true;
    this.api.getDataWithToken("owner").subscribe(
      (res: any) => {
        this.data = res.data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  open(content, data?) {
    console.log("item", data);
    if (data) {
      this.isEdit = true;
      this.ownerDataInput.name = data.name;
      this.ownerDataInput.email = data.email;
      this.ownerDataInput.phone = data.phone;
      this.ownerDataInput.id = data.id;
    }
    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          console.log("close", result);
        },
        (reason) => {
          this.isEdit = false;
          this.ownerDataInput = {
            name: "",
            company_name: "",
            email: "",
            phone: "",
            password: "",
            password_confirmation: "",
          };
          this.errorData = "";
        }
      );
  }

  open3(content, item) {
    if (item) {
      this.deleteId = item.id;
    }
    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-update-title" })
      .result.then(
        (result) => {
          console.log("close res");
        },
        (reason) => {
          this.deleteId = 0;
          this.getOwnerData();
        }
      );
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfData = pageOfItems;
  }

  exportEXCEL() {
    this.api.exportExcelFile(this.content.nativeElement, "owner");
  }

  statusUpdate(e) {
    if (e.status == 1) {
      this.api.postDataWithToken("owner/" + e.id, { status: 0 }).subscribe(
        (success: any) => {
          if (success.success) {
            e.status = 0;
          }
        },
        (err) => {
          console.log("err", err);
        }
      );
    } else if (e.status == 2) {
      this.api.postDataWithToken("owner/" + e.id, { status: 1 }).subscribe(
        (success: any) => {
          if (success.success) {
            e.status = 1;
          }
        },
        (err) => {
          console.log("err", err);
        }
      );
    } else if (e.status == 0) {
      this.api.postDataWithToken("owner/" + e.id, { status: 1 }).subscribe(
        (success: any) => {
          if (success.success) {
            e.status = 1;
          }
        },
        (err) => {
          console.log("err", err);
        }
      );
    }
  }

  exportPDF() {
    const pdfTable = this.content.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    this.api.exportPdfFile(html, "owner");
  }

  exportCSV() {
    let columnNames = ["Name", "Email", "Time", "Status"];
    let header = columnNames.join(",");

    let csv = header;
    csv += "\r\n";

    this.data.map((c) => {
      let status;
      if (c["status"] == 1) {
        status = "Active";
      } else if (c["status"] == 0) {
        status = "Inactive";
      }
      csv += [c["name"], c["email"], c["updated_at"], status].join(",");
      csv += "\r\n";
    });

    this.api.exportCsvFile(csv, "App User");
  }

  addOwner() {
    const fd = new FormData();
    fd.append("name", this.ownerDataInput.name);

    fd.append("email", this.ownerDataInput.email);
    fd.append("business_type", "1");

    if (!this.isEdit) {
      fd.append("company_name", this.ownerDataInput.company_name);
      fd.append("password", this.ownerDataInput.password);
      fd.append(
        "password_confirmation",
        this.ownerDataInput.password_confirmation
      );
    }

    if (this.isEdit) {
      fd.append("phone", this.ownerDataInput.phone);
      this.loading = true;
      this.api.postData("owner-update/" + this.ownerDataInput.id, fd).subscribe(
        (res: any) => {
          this.errorData = "";
          this.loading = false;
          if (res.success) {
            this.toast.success("Owner Update successfully.");
            this.ownerDataInput = {
              name: "",
              company_name: "",
              phone: "",
              email: "",
              password: "",
              password_confirmation: "",
            };
            this.isEdit = false;
            this.modalService.dismissAll();
            this.getOwnerData();
          } else {
            this.toast.error(res.msg);
          }
        },
        (err) => {
          console.log("err", err);
          this.loading = false;
          if (err.status == 422) {
            this.errorData = err.error.errors;
          }
        }
      );
    } else {
      this.loading = true;
      this.api.postData("owner-create", fd).subscribe(
        (res: any) => {
          console.log("response data", res);
          this.errorData = "";
          this.loading = false;
          if (res.success) {
            this.toast.success("Owner add successfully.");
            this.ownerDataInput = {
              name: "",
              company_name: "",
              email: "",
              phone: "",
              password: "",
              password_confirmation: "",
            };
            this.modalService.dismissAll();
            this.getOwnerData();
          } else {
            this.toast.error(res.msg);
          }
        },
        (err) => {
          console.log("err", err);
          this.loading = false;
          if (err.status == 422) {
            this.errorData = err.error.errors;
          }
        }
      );
    }
  }

  deleteOwner() {
    this.loading = true;
    this.api.getDataWithToken("owner-delete/" + this.deleteId).subscribe(
      (res: any) => {
        if (res.success) {
          this.toast.success("Owner Deleted Successfully");
          this.loading = false;
          this.data.forEach((element, ind) => {
            if (element.id == this.deleteId) {
              this.data.splice(ind, 1);
            }
          });
          this.modalService.dismissAll();
        } else {
          this.toast.error(res.msg);
        }
      },
      (err) => {
        this.loading = false;
      }
    );
  }
}
