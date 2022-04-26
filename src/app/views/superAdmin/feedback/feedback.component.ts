import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.scss"],
})
export class FeedbackComponent implements OnInit {
  data: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getDataWithToken("feedback").subscribe(
      (success: any) => {
        if (success.success) {
          this.data = success.data;
        }
      },
      (err) => {}
    );
  }
}
