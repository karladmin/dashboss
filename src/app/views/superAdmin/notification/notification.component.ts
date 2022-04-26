import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  ownerEmailText: any;
  ownerPushText: any;
  newAppoinOwner: any;
  notiData: any;
  passwordLoading: boolean = false;
  id: any;
  isLoading: any = false;
  tags: any;
  activeTab = 0;
  htmlContent: any = '';
  tabContent = [
    {
      name: 'All',
      active: true,
    },
  ];

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '10rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],

    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private tra: TranslateService
  ) {
    this.tra.setDefaultLang('en');
    this.tags = [
      {
        label: 'staff_name',
      },
      {
        label: 'client_name',
      },
      {
        label: 'date',
      },
      {
        label: 'owner_name',
      },
      {
        label: 'expiry_date',
      },
      {
        label: 'subscription_name',
      },
      {
        label: 'subscription_price',
      },
      {
        label: 'branch_name',
      },
      {
        label: 'date_time',
      },
      {
        label: 'otp',
      },
      {
        label: 'name',
      },
    ];
  }

  ngOnInit(): void {
    this.getNoti();
  }

  getNoti() {
    this.isLoading = true;
    this.api.getDataWithToken('noti-template').subscribe(
      (success: any) => {
        if (success.success) {
          this.notiData = success.data;
          this.isLoading = false;
          success.data.forEach((element) => {});
        }
      },
      (err) => {}
    );
  }

  saveOwner(e) {
    this.isLoading = true;
    this.id = e;
    let data = {
      email_text: e.email_text,
      noti_text: e.noti_text,
    };
    this.passwordLoading = true;
    this.api.postDataWithToken('noti-template/' + e.id, data).subscribe(
      (success: any) => {
        if (success.success) {
          this.passwordLoading = false;
          this.toast.success('Updated Successfully');
          this.isLoading = false;
        }
      },
      (err) => {
        this.toast.error('Something Went Wrong');
        this.isLoading = false;
      }
    );
  }

  tabChange(event) {
    this.activeTab = event;
  }

  testEmailTeplate(data) {
    if (data.email) {
      const fd = new FormData();
      fd.append('email', data.email);
      fd.append('type', data.id);
      data.loading = true;
      this.api.postDataWithToken('sendDummyEmail', fd).subscribe(
        (res: any) => {
          data.loading = false;
          if (res.success) {
            this.toast.success(res.msg);
            delete data.email;
          } else {
            this.toast.error(res.msg);
          }
        },
        (err) => {
          data.loading = false;
        }
      );
    } else {
      this.toast.error('Email Address Required');
    }
  }
}
