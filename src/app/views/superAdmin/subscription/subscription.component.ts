import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
import * as moment from 'moment';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  data: any = {
    status: true,
  };
  isLoading: any = false;
  subscriptionList: any = [];
  activeTab = 0;
  tabContent = [
    {
      name: 'subscription plan',
      key: 'subsPlan',
      active: true,
    },
    {
      name: 'Active Subscription',
      key: 'activeSubs',
      active: false,
    },
    {
      name: 'Buyer Subscription',
      key: 'buyerSubs',
      active: false,
    },
  ];
  editActiveSubData: any = {};
  subscriptionDetails: any;
  err: any;
  buyer_subscription: any;
  activeSubscription: any;
  deleteItem: any;
  currency_symbol: any;
  addSubData: any = {};
  subscriptionCodeData: any;
  isEditSub: boolean = false;
  logData: any;
  backupData: any = {};
  data2: any = {};
  status2: any;
  activeSubOwnDetail: any;
  pageOfSubPlan: Array<any>;
  pageOfActiveSub: Array<any>;
  pageOfBuyerSub: Array<any>;
  pageOfLog: Array<any>;
  listData: any = [
    {
      id: 1,
      header: '',
      description: '',
    },
  ];

  constructor(
    private modalService: NgbModal,
    private api: ApiService,
    private toast: ToastrService,
    private transalteSer: TranslateService
  ) {
    this.transalteSer.get('subscription').subscribe((lanRes) => {
      this.tabContent.forEach((tab) => {
        tab.name = lanRes[tab.key];
      });
    });
  }

  ngOnInit(): void {
    this.api.getDataWithToken('setting').subscribe(
      (success: any) => {
        if (success.success) {
          success.data.forEach((element) => {
            if (element.key_name == 'currency_symbol') {
              this.currency_symbol = element.value;
            }
          });
        }
      },
      (err) => {}
    );

    this.isLoading = true;
    this.api.sub.subscribe((d) => {
      this.api.getDataWithToken('subscription').subscribe(
        (success: any) => {
          if (success.success) {
            this.subscriptionDetails = success.data;
          }
        },
        (err) => {
          this.isLoading = false;
        }
      );
      this.api.getDataWithToken('buyer-subscription').subscribe(
        (success: any) => {
          if (success.success) {
            this.buyer_subscription = success.data;
          }
        },
        (err) => {
          this.isLoading = false;
        }
      );
    });
    this.api.getDataWithToken('active-subscription').subscribe(
      (success: any) => {
        this.isLoading = false;
        if (success.success) {
          let filter = success.data.filter((element) => {
            return element.owner ? element.owner.role === 1 : element;
          });
          this.activeSubscription = filter;
        }
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  getSubscriptionData() {}

  openEditSubModal(content, data, e) {
    e.stopPropagation();
    this.editActiveSubData = {
      id: data.id,
      on_shop_booking: data.on_shop_booking,
      online_booking: data.online_booking,
      expiry: moment(data.expiry).format('YYYY-MM-DD'),
      is_lifetime: data.is_lifetime == 1 ? true : false,
    };
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  viewOwnerDetail(content, data, e) {
    e.stopPropagation();
    this.activeSubOwnDetail = data;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  onChangePage(pageOfItems: Array<any>, page) {
    if (page == 'SubPlan') {
      this.pageOfSubPlan = pageOfItems;
    } else if (page == 'ActiveSub') {
      this.pageOfActiveSub = pageOfItems;
    } else if (page == 'BuyerSub') {
      this.pageOfBuyerSub = pageOfItems;
    } else if (page == 'Log') {
      this.pageOfLog = pageOfItems;
    }
  }
  open(content, type) {
    this.modalService
      .open(content, {
        size: 'lg',
        scrollable: true,
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {
          if (type) {
            this.data.desc = this.listData;
            this.isLoading = true;

            this.api.postDataWithToken('subscription', this.data).subscribe(
              (success: any) => {
                if (success.success) {
                  this.toast.success('Subscription Added Successfully');
                  this.listData = [
                    {
                      id: 1,
                      header: '',
                      description: '',
                    },
                  ];
                  this.isLoading = false;
                  this.api.sub.next(true);
                }
              },
              (err) => {
                this.err = err.error.errors;

                this.isLoading = false;
                this.toast.error('Something Went Wrong');
              }
            );
          }
        },
        (reason) => {
          this.isLoading = false;
          this.ngOnInit();
          this.listData = [{ id: 1, header: '', description: '' }];
        }
      );
  }

  open2(content, i) {
    this.data2 = i;
    console.log('this data2', this.data2);
    if (this.data2.desc) {
      console.log('type', typeof this.data2.desc);
      if (typeof this.data2.desc === 'string') {
        this.listData = JSON.parse(this.data2.desc);
      } else {
        this.listData = this.data2.desc;
      }
    }

    this.modalService
      .open(content, {
        size: 'lg',
        scrollable: true,
        ariaLabelledBy: 'modal-update-title',
      })
      .result.then(
        (result) => {
          this.data2.desc = this.listData;
          console.log('after request', this.data2);
          this.isLoading = true;

          let status;
          this.data2.status == true ? 1 : 0;

          this.api
            .putDataWithToken('subscription/' + i.id, this.data2)
            .subscribe(
              (success: any) => {
                if (success.success) {
                  this.toast.success('Updated Successfully');
                  this.api.sub.next(true);
                  this.data2 = {};
                  this.listData = [{ id: 1, header: '', description: '' }];
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
          this.listData = [{ id: 1, header: '', description: '' }];
        }
      );
  }

  open3(content, item, type, e?) {
    if (e) {
      e.target.closest('datatable-body-cell').blur();
    }

    if (type == false && item.used == 1) {
      this.toast.error('Subscription Code Not Deleted Because Code is used.');
      return true;
    }
    this.deleteItem = item;
    this.modalService
      .open(content, { size: 'lg', ariaLabelledBy: 'modal-update-title' })
      .result.then(
        (result) => {
          if (type) {
            this.api.deleteDataWithToken('subscription/' + item.id).subscribe(
              (success: any) => {
                if (success.success) {
                  this.toast.success('Subscription Deleted Successfully');
                  this.api.sub.next(true);
                  this.deleteItem = {};
                }
              },
              (err) => {
                this.deleteItem = {};
              }
            );
          }
        },
        (reason) => {
          this.ngOnInit();
          this.deleteItem = {};
        }
      );
  }

  remove(i) {
    this.api.deleteDataWithToken('subscription/' + i.id).subscribe(
      (success: any) => {
        if (success.success) {
          this.toast.success('Subscription Deleted Successfully');
          this.api.sub.next(true);
        }
      },
      (err) => {}
    );
  }

  tabChange(event) {
    this.activeTab = event;
  }

  searchSubCode(searchTerm) {
    this.subscriptionCodeData = this.backupData.subscriptionCodeData;
    if (
      searchTerm &&
      searchTerm.replace(/\s/g, '').length > 0 &&
      searchTerm != null
    ) {
      this.subscriptionCodeData = this.subscriptionCodeData.filter(
        (subData) => {
          return (
            subData?.code?.toLowerCase().indexOf(searchTerm.toLowerCase()) >
              -1 ||
            subData?.owner?.email
              ?.toLowerCase()
              .indexOf(searchTerm.toLowerCase()) > -1 ||
            moment(subData?.created_at)
              .format('MMM DD,YYYY')
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) > -1
          );
        }
      );
    }
  }

  saveEditSubscription(modal) {
    const data = {
      on_shop_booking:
        this.editActiveSubData.is_lifetime == false
          ? this.editActiveSubData.on_shop_booking
          : -1,
      online_booking:
        this.editActiveSubData.is_lifetime == false
          ? this.editActiveSubData.online_booking
          : -1,
      expiry: moment(this.editActiveSubData.expiry).format('YYYY-MM-DD'),
      is_lifetime: this.editActiveSubData.is_lifetime == true ? 1 : 0,
    };
    this.api
      .postDataWithToken('active-sub-update/' + this.editActiveSubData.id, data)
      .subscribe(
        (res: any) => {
          if (res.success) {
            modal.close();
            this.editActiveSubData = {};
            this.ngOnInit();
          }
        },
        (err) => {}
      );
  }

  addSubscriptionCode(modal) {
    if (this.isEditSub) {
      let data = Object.assign({}, this.addSubData);
      this.isLoading = true;
      this.api
        .putDataWithToken('subscription-code/' + data.id, { code: data.code })
        .subscribe(
          (res: any) => {
            this.isLoading = false;
            if (res.success) {
              modal.close();
              this.ngOnInit();
              this.toast.success('Subscription Code Update Successfully');
              this.addSubData = {};
              this.err = '';
            }
          },
          (err) => {
            this.isLoading = false;

            if (err.status == 422) {
              this.err = err.error.errors;
            }
          }
        );
    } else {
      const fd = new FormData();
      fd.append('code', this.addSubData.code);
      this.isLoading = true;
      this.api.postDataWithToken('subscription-code', fd).subscribe(
        (res: any) => {
          this.isLoading = false;
          if (res.success) {
            modal.close();
            this.ngOnInit();
            this.toast.success('Subscription Code Added Successfully');
            this.addSubData = {};
            this.err = '';
          }
        },
        (err) => {
          this.isLoading = false;

          if (err.status == 422) {
            this.err = err.error.errors;
          }
        }
      );
    }
  }

  editSubCode(content, item, e) {
    e.target.closest('datatable-body-cell').blur();

    if (item.used == 1) {
      this.toast.error('Subscription Code Not Update Because Code is used.');
      return true;
    }
    this.isEditSub = true;
    this.addSubData = Object.assign({}, item);
    this.modalService
      .open(content, { size: 'lg', ariaLabelledBy: 'modal-update-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  deleteSubscriptionCode(modal) {
    this.api
      .deleteDataWithToken('subscription-code/' + this.deleteItem.id)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.toast.success('Subscription Code Deleted Successfully');
            modal.close();
            this.ngOnInit();
          }
        },
        (err) => {}
      );
  }
  addSection() {
    this.listData.push({
      id: this.listData.length + 1,
      header: '',
      description: '',
    });
  }
}
