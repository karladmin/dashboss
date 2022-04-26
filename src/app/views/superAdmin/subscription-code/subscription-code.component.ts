import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: "app-subscription-code",
  templateUrl: "./subscription-code.component.html",
  styleUrls: ["./subscription-code.component.scss"],
})
export class SubscriptionCodeComponent implements OnInit {
  data: any = {
    status: true,
  };
  isLoading: any = false;
  subscriptionList: any = [];
  activeTab = 0;
  tabContent = [
    {
      name: "subscription plan",
      active: true,
    },
    {
      name: "Active Subscription",
      active: false,
    },
    {
      name: "Buyer Subscription",
      active: false,
    },
  ];
  subscriptionDetails: any;
  err: any;
  buyer_subscription: any;
  activeSubscription: any;
  deleteItem: any;
  currency_symbol: any;
  data2: any = {};
  status2: any;
  constructor(
    private modalService: NgbModal,
    private api: ApiService,
    private toast: ToastrService,
    private transalteSer: TranslateService
  ) {
    this.transalteSer.get("settings").subscribe((res) => {});
  }

  ngOnInit(): void {
    this.api.getDataWithToken("setting").subscribe(
      (success: any) => {
        if (success.success) {
          success.data.forEach((element) => {
            if (element.key_name == "currency_symbol") {
              this.currency_symbol = element.value;
            }
          });
        }
      },
      (err) => {}
    );

    this.isLoading = true;
    this.api.sub.subscribe((d) => {
      this.api.getDataWithToken("subscription").subscribe(
        (success: any) => {
          if (success.success) {
            this.subscriptionDetails = success.data;

            this.isLoading = false;
          }
        },
        (err) => {}
      );
      this.api.getDataWithToken("buyer-subscription").subscribe(
        (success: any) => {
          if (success.success) {
            this.buyer_subscription = success.data;
            this.isLoading = false;
          }
        },
        (err) => {}
      );
    });
    this.api.getDataWithToken("active-subscription").subscribe(
      (success: any) => {
        if (success.success) {
          this.activeSubscription = success.data;
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
          this.isLoading = true;

          this.api.postDataWithToken("subscription", this.data).subscribe(
            (success: any) => {
              if (success.success) {
                this.toast.success("Subscription Added Successfully");
                this.isLoading = false;
                this.api.sub.next(true);
              }
            },
            (err) => {
              this.err = err.error.errors;

              this.isLoading = false;
              this.toast.error("Something Went Wrong");
            }
          );
        },
        (reason) => {
          this.isLoading = false;
          this.ngOnInit();
        }
      );
  }

  open2(content, i) {
    this.data2 = i;
    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-update-title" })
      .result.then(
        (result) => {
          this.isLoading = true;

          let status;
          this.data2.status == true ? 1 : 0;

          this.api
            .putDataWithToken("subscription/" + i.id, this.data2)
            .subscribe(
              (success: any) => {
                if (success.success) {
                  this.toast.success("Updated Successfully");
                  this.api.sub.next(true);
                  this.data2 = {};
                  this.isLoading = false;
                }
              },
              (err) => {
                this.data2 = {};
                this.isLoading = false;
              }
            );
        },
        (reason) => {
          this.ngOnInit();
          this.isLoading = false;
          this.data2 = {};
        }
      );
  }

  open3(content, item) {
    this.deleteItem = item;
    this.modalService
      .open(content, { size: "lg", ariaLabelledBy: "modal-update-title" })
      .result.then(
        (result) => {
          this.api.deleteDataWithToken("subscription/" + item.id).subscribe(
            (success: any) => {
              if (success.success) {
                this.toast.success("Subscription Deleted Successfully");
                this.api.sub.next(true);
                this.deleteItem = {};
              }
            },
            (err) => {
              this.deleteItem = {};
            }
          );
        },
        (reason) => {
          this.ngOnInit();
          this.deleteItem = {};
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

  tabChange(event) {
    this.activeTab = event;
  }
}
