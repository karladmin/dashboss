import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.scss'],
})
export class OwnerDetailComponent implements OnInit {
  oid = '';
  selectedBranch: number;
  branchData: any = {};
  oData: any = {};
  serviceData = {
    package: [],
    service: [],
  };
  isLoading: any = false;
  currency_symbol: any;
  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getDataWithToken('setting').subscribe(
      (success: any) => {
        if (success.success) {
          this.isLoading = false;

          success.data.forEach((element) => {
            if (element.key_name == 'currency_symbol') {
              this.currency_symbol = element.value;
            }
          });
        }
      },
      (err) => {
        this.isLoading = false;
      }
    );
    this.oid = this.route.snapshot.paramMap.get('id');

    this.getOwnerData();
  }
  getOwnerData() {
    this.api.getDataWithToken(`owner/${this.oid}`).subscribe(
      (res: any) => {
        this.oData = res.data;

        if (this.oData.branch.length >= 0) {
          this.selectedBranch = this.oData.branch[0].id;
          this.changeBranch(this.oData.branch[0]);
        }
      },
      (err) => {}
    );
  }
  changeBranch(i) {
    /*   this.isLoading = true; */
    this.api.getDataWithToken(`owner/branch/${i.id}`).subscribe(
      (res: any) => {
        this.branchData = res.data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
  serviceSelect(service) {
    this.branchData.service.forEach((ele) => {
      ele.active = false;
    });
    service.active = true;
    this.serviceData.service = service.packages;
    this.serviceData.package = service.services;
  }
}
