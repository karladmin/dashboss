import { NgxEchartsModule } from "ngx-echarts";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SuperAdminRoutingModule } from "./super-admin-routing.module";
import { SettingComponent } from "./setting/setting.component";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { SharedComponentsModule } from "src/app/shared/components/shared-components.module";
import { AppUserComponent } from "./app-user/app-user.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StaffComponent } from "./staff/staff.component";
import { SubscriptionComponent } from "./subscription/subscription.component";
import { OwnerDetailComponent } from "./owner-detail/owner-detail.component";
import { SalonOwnerComponent } from "./salon-owner/salon-owner.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedPipesModule } from "src/app/shared/pipes/shared-pipes.module";
import { BusinessTypeComponent } from "./business-type/business-type.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { NotificationComponent } from "./notification/notification.component";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { ImageComponent } from "./image/image.component";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { FaqComponent } from "./faq/faq.component";
import { LanComponent } from "./lan/lan.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NoDataComponent } from "./no-data/no-data.component";
import { ReportComponent } from "./report/report.component";
import { SubscriptionReportComponent } from "./subscription-report/subscription-report.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { UserReportComponent } from "./user-report/user-report.component";
import { OwnerReportComponent } from "./owner-report/owner-report.component";
import { UserProductReportComponent } from "./user-product-report/user-product-report.component";
import { OwnerProductReportComponent } from "./owner-product-report/owner-product-report.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { SubscriptionCodeComponent } from "./subscription-code/subscription-code.component";
@NgModule({
  declarations: [
    SettingComponent,
    AppUserComponent,
    StaffComponent,
    SubscriptionComponent,
    OwnerDetailComponent,
    SalonOwnerComponent,
    AnalyticsComponent,
    BusinessTypeComponent,
    ProfileEditComponent,
    NotificationComponent,
    ImageComponent,
    FaqComponent,
    LanComponent,
    NoDataComponent,
    ReportComponent,
    SubscriptionReportComponent,
    UserReportComponent,
    OwnerReportComponent,
    UserProductReportComponent,
    OwnerProductReportComponent,
    FeedbackComponent,
    SubscriptionCodeComponent,
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SuperAdminRoutingModule,
    SharedPipesModule,
    HttpClientModule,
    AngularEditorModule,
    NgxSkeletonLoaderModule,
    NgxDatatableModule,
    TranslateModule,
    Ng2SearchPipeModule,
  ],
})
export class SuperAdminModule {}
