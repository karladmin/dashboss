import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { ApiService } from "src/app/shared/services/api.service";

import htmlToPdfmake from "html-to-pdfmake";
import * as moment from "moment";
@Component({
  selector: "app-subscription-report",
  templateUrl: "./subscription-report.component.html",
  styleUrls: ["./subscription-report.component.scss"],
})
export class SubscriptionReportComponent implements OnInit {
  start_date: any;
  end_date: any;

  isLoading: any = false;
  data: any;
  @ViewChild("users", { static: false }) content: ElementRef;
  constructor(private api: ApiService) {}
  @ViewChild("subscription", { static: false }) orderContent: ElementRef;
  ngOnInit(): void {
    this.start_date = moment().startOf("week").format("YYYY-MM-DD");
    this.end_date = moment().endOf("week").format("YYYY-MM-DD");
    this.saveOwner();
  }
  loading: any = false;
  saveOwner(e?) {
    if (e) {
      this.loading = true;
    }
    this.isLoading = true;
    let data = {
      start_date: this.start_date,
      end_date: this.end_date,
    };
    this.api.postDataWithToken("report/subscription", data).subscribe(
      (success: any) => {
        if (success.success) {
          this.data = success.data;
          this.data.forEach((element) => {
            element.oname = element.owner.name;
            element.email = element.owner.email;
            element.subName = element.subscription.name;
            element.onShop = element.on_shop_booking;
            element.online = element.online_booking;
            element.ava = element.ava_day;
          });
          if (e) {
            this.loading = false;
          }
          this.isLoading = false;
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
    this.api.exportExcelFile(this.content.nativeElement, "Subscription Report");
  }
  exportCSV() {
    let columnNames = [
      "Owner Name",
      "Email",
      "Subscription",
      "Price",
      "On Shop Booking",
      "Online Booking",
      "Average Day",
    ];
    let header = columnNames.join(",");

    let csv = header;
    csv += "\r\n";

    this.data.map((c) => {
      csv += [
        c["oname"],
        c["email"],
        c["subName"],
        c["price"],
        c["onShop"],
        c["online"],
        c["ava"],
      ].join(",");
      csv += "\r\n";
    });

    this.api.exportCsvFile(csv, "Subscription Report");
  }
  exportPDF() {
    const pdfTable = this.content.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    this.api.exportPdfFile(html, "Subscription Report");
  }
}
