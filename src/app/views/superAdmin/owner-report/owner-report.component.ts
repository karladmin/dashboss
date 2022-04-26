import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "src/app/shared/services/api.service";

import htmlToPdfmake from "html-to-pdfmake";
import * as moment from "moment";
@Component({
  selector: "app-owner-report",
  templateUrl: "./owner-report.component.html",
  styleUrls: ["./owner-report.component.scss"],
})
export class OwnerReportComponent implements OnInit {
  start_date: any;
  end_date: any;
  data: any;
  isLoading: any = false;
  loading: any = false;
  @ViewChild("users", { static: false }) content: ElementRef;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.start_date = moment().startOf("week").format("YYYY-MM-DD");
    this.end_date = moment().endOf("week").format("YYYY-MM-DD");
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
    };
    this.api.postDataWithToken("report/owner", data).subscribe(
      (success: any) => {
        if (success.success) {
          this.data = success.data;
          this.data.forEach((element) => {
            element.date = moment(element.created_at).format("do-MMM-YYYY");
          });
          this.isLoading = false;
          if (e == "start") {
            this.loading = false;
          }
        }
      },
      (err) => {
        if (e == "start") {
          this.loading = false;
          this.isLoading = false;
        }
      }
    );
  }

  exportEXCEL() {
    this.api.exportExcelFile(this.content.nativeElement, "Owner Report");
  }

  exportCSV() {
    let columnNames = ["Email", "Name", "Created Date"];
    let header = columnNames.join(",");
    let csv = header;
    csv += "\r\n";
    this.data.map((c) => {
      csv += [c["email"], c["name"], c["date"]].join(",");
      csv += "\r\n";
    });
    this.api.exportCsvFile(csv, "Owner Report");
  }

  exportPDF() {
    const pdfTable = this.content.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);

    html[0].table.body.forEach((element) => {
      element.splice(1, 1);
    });
    this.api.exportPdfFile(html, "Owner Report");
  }
}
