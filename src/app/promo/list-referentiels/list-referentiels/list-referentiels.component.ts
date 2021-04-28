import { Component, OnInit } from '@angular/core';
import { PromoService, Referentiel } from 'src/app/service/promo/promo.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

@Component({
  selector: 'app-list-referentiels',
  templateUrl: './list-referentiels.component.html',
  styleUrls: ['./list-referentiels.component.css']
})
export class ListReferentielsComponent implements OnInit {

  selectedFileBLOB:any;
  pdfSrc:any;
  referentiels:Referentiel[]=[];
  constructor(private promoservice:PromoService,
    private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.getReferentiels();
  }

  display_programme(programme:any){
    this.pdfSrc=this._base64ToArrayBuffer(programme);
    this.selectedFileBLOB = this._base64ToArrayBuffer(programme);
  }

  _base64ToArrayBuffer(base64:any) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

transform(programme:any){
    console.log(programme);

    let pro=  this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,'+programme);
    console.log(pro);
    this.selectedFileBLOB=pro;
    const pdfDocGenerator = pdfMake.createPdf(pro);

var objbuilder = '';
objbuilder += ('<object width="100%" height="100%" data="data:application/pdf;base64,');
objbuilder += (programme);
objbuilder += ('" type="application/pdf" class="internal">');
objbuilder += ('<embed src="data:application/pdf;base64,');
objbuilder += (programme);
objbuilder += ('" type="application/pdf"  />');
objbuilder += ('</object>');

var win = window.open("#","_blank");
var title = "my tab title";
win?.document.write('<html><title>'+ title +'</title><body style="margin-top: 0px; margin-left: 0px; margin-right: 0px; margin-bottom: 0px;">');
win?.document.write(objbuilder);
win?.document.write('</body></html>');
}

  
  open_programme(programme:any){
    //window.open(this.transform(programme));
  }

  getReferentiels(){
      this.promoservice.getReferentiels()
        .subscribe(data=>
          {
            this.referentiels=data;
            console.log(this.referentiels[1].programme)
          },
          error=>{
            console.log(error);
          })
  }

}
