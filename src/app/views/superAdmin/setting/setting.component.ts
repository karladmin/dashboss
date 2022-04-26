import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TranslateService } from '@ngx-translate/core';
import { currency } from 'src/environments/environment';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  data: any;
  currency_code: any;
  currency_symbol: any;
  currency: any;
  text_logo: any;
  main_logo: any;
  ios_app: any;
  android_app: any;
  verification_vendor: any;
  verification_type: any;
  country_code: any;
  twillio_number: any;
  twillio_sid: any;
  twillio_auth: any;
  textlocalApi: any;
  sms_gateway: any;
  stripe: any;
  paypal: any;
  razor: any;
  stripe_secret: any;
  stripe_key: any;
  paypal_client_id: any;
  razor_pay_key: any;
  pushNotification: any;
  phone_no: any;
  email: any;
  address: any;
  free_on_shop_booking: any;
  free_online_booking: any;
  free_day: any;
  isLoading: any = false;
  text_uri: any;
  main_uri: any;
  files: any;
  url: string | ArrayBuffer;
  files2: any;
  MAIL_MAILER: any;
  MAIL_HOST: any;
  MAIL_PORT: any;
  MAIL_USERNAME: any;
  MAIL_PASSWORD: any;
  MAIL_ENCRYPTION: any;
  MAIL_FROM_ADDRESS: any;
  APP_NAME: any;
  verification_user: any;
  APP_ID: any;
  REST_API_KEY: any;
  USER_AUTH_KEY: any;
  currencyData: any = currency;
  TWILIO_SID: any;
  TWILIO_AUTH_TOKEN: any;
  TWILIO_NUMBER: any;
  image_compressor: any;
  feedBack: any;
  signInAdminVerify: boolean;
  timezone: any;
  zone: any;
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  updateSource(e) {
    var file = e.target.files[0];
    this.files = file;

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // read file as data url
    reader.onload = (event) => {
      this.text_uri = event.target.result;
    };
  }

  updateSource2(e) {
    var file = e.target.files[0];
    this.files2 = file;

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // read file as data url

    reader.onload = (event) => {
      // called once readAsDataURL is completed
      this.main_uri = event.target.result;
    };
  }
  ngOnInit(): void {
    this.isLoading = true;

    this.api.getDataWithToken('feedback').subscribe(
      (success: any) => {
        if (success.success) {
          this.feedBack = success.data;
        }
      },
      (err) => {}
    );

    this.api.getDataWithToken('setting').subscribe(
      (success: any) => {
        if (success.success) {
          this.data = success.data;
          this.APP_NAME = success.env.APP_NAME;
          this.MAIL_ENCRYPTION = success.env.MAIL_ENCRYPTION;
          this.MAIL_FROM_ADDRESS = success.env.MAIL_FROM_ADDRESS;
          this.MAIL_HOST = success.env.MAIL_HOST;
          this.MAIL_MAILER = success.env.MAIL_MAILER;
          this.MAIL_PASSWORD = success.env.MAIL_PASSWORD;
          this.MAIL_PORT = success.env.MAIL_PORT;
          this.MAIL_USERNAME = success.env.MAIL_USERNAME;
          this.TWILIO_SID = success.env.TWILIO_SID;
          this.zone = success.env.TIMEZONE;

          this.TWILIO_AUTH_TOKEN = success.env.TWILIO_AUTH_TOKEN;
          this.TWILIO_NUMBER = success.env.TWILIO_NUMBER;
          this.isLoading = false;
          this.data.forEach((element) => {
            if (element.key_name == 'currency_code') {
              this.currency_code = element.value;
            }
            if (element.key_name == 'currency_symbol') {
              this.currency_symbol = element.value;
            }
            if (element.key_name == 'text_logo') {
              this.text_uri = element.imageUri + element.value;

              this.text_logo = element.value;
            }
            if (element.key_name == 'main_logo') {
              this.main_uri = element.imageUri + element.value;

              this.main_logo = element.value;
            }
            if (element.key_name == 'image_compressor') {
              this.image_compressor = element.value;
            }
            if (element.key_name == 'ios_app') {
              this.ios_app = element.value;
            }
            if (element.key_name == 'android_app') {
              this.android_app = element.value;
            }
            if (element.key_name == 'verification_vendor') {
              this.verification_vendor = element.value == 1 ? true : false;
            }
            if (element.key_name == 'verification_type') {
              this.verification_type = element.value;
            }
            if (element.key_name == 'verification_user') {
              this.verification_user = element.value == 1 ? true : false;
            }
            if (element.key_name == 'country_code') {
              this.country_code = element.value;
            }
            if (element.key_name == 'twilio_number') {
              this.twillio_number = element.value;
            }
            if (element.key_name == 'twilio_sid') {
              this.twillio_sid = element.value;
            }
            if (element.key_name == 'twilio_auth') {
              this.twillio_auth = element.value;
            }
            if (element.key_name == 'text_local_api') {
              this.textlocalApi = element.value;
            }
            if (element.key_name == 'sms_getaway') {
              this.sms_gateway = element.value;
            }
            if (element.key_name == 'stripe') {
              this.stripe = element.value == 1 ? true : false;
            }
            if (element.key_name == 'paypal') {
              this.paypal = element.value == 1 ? true : false;
            }
            if (element.key_name == 'razorpay') {
              this.razor = element.value == 1 ? true : false;
            }
            if (element.key_name == 'stripe_secret') {
              this.stripe_secret = element.value;
            }
            if (element.key_name == 'stripe_key') {
              this.stripe_key = element.value;
            }
            if (element.key_name == 'paypal_client_id') {
              this.paypal_client_id = element.value;
            }
            if (element.key_name == 'razorpay_key') {
              this.razor_pay_key = element.value;
            }
            if (element.key_name == 'push_notification') {
              this.pushNotification = JSON.parse(element.value);
            }
            if (element.key_name == 'phone_no') {
              this.phone_no = element.value;
            }
            if (element.key_name == 'email') {
              this.email = element.value;
            }
            if (element.key_name == 'address') {
              this.address = element.value;
            }
            if (element.key_name == 'free_on_shop_booking') {
              this.free_on_shop_booking = element.value;
            }
            if (element.key_name == 'free_online_booking') {
              this.free_online_booking = element.value;
            }
            if (element.key_name == 'free_day') {
              this.free_day = element.value;
            }
            if (element.key_name == 'APP_ID') {
              this.APP_ID = element.value;
            }
            if (element.key_name == 'REST_API_KEY') {
              this.REST_API_KEY = element.value;
            }
            if (element.key_name == 'USER_AUTH_KEY') {
              this.USER_AUTH_KEY = element.value;
            }
            if (element.key_name == 'admin_two_factor') {
              this.signInAdminVerify = element.value == 0 ? false : true;
            }
          });

          console.log(
            this.currency_code,
            this.currency_symbol,
            this.paypal_client_id
          );

          this.currency = this.currency_code + this.currency_symbol;
          this.api.getDataWithToken('information-setting').subscribe(
            (success: any) => {
              if (success.success) {
                success.data.forEach((element) => {
                  if (element.key_name == 'privacy') {
                    this.privacy = element.value;
                  }
                  if (element.key_name == 'terms') {
                    this.terms = element.value;
                  }
                  if (element.key_name == 'about_us') {
                    this.about = element.value;
                  }
                });
                this.api.getDataWithToken('timezone').subscribe(
                  (res: any) => {
                    console.log('timezone', res);
                    if (res.success) {
                      this.timezone = res.data;
                    }
                  },
                  (err) => {}
                );
              }
            },
            (err) => {}
          );
        }
      },
      (err) => {}
    );
  }
  privacy: any;
  about: any;
  terms: any;
  passwordLoading: boolean = false;

  imageCompress() {
    let imageCompress: any;
    this.isLoading = true;
    this.passwordLoading = true;
    if (this.image_compressor == true) {
      imageCompress = 1;
    } else {
      imageCompress = 0;
    }

    let data = {
      image_compressor: imageCompress,
    };

    this.api.postDataWithToken('setting', data).subscribe(
      (success: any) => {
        if (success.success) {
          this.toast.success('Image Updated Successfully');
          this.isLoading = false;
          this.passwordLoading = false;
          this.loading = false;
        }
      },
      (err) => {
        this.passwordLoading = false;
        this.loading = false;
        this.isLoading = false;
      }
    );
  }

  saveOwner() {
    this.passwordLoading = true;
    this.isLoading = true;
    let data = {
      privacy: this.privacy,
      about_us: this.about,
      terms: this.terms,
    };
    this.api.postDataWithToken('setting', data).subscribe((success: any) => {
      if (success.success) {
        this.toast.success('Setting Updated Successfully');
        this.passwordLoading = false;
        this.isLoading = false;
      } else {
        this.toast.error('Something Went Wrong');
        this.passwordLoading = false;
        this.isLoading = false;
      }
    });
  }

  twilliio() {
    this.isLoading = true;
    const fd = new FormData();
    fd.append('TWILIO_SID', this.TWILIO_SID);
    fd.append('TWILIO_AUTH_TOKEN', this.TWILIO_AUTH_TOKEN);
    fd.append('TWILIO_NUMBER', this.TWILIO_NUMBER);
    this.api.postDataWithToken('setting', fd).subscribe(
      (success: any) => {
        if (success.success) {
          this.toast.success('Twillio Setting Updated Successfully');
          this.loading = true;
          this.isLoading = false;
          this.ngOnInit();
        }
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  changeCurency() {
    let data = this.currencyData.find((f) => {
      return f.code == this.currency_code;
    });
    this.currency_symbol = data.symbol;
  }
  pushNoti() {
    this.isLoading = true;
    const fd = new FormData();
    fd.append('APP_ID', this.APP_ID);
    fd.append('REST_API_KEY', this.REST_API_KEY);
    fd.append('USER_AUTH_KEY', this.USER_AUTH_KEY);
    this.api.postDataWithToken('setting', fd).subscribe(
      (success: any) => {
        if (success.success) {
          this.toast.success('Setting Updated Successfully');
          this.loading = true;
          this.isLoading = false;
          this.ngOnInit();
        }
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    width: '100%',

    toolbarHiddenButtons: [['bold']],
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
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
  };

  loading: any = false;
  basisc() {
    let check;
    this.isLoading = true;
    if (this.pushNotification == true) {
      check = 1;
    } else {
      check = 0;
    }
    let data = {
      currency_code: this.currency_code,
      text_logo: this.files ? this.text_uri : this.text_logo,
      main_logo: this.files2 ? this.main_uri : this.main_logo,
      push_notification: check,
    };
    const fd = new FormData();
    if (this.files != null) {
      fd.append('text_logo', this.files);
    }
    if (this.files2 != null) {
      fd.append('main_logo', this.files2);
    }

    fd.append('push_notificatio', check);
    fd.append('currency_code', this.currency_code);
    fd.append('currency_symbol', this.currency_symbol);
    fd.append('timezone', this.zone);
    this.api.postDataWithToken('setting', fd).subscribe(
      (success: any) => {
        if (success.success) {
          this.toast.success('Setting Updated Successfully');
          this.loading = true;
          this.isLoading = false;
          this.api.changeProfile.next(true);
          this.ngOnInit();
        }
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  versionUpdate() {
    this.isLoading = true;
    let data = {
      ios_app: this.ios_app,
      android_app: this.android_app,
    };
    this.api.postDataWithToken('setting', data).subscribe(
      (success: any) => {
        if (success.success) {
          this.toast.success('Version Updated Successfully');
          this.isLoading = false;
        }
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  updateBusiness() {
    this.isLoading = true;
    let data = {
      free_day: this.free_day,
      free_on_shop_booking: this.free_on_shop_booking,
      free_online_booking: this.free_online_booking,
    };
    this.api.postDataWithToken('setting', data).subscribe(
      (success: any) => {
        if (success.success) {
          this.toast.success('Business_Type Updated Successfully');
          this.isLoading = false;
        }
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  mailUpdate() {
    this.isLoading = true;
    let data = {
      APP_NAME: this.APP_NAME,
      MAIL_MAILER: this.MAIL_MAILER,
      MAIL_HOST: this.MAIL_HOST,
      MAIL_PORT: this.MAIL_PORT,
      MAIL_USERNAME: this.MAIL_USERNAME,
      MAIL_PASSWORD: this.MAIL_PASSWORD,
      MAIL_ENCRYPTION: this.MAIL_ENCRYPTION,
      MAIL_FROM_ADDRESS: this.MAIL_FROM_ADDRESS,
    };
    this.api.postDataWithToken('setting', data).subscribe(
      (success: any) => {
        if (success.success) {
          this.toast.success('Mail Settings Updated Successfully');
          this.isLoading = false;
        }
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  paymentGateway() {
    this.isLoading = true;
    let stripe;
    let paypal;
    let razor;
    if (this.stripe == false) {
      stripe = 0;
    } else {
      stripe = 1;
    }
    if (this.paypal == false) {
      paypal = 0;
    } else {
      paypal = 1;
    }
    if (this.razor == false) {
      razor = 0;
    } else {
      razor = 1;
    }
    let data = {
      razorpay_key: this.razor_pay_key,
      razorpay: razor,
      paypal_client_id: this.paypal_client_id,
      paypal: paypal,
      stripe_key: this.stripe_key,
      stripe_secret: this.stripe_secret,
      stripe: stripe,
    };
    this.api.postDataWithToken('setting', data).subscribe(
      (success: any) => {
        if (success.success) {
          this.toast.success('Payment_Setting Updated Successfully');
          this.isLoading = false;
        }
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  contactUpdate() {
    this.isLoading = true;
    let data = {
      phone_no: this.phone_no,
      email: this.email,
      address: this.address,
    };
    this.api.postDataWithToken('setting', data).subscribe(
      (success: any) => {
        if (success.success) {
          this.toast.success('Contact Updated Successfully');
          this.isLoading = false;
        }
      },
      (err) => {
        this.toast.error('Something went Wrong');
        this.isLoading = false;
      }
    );
  }

  verificationType() {
    let data = {
      verification_vendor: this.verification_vendor == true ? 1 : 0,
      verification_user: this.verification_user == true ? 1 : 0,
      verification_type: this.verification_type,
      admin_two_factor: this.signInAdminVerify == true ? 1 : 0,
    };
    this.isLoading = true;
    this.api.postDataWithToken('setting', data).subscribe(
      (success: any) => {
        if (success.success) {
          this.toast.success('Verification Setting Updated Successfully');
          this.isLoading = false;
        }
      },
      (err) => {
        this.toast.error('Something went Wrong');
        this.isLoading = false;
      }
    );
  }
}
