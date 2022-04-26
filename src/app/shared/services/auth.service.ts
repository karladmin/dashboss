import { Injectable } from "@angular/core";
import { LocalStoreService } from "./local-store.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  //Only for demo purpose
  authenticated = true;
  errData: any;

  constructor(private store: LocalStoreService, private router: Router,private api:ApiService) {
    this.checkAuth();
  }

  checkAuth() {
    // this.authenticated = this.store.getItem("demo_login_status");
  }

  getuser() {
    return of({});
  }

  signin(credentials) {
    console.log(credentials);  
    this.api.postData("sign-in",{email:credentials.email,password:credentials.password}).subscribe((success:any) =>{
      if(success.success){
        this.authenticated = true;
        this.api.userToken=success.data.token;
        this.store.setItem("token",success.data.token)
        this.api.isNewLogin.next(true);
      }
    },err =>{
      if(err.status == 422){
        this.errData = err.error.errors;
        this.api.errData = this.errData
        console.log(this.errData);        
        this.authenticated = false;
      }
    })
    this.store.setItem("demo_login_status", true);
    return of({}).pipe(delay(1500));
  }

  signout() {
    this.authenticated = false;
    this.store.setItem("demo_login_status", false);
    this.router.navigateByUrl("/sessions/signin");
  }
}
