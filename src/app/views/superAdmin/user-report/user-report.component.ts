import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

import htmlToPdfmake from 'html-to-pdfmake';
import * as moment from 'moment';
@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss'],
})
export class UserReportComponent implements OnInit {
  start_date: any;
  end_date: any;
  products$: any;
  data: any;
  @ViewChild('users', { static: false }) content: ElementRef;
  constructor(private api: ApiService) {
    this.start_date = moment().startOf('week').format('YYYY-MM-DD');
    this.end_date = moment().endOf('week').format('YYYY-MM-DD');
    this.saveOwner();
  }

  ngOnInit(): void {}
  loading: any = false;
  isLoading: any = false;
  saveOwner(e?) {
    if (e) {
      this.loading = true;
    }
    let data = {
      start_date: this.start_date,
      end_date: this.end_date,
    };
    this.isLoading = true;
    this.api.postDataWithToken('report/user', data).subscribe(
      (success: any) => {
        if (success.success) {
          this.data = success.data;
          this.data.forEach((element) => {
            element.date = moment(element.created_at).format('do-MMM-YYYY');
          });
          this.isLoading = false;
          if (e) {
            this.loading = false;
          }
        }
      },
      (err) => {
        this.isLoading = false;
        if (e) {
          this.loading = false;
        }
      }
    );
  }

  exportEXCEL() {
    this.api.exportExcelFile(this.content.nativeElement, 'User Report');
  }
  exportCSV() {
    let columnNames = ['Email', 'Name', 'Phone', 'Created Date'];
    let header = columnNames.join(',');

    let csv = header;
    csv += '\r\n';

    this.data.map((c) => {
      csv += [c['email'], c['name'], c['phone'], c['date']].join(',');
      csv += '\r\n';
    });

    this.api.exportCsvFile(csv, 'User Report');
  }
  exportPDF() {
    const pdfTable = this.content.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);

    html[0].table.body.forEach((element) => {
      element.splice(1, 1);
    });
    this.api.exportPdfFile(html, 'User Report');
  }
}
