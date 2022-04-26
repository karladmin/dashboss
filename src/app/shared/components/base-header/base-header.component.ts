import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { NavigationService } from "../../services/navigation.service";

@Component({
  selector: "app-base-header",
  templateUrl: "./base-header.component.html",
  styleUrls: ["./base-header.component.scss"],
})
export class BaseHeaderComponent implements OnInit {
  @Input("headerText") headerText: string;
  @Input("isTab") isTab: boolean = false;
  @Input("tabContent") tabContent: Array<any> = [];
  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();
  profileData: any;
  constructor(
    private navService: NavigationService,
    private api: ApiService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      console.log("tabContent", this.tabContent);
      console.log("headerText", this.headerText);
      console.log("isTab", this.isTab);
    }, 2000);
    this.getData();
  }
  onTabChange(index, item) {
    this.tabContent.forEach((x) => {
      x.active = false;
    });
    item.active = true;
    this.change.emit(index);
  }

  toggelSidebar() {
    const state = this.navService.sidebarState;

    // item has no child items
    state.sidenavOpen = !state.sidenavOpen;

    this.navService.MsidebarState.next(state.sidenavOpen);
  }

  getData() {
    this.api.isNewLogin.subscribe((d) => {
      this.api.getDataWithToken("profile").subscribe(
        (success: any) => {
          if (success.success) {
            this.profileData = success.data;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  signOut() {
    this.auth.signout();
  }
}
