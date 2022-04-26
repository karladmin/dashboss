import { TranslateService } from '@ngx-translate/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import htmlToPdfmake from 'html-to-pdfmake';
import * as moment from 'moment';
@Component({
  selector: 'app-owner-product-report',
  templateUrl: './owner-product-report.component.html',
  styleUrls: ['./owner-product-report.component.scss'],
})
export class OwnerProductReportComponent implements OnInit {
  start_date: any;
  end_date: any;
  data: any;
  id: any;
  owner: any;
  products: any;
  loading: any = false;
  isLoading: any = false;
  activeTab = 0;
  tabContent = [
    {
      name: 'Appointments',
      key: 'appointments',
      active: true,
    },
    {
      name: 'Products',
      key: 'products',
      active: false,
    },
  ];
  @ViewChild('dataa', { static: false }) content: ElementRef;
  @ViewChild('productData', { static: false }) content2: ElementRef;
  constructor(private api: ApiService, private translate: TranslateService) {
    this.start_date = moment().startOf('week').format('YYYY-MM-DD');
    this.end_date = moment().endOf('week').format('YYYY-MM-DD');
    this.translate.get('ownerReport').subscribe((lanRes) => {
      this.tabContent.forEach((tabMen) => {
        tabMen.name = lanRes[tabMen.key];
      });
    });
  }

  ngOnInit(): void {
    this.api.getDataWithToken('owner').subscribe(
      (res: any) => {
        this.owner = res.data;
        this.id = this.owner[0].id;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );

    this.start_date = moment().startOf('week').format('YYYY-MM-DD');
    this.end_date = moment().endOf('week').format('YYYY-MM-DD');

    this.saveOwner();
  }

  saveOwner(e?) {
    if (e) {
      this.loading = true;
    }
    this.isLoading = true;
    let data = {
      start_date: this.start_date,
      end_date: this.end_date,
      oid: this.id,
    };
    this.api.postDataWithToken('report/owner-detail', data).subscribe(
      (success: any) => {
        if (success.success) {
          this.data = success.data.appointment;
          this.products = success.data.product;
          this.isLoading = false;
          if (e) {
            this.loading = false;
          }
        }
      },
      (err) => {
        if (e) {
          this.loading = false;
        }
        this.isLoading = false;
      }
    );
  }
  exportEXCEL() {
    if (this.activeTab == 0) {
      this.api.exportExcelFile(
        this.content.nativeElement,
        'Owner Sales Report'
      );
    } else {
      this.api.exportExcelFile(
        this.content2.nativeElement,
        'Owner Product Report'
      );
    }
  }
  exportCSV() {
    if (this.activeTab == 0) {
      let columnNames = [
        'Owner',
        'Start Time',
        'Service',
        'Staff',
        'Total Price',
        'Duration',
      ];
      let header = columnNames.join(',');

      let csv = header;
      csv += '\r\n';

      this.data.map((c) => {
        csv += [
          c['master.customer.first_name'],
          c['start_time'],
          c['service.name'],
          c['staff.name'],
          c['total'],
          c['duration'],
        ].join(',');
        csv += '\r\n';
      });

      this.api.exportCsvFile(csv, 'Owner Sales Report');
    } else {
      let columnNames = ['Order No', 'Branch', 'Price'];
      let header = columnNames.join(',');

      let csv = header;
      csv += '\r\n';

      this.products.map((c) => {
        csv += [c['order_no'], c['branch.name'], c['total']].join(',');
        csv += '\r\n';
      });

      this.api.exportCsvFile(csv, 'Owner Product Report');
    }
  }
  exportPDF() {
    if (this.activeTab == 0) {
      const pdfTable = this.content2.nativeElement;
      var html = htmlToPdfmake(pdfTable.innerHTML);
      this.api.exportPdfFile(html, 'Owner Sales Report');
    } else {
      const pdfTable = this.content2.nativeElement;
      var html = htmlToPdfmake(pdfTable.innerHTML);
      this.api.exportPdfFile(html, 'Owner Product Report');
    }
  }

  tabChange(event, r) {
    this.activeTab = event;
    this.tabContent.forEach((x) => {
      x.active = false;
    });
    r.active = true;
  }
}
