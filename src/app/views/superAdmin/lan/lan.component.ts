import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-lan',
  templateUrl: './lan.component.html',
  styleUrls: ['./lan.component.scss'],
})
export class LanComponent implements OnInit {
  lan: any;
  devices: any = ['English', 'Greek'];
  constructor(
    public store: LocalStoreService,
    private translate: TranslateService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.lan = localStorage.getItem('lan');
    if (localStorage.getItem('lan') == 'en') {
      this.lan = 'English';
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    } else {
      this.lan = 'Greek';
      this.translate.setDefaultLang('gr');
      this.translate.use('gr');
    }
  }

  onChange(deviceValue) {
    if (deviceValue == 'English') {
      this.store.setItem('lan', 'en');
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      this.api.changeLan.next(true);
    } else {
      this.store.setItem('lan', 'gr');
      this.translate.setDefaultLang('gr');
      this.translate.use('gr');
      this.api.changeLan.next(true);
    }
  }
}
