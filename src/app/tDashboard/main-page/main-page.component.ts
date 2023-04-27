import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangServiceService } from 'src/app/service/lang-service.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { environment } from 'src/environments/environment';

declare const owlScroller:any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  defaultLang:any;
  browserLang:any;
  noOfSchool:any;
  noOfStaff:any;

  loginUrlCommon = environment.LOGIN_URL_COMMON;

  loginUrlCommonLocal1 = environment.LOGIN_URL_COMMON_LOCAL1;
  loginUrlCommonLocal2 = environment.LOGIN_URL_COMMON_LOCAL2;

  constructor( private langSer: LangServiceService,
    public translate: TranslateService,
    private ser: OutsideServicesService
    ) {

    this.langSer.selectedLang.subscribe(res=>{
      
      this.defaultLang = res;
    })

    translate.addLangs(['hn','en']);
    translate.setDefaultLang('en');
    translate.use('en');
    this.browserLang = translate.getDefaultLang();
    this.languageChanged();    
    this.langSer.selectedLang.next(this.browserLang);
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|hn/)? browserLang:'en');

   }

  ngOnInit(): void {
    // alert("in")
    owlScroller();
    this.ser.getMainDashboard().subscribe((res)=>{
      this.noOfSchool = res.response.rowValue[0].no_of_school;
      this.noOfStaff = res.response.rowValue[0].no_of_staff;
    })
  }

  selectedLang(lang){
    this.langSer.selectedLang.next(lang)
    this.translate.use(lang);
    // this.defaultLang = lang;
    

  }

  languageChanged(){
    this.translate.use(this.browserLang.match(/en|hn/)? this.browserLang :'en')
  }
}
