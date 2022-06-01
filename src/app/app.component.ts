import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStoreService } from './shared/services/local-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bootDash';
  constructor(
    public translate: TranslateService,
    private store: LocalStoreService,
    private api: ApiService,
    private router: Router
  ) {
    this.logOut();
    console.log = function () {};
    if (localStorage.getItem('lan')) {
      if (localStorage.getItem('lan') == 'en') {
        this.translate.setDefaultLang(store.getItem('lan'));

        this.translate.use('en');
      } else {
        this.translate.setDefaultLang(store.getItem('lan'));

        this.translate.use('gr');
      }
    } else {
      this.store.setItem('lan', 'en');
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }
    this.checkProfileData();
  }

  logOut(){
   
    if(localStorage.getItem('demo_login_status')=='false') {
      // console.info(localStorage.getItem('demo_login_status'));
      this.router.navigateByUrl('/sessions/signin');
      return false;  
      
  }
}


  checkProfileData() {
    this.api.getDataWithToken('profile').subscribe(
      (success: any) => {
        if (success.success) {
        }
      },
      (err) => {
        console.log(err);
        if (
          err.status == 401 &&
          this.router.url != '/sessions/signup' &&
          this.router.url != ' /sessions/forgot'
        ) {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/sessions/signin');
        }
      }
    );
  }
}
