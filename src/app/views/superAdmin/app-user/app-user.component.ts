import { ToastrService } from "ngx-toastr";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "src/app/shared/services/api.service";
import htmlToPdfmake from "html-to-pdfmake";
import * as moment from "moment";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-app-user",
  templateUrl: "./app-user.component.html",
  styleUrls: ["./app-user.component.scss"],
})
export class AppUserComponent implements OnInit {
  appUser: any;
  backupUserData: any;
  isLoading: any = false;
  userDataInput: any = {
    name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  pageOfAppUser: Array<any>;
  loading: boolean = false;
  isEdit: boolean = false;
  errorData: any;
  deleteId: any = 0;
  @ViewChild("users", { static: false }) content: ElementRef;
  constructor(
    private api: ApiService,
    private modalService: NgbModal,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.isLoading = true;
    this.api.getDataWithToken("app-user").subscribe(
      (success: any) => {
        if (success.success) {
          this.appUser = success.data;
          this.backupUserData = success.data;
        }
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
      this.userDataInput.name = data.name;
      this.userDataInput.phone = data.phone;
      this.userDataInput.email = data.email;
      this.userDataInput.id = data.id;
    }
    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          console.log("close", result);
        },
        (reason) => {
          this.isEdit = false;
          this.userDataInput = {
            name: "",
            phone: "",
            email: "",
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
          this.getUserData();
        }
      );
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfAppUser = pageOfItems;
  }

  searchUser(searchTerm) {
    this.appUser = this.backupUserData;
    if (
      searchTerm &&
      searchTerm.replace(/\s/g, "").length > 0 &&
      searchTerm != null
    ) {
      this.appUser = this.appUser.filter((user) => {
        return (
          user?.name?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          user?.email?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        );
      });
    }
  }

  exportPDF() {
    const pdfTable = this.content.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    this.api.exportPdfFile(html, "App User");
  }

  exportEXCEL() {
    this.api.exportExcelFile(this.content.nativeElement, "App User");
  }

  exportCSV() {
    let columnNames = ["Name", "Email", "Mobile", "Status", "Created At"];
    let header = columnNames.join(",");
    let csv = header;
    csv += "\r\n";

    this.appUser.map((c) => {
      let cretaeAt = moment(c.created_at).format("DD-MM-YYYY");
      csv += [
        c["name"],
        c["email"],
        c["phone"],
        c["status"] == 1 ? "Active" : "Block",
        cretaeAt,
      ].join(",");
      csv += "\r\n";
    });

    this.api.exportCsvFile(csv, "App User");
  }

  blockUser(data) {
    this.api.getDataWithToken("app-user-block/" + data.id).subscribe(
      (res: any) => {
        if (res.success) {
          data.status = res.data;
          if (res.data == 0) {
            this.toast.success("User Blocked Successfully");
          } else {
            this.toast.success("User Unblocked Successfully");
          }
        } else {
          this.toast.error(res.msg);
        }
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  addAppUser() {
    const fd = new FormData();
    fd.append("name", this.userDataInput.name);
    fd.append("phone", this.userDataInput.phone);
    fd.append("email", this.userDataInput.email);

    if (!this.isEdit) {
      fd.append("password", this.userDataInput.password);
      fd.append(
        "password_confirmation",
        this.userDataInput.password_confirmation
      );
    }

    if (this.isEdit) {
      this.loading = true;
      this.api.postData("app-user/" + this.userDataInput.id, fd).subscribe(
        (res: any) => {
          this.errorData = "";
          this.loading = false;
          if (res.success) {
            this.toast.success("User Update successfully.");
            this.userDataInput = {
              name: "",
              phone: "",
              email: "",
              password: "",
              password_confirmation: "",
            };
            this.isEdit = false;
            this.modalService.dismissAll();
            this.getUserData();
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
      this.api.postData("app-user-create", fd).subscribe(
        (res: any) => {
          console.log("response data", res);
          this.errorData = "";
          this.loading = false;
          if (res.success) {
            this.toast.success("User add successfully.");
            this.userDataInput = {
              name: "",
              phone: "",
              email: "",
              password: "",
              password_confirmation: "",
            };
            this.modalService.dismissAll();
            this.getUserData();
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

  deleteAppUser() {
    this.loading = true;
    this.api.getDataWithToken("app-user-delete/" + this.deleteId).subscribe(
      (res: any) => {
        if (res.success) {
          this.toast.success("User Deleted Successfully");
          this.loading = false;
          this.appUser.forEach((element, ind) => {
            if (element.id == this.deleteId) {
              this.appUser.splice(ind, 1);
            }
          });
          this.backupUserData.forEach((element, ind) => {
            if (element.id == this.deleteId) {
              this.backupUserData.splice(ind, 1);
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
