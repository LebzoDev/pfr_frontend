import { Component, OnDestroy, OnInit } from '@angular/core';



import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { AuthServiceService } from '../../../auth-service.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { shareReplay, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { DataServiceService } from '../../../service/data-service.service';
import { User } from '../../../modele/user';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-details-apprenant',
  templateUrl: './details-apprenant.component.html',
  styleUrls: ['./details-apprenant.component.css']
})
export class DetailsApprenantComponent implements OnInit,OnDestroy {

  apprenant:User={};
  subscription: any;
  constructor(
    private authService:AuthServiceService,
    private breakpointObserver: BreakpointObserver,
    private router:Router,
    private data: DataServiceService) {}
isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit() {
    this.subscription = this.data.currentMessage.subscribe(apprenant => this.apprenant = apprenant)
    console.log(this.apprenant);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loggout(){
    this.authService.deconnected();
  }



  generatePdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake'};
    //const docDef = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open();
   }
  
   getDocumentDefinition() {
    //sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      content: [
        {
          text: 'RESUME',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: "this.resume.name",
              style: 'name'
            },
            {
              text: "this.resume.address"
            },
            {
              text: 'Email : ' + "this.resume.email",
            },
            {
              text: 'Contant No : ' + "this.resume.contactNo",
            },
            {
              text: 'GitHub: ' + "this.resume.socialProfile",
              link: "this.resume.socialProfile",
              color: 'blue',
            }
            ],
            [
              "this.getProfilePicObject()"
            ]
          ]
        },
        {
          text: 'Skills',
          style: 'header'
        },
        {
          columns : [
            {
              ul : [
               " ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)"
              ]
            },
            {
              ul : [
              "  ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)"
              ]
            },
            {
              ul : [
               " ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)"
              ]
            }
          ]
        },
        {
          text: 'Experience',
          style: 'header'
        },
        {
          education:'Education object 1'
        },
  
        {
          text: 'Education',
          style: 'header'
        },
        {
          education:'Education object 2'
        },
        {
          text: 'Other Details',
          style: 'header'
        },
        {
          text: "this.resume.otherDetails"
        },
        {
          text: 'Signature',
          style: 'sign'
        },
        {
          columns : [
              { qr: "this.resume.name" + ', Contact No : ' + "this.resume.contactNo", fit : 100 },
              {
              text: `(${"this.resume.name"})`,
              alignment: 'right',
              }
          ]
        }
      ],
      info: {
        title: "this.resume.name" + '_RESUME',
        author: "this.resume.name",
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          }
        }
    };
  }
  

}
