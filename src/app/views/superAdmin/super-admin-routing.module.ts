import { SalonOwnerComponent } from "./salon-owner/salon-owner.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SettingComponent } from "./setting/setting.component";
import { AppUserComponent } from "./app-user/app-user.component";
import { StaffComponent } from "./staff/staff.component";
import { SubscriptionComponent } from "./subscription/subscription.component";
import { OwnerDetailComponent } from "./owner-detail/owner-detail.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { BusinessTypeComponent } from "./business-type/business-type.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { NotificationComponent } from "./notification/notification.component";
import { ImageComponent } from "./image/image.component";
import { FaqComponent } from "./faq/faq.component";
import { LanComponent } from "./lan/lan.component";
import { ReportComponent } from "./report/report.component";
import { SubscriptionReportComponent } from "./subscription-report/subscription-report.component";
import { UserReportComponent } from "./user-report/user-report.component";
import { OwnerReportComponent } from "./owner-report/owner-report.component";
import { UserProductReportComponent } from "./user-product-report/user-product-report.component";
import { OwnerProductReportComponent } from "./owner-product-report/owner-product-report.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { SubscriptionCodeComponent } from "./subscription-code/subscription-code.component";
const routes: Routes = [
  {
    path: "setting",
    component: SettingComponent,
  },
  {
    path: "app-user",
    component: AppUserComponent,
  },
  {
    path: "staff",
    component: StaffComponent,
  },
  {
    path: "subscription",
    component: SubscriptionComponent,
  },
  {
    path: "salon-owner",
    component: SalonOwnerComponent,
  },
  {
    path: "owner/:id",
    component: OwnerDetailComponent,
  },
  {
    path: "analytics",
    component: AnalyticsComponent,
  },
  {
    path: "business-type",
    component: BusinessTypeComponent,
  },
  {
    path: "profile-edit",
    component: ProfileEditComponent,
  },
  {
    path: "notification",
    component: NotificationComponent,
  },
  {
    path: "image",
    component: ImageComponent,
  },
  {
    path: "faq",
    component: FaqComponent,
  },
  {
    path: "lan",
    component: LanComponent,
  },
  {
    path: "report",
    component: ReportComponent,
  },
  {
    path: "subscrip-report",
    component: SubscriptionReportComponent,
  },
  {
    path: "user-report",
    component: UserReportComponent,
  },
  {
    path: "owner-report",
    component: OwnerReportComponent,
  },
  {
    path: "user-product-report",
    component: UserProductReportComponent,
  },
  {
    path: "owner-product-report",
    component: OwnerProductReportComponent,
  },
  {
    path: "feedback",
    component: FeedbackComponent,
  },
  {
    path: "subscription-code",
    component: SubscriptionCodeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
