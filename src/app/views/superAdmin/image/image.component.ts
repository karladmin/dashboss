import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/api.service";
@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
})
export class ImageComponent implements OnInit {
  passwordLoading: any = false;
  url: any = "";
  files: any;
  imageData: any;
  isLoading: any = false;
  btnDisable: any = false;
  constructor(
    private modalService: NgbModal,
    private api: ApiService,
    private toast: ToastrService,
    private translate: TranslateService
  ) {
    this.translate.get("settings").subscribe((data) => {});
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getImage();
    }, 500);
  }

  updateSource(e) {
    var file = e.target.files[0];
    this.files = file;

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // read file as data url

    reader.onload = (event) => {
      // called once readAsDataURL is completed
      this.url = event.target.result;
    };
  }

  getImage() {
    this.api.getDataWithToken("image-slider").subscribe(
      (success: any) => {
        if (success.success) {
          this.imageData = success.data;
        }
      },
      (err) => {}
    );
  }

  open(content) {
    /*   this.isLoading=true; */
    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          const fd = new FormData();
          fd.append("image", this.files);
          this.api.postDataWithToken("image-slider", fd).subscribe(
            (success: any) => {
              if (success.success) {
                this.toast.success("Image Uploaded Successfully");
                this.getImage();
                this.url = null;
                this.files = null;
                this.isLoading = false;
              } else {
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
          this.ngOnInit();
          this.url = null;
          this.files = null;
        }
      );
  }

  open2(content, item) {
    this.url = item.imageUri;
    /*  this.isLoading=true; */
    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.isLoading = true;

          const fd = new FormData();
          fd.append("image", this.files);
          fd.append("_method", "PUT");

          this.api.postDataWithToken("image-slider/" + item.id, fd).subscribe(
            (success: any) => {
              if (success.success) {
                this.toast.success("Image Edited Successfully");
                this.getImage();
                this.url = null;
                this.files = null;
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
          this.ngOnInit();
          this.url = null;
          this.files = null;
          this.isLoading = false;
        }
      );
  }

  open3(content, item) {
    /*   this.isLoading=true; */
    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-update-title" })
      .result.then(
        (result) => {
          this.isLoading = true;
          this.api.deleteDataWithToken("image-slider/" + item.id).subscribe(
            (success: any) => {
              if (success.success) {
                this.toast.success("Image Deleted Successfully");
                this.getImage();
                this.isLoading = false;
              }
            },
            (err) => {
              this.isLoading = false;
            }
          );
        },
        (reason) => {
          this.ngOnInit();
        }
      );
  }
  saveOwner() {
    this.passwordLoading = true;
    setTimeout(() => {
      this.passwordLoading = false;
    }, 5000);
  }

  remove(i) {
    this.isLoading = true;
    this.api.deleteDataWithToken("image-slider/" + i.id).subscribe(
      (success: any) => {
        if (success.success) {
          this.toast.success("Image Deleted Successfully");
          this.api.sub.next(true);
          this.isLoading = false;
        }
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
}
