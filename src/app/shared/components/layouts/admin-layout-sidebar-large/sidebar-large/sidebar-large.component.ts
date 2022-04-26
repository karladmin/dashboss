import {
  Component,
  OnInit,
  HostListener,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  NavigationService,
  IMenuItem,
  IChildItem,
} from '../../../../services/navigation.service';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

import { filter } from 'rxjs/operators';
import { Utils } from '../../../../utils';
import { ApiService } from 'src/app/shared/services/api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar-large',
  templateUrl: './sidebar-large.component.html',
  styleUrls: ['./sidebar-large.component.scss'],
})
export class SidebarLargeComponent implements OnInit {
  selectedItem: IMenuItem;
  nav: IMenuItem[];
  isMenuOpen = true;
  @ViewChildren(PerfectScrollbarDirective)
  psContainers: QueryList<PerfectScrollbarDirective>;
  psContainerSecSidebar: PerfectScrollbarDirective;
  thisElementClicked: boolean = false;
  lan: string;
  image: any;

  constructor(
    public router: Router,
    public navService: NavigationService,
    private api: ApiService,
    private traslate: TranslateService
  ) {
    setTimeout(() => {
      this.psContainerSecSidebar = this.psContainers.toArray()[1];
    });
  }

  ngOnInit() {
    this.api.changeProfile.subscribe((d) => {
      this.api.getDataWithToken('setting').subscribe(
        (success: any) => {
          if (success.success) {
            success.data.forEach((element) => {
              if (element.key_name == 'main_logo') {
                this.image = element;
                console.log(this.image.imageUri);
              }
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });

    this.api.changeLan.subscribe((d) => {
      this.lan = localStorage.getItem('lan');
    });
    this.navService.sidebarState$.subscribe((res: boolean) => {
      console.log('res', res);
      this.isMenuOpen = res;
    });
    this.updateSidebar();
    // CLOSE SIDENAV ON ROUTE CHANGE
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((routeChange) => {
        this.closeChildNav();
        if (Utils.isMobile()) {
          this.navService.sidebarState.sidenavOpen = false;
        }
      });

    this.navService.menuItems$.subscribe((items) => {
      console.log('up long', this.nav);
      this.nav = items;
      this.api.changeLan.subscribe((d) => {
        console.log('center long', this.nav);

        this.traslate.get('defaultMenu').subscribe((d) => {
          this.nav.forEach((element) => {
            element.name = d[element.key];
          });
        });
      });
      console.log('bottom long', this.nav);
      this.setActiveFlag();
    });
  }

  selectItem(item) {
    this.navService.sidebarState.childnavOpen = true;
    this.navService.selectedItem = item;
    this.setActiveMainItem(item);

    // Scroll to top secondary sidebar
    setTimeout(() => {
      this.psContainerSecSidebar.update();
      this.psContainerSecSidebar.scrollToTop(0, 400);
    });
  }
  closeChildNav() {
    this.navService.sidebarState.childnavOpen = false;
    this.setActiveFlag();
  }

  onClickChangeActiveFlag(item) {
    this.setActiveMainItem(item);
  }
  setActiveMainItem(item) {
    this.nav.forEach((i) => {
      i.active = false;
    });
    item.active = true;
  }

  setActiveFlag() {
    if (window && window.location) {
      const activeRoute = window.location.hash || window.location.pathname;
      this.nav.forEach((item) => {
        item.active = false;
        if (activeRoute.indexOf(item.state) !== -1) {
          this.navService.selectedItem = item;
          item.active = true;
        }
      });
    }
  }

  updateSidebar() {
    this.isMenuOpen = !Utils.isMobile();
    console.log('Utils.isMobile()', Utils.isMobile());
    if (Utils.isMobile()) {
      this.navService.sidebarState.sidenavOpen = false;
      this.navService.sidebarState.childnavOpen = false;
    } else {
      this.navService.sidebarState.sidenavOpen = true;
    }
  }
  closeMenu() {
    this.navService.sidebarState.sidenavOpen = false;
    this.navService.MsidebarState.next(false);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateSidebar();
  }
  close(e) {
    console.log('e', e);
  }
}
