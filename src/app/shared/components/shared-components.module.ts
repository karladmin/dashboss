import { TranslateModule } from "@ngx-translate/core";
import { TablePaginateComponent } from "./table-paginate/table-paginate.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BtnLoadingComponent } from "./btn-loading/btn-loading.component";
import { FeatherIconComponent } from "./feather-icon/feather-icon.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { SharedPipesModule } from "../pipes/shared-pipes.module";
import { SharedDirectivesModule } from "../directives/shared-directives.module";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { LayoutsModule } from "./layouts/layouts.module";
import { BaseHeaderComponent } from "./base-header/base-header.component";
import { LoaderComponent } from "./loader/loader.component";

const components = [
  BtnLoadingComponent,
  BaseHeaderComponent,
  FeatherIconComponent,
  LoaderComponent,
  TablePaginateComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    PerfectScrollbarModule,
    NgbModule,
    TranslateModule,
  ],
  declarations: components,
  exports: components,
})
export class SharedComponentsModule {}
