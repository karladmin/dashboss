import { environment } from "./../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
// import * as xlsx from "xlsx";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare let XLSX: any;
declare var pdfMake: any;

@Injectable({
  providedIn: "root",
})
export class ApiService {
  baseUrl: any = environment.apiBaseUrl;
  userToken: any;
  sub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  changeProfile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isNewLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  changeLan: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  errData: any;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    }
  }

  getData(url) {
    return this.http.get(this.baseUrl + url);
  }

  postData(url, data) {
    return this.http.post(this.baseUrl + url, data);
  }

  getDataWithToken(url) {
    let header = new HttpHeaders();
    header = header.set("Authorization", "Bearer " + this.userToken);
    header = header.set("Accept", "application/json");
    return this.http.get(this.baseUrl + url, { headers: header });
  }

  postDataWithToken(url, data) {
    let header = new HttpHeaders();
    header = header.set("Authorization", "Bearer " + this.userToken);
    header = header.set("Accept", "application/json");
    return this.http.post(this.baseUrl + url, data, { headers: header });
  }

  putDataWithToken(url, data) {
    let header = new HttpHeaders();
    header = header.set("Authorization", "Bearer " + this.userToken);
    header = header.set("Accept", "application/json");
    return this.http.put(this.baseUrl + url, data, { headers: header });
  }

  deleteDataWithToken(url) {
    let header = new HttpHeaders();
    header = header.set("Authorization", "Bearer " + this.userToken);
    header = header.set("Accept", "application/json");
    return this.http.delete(this.baseUrl + url, { headers: header });
  }

  exportExcelFile(content, fileName) {
    const ws = XLSX.utils.table_to_sheet(content);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName + ".xlsx");
  }
  exportCsvFile(csv, fileName) {
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName + ".csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  exportPdfFile(source, fileName) {
    const documentDefinition = { content: source };
    pdfMake.createPdf(documentDefinition).download(fileName);
  }
}
