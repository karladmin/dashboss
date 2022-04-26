import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface IMenuItem {
  id?: string;
  title?: string;

  name?: string;
  state?: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
  key?: string;
}
export interface IChildItem {
  id?: string;
  parentId?: string;
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
  active?: boolean;
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

interface ISidebarState {
  sidenavOpen?: boolean;
  childnavOpen?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  public sidebarState: ISidebarState = {
    sidenavOpen: true,
    childnavOpen: false,
  };
  selectedItem: IMenuItem;

  constructor() {}

  defaultMenu: IMenuItem[] = [
    {
      name: "Dashboard",
      icon: "dashboard.png",
      state: "/dashboard/v1",
      key: "Dashboard",
    },
    {
      name: "Subscription",
      icon: "subscription.png",
      state: "/super-admin/subscription",
      key: "Subscription",
    },
    {
      name: "Salon Owner",
      icon: "customer.png",
      state: "/super-admin/salon-owner",
      key: "Salon Owner",
    },
    {
      name: "Staff",
      icon: "staff.png",
      state: "/super-admin/staff",
      key: "Staff",
    },
    {
      name: "App User",
      icon: "inventory.png",
      state: "/super-admin/app-user",
      key: "App User",
    },
    {
      name: "Business Type",
      icon: "port.png",
      state: "/super-admin/business-type",
      key: "Business Type",
    },
    {
      name: "Slider",
      icon: "gallery.png",
      state: "/super-admin/image",
      key: "Slider",
    },
    {
      name: "Analytics",
      key: "Analytics",
      icon: "analytics.png",
      state: "/super-admin/analytics",
    },
    {
      name: "Notification",
      icon: "bell.png",
      state: "/super-admin/notification",
      key: "Notification",
    },
    {
      name: "Faq",
      icon: "information.png",
      state: "/super-admin/faq",
      key: "Faq",
    },
    {
      name: "Report",
      icon: "report.png",
      state: "/super-admin/report",
      key: "Report",
    },
    {
      name: "Language",
      icon: "language.png",
      state: "/super-admin/lan",
      key: "Language",
    },
    {
      name: "Feedback",
      icon: "feedback.png",
      state: "/super-admin/feedback",
      key: "Feedback",
    },
    {
      name: "Settings",
      icon: "setting.png",
      state: "/super-admin/setting",
      key: "Settings",
    },
  ];

  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
  public MsidebarState = new BehaviorSubject<Boolean>(true);
  // navigation component has subscribed to this Observable
  public sidebarState$ = this.MsidebarState.asObservable();

  // You can customize this method to supply different menu for
  // different user type.
  // publishNavigationChange(menuType: string) {
  //   switch (userType) {
  //     case 'admin':
  //       this.menuItems.next(this.adminMenu);
  //       break;
  //     case 'user':
  //       this.menuItems.next(this.userMenu);
  //       break;
  //     default:
  //       this.menuItems.next(this.defaultMenu);
  //   }
  // }
}
