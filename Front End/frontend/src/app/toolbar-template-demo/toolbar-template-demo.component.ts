import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import {  SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
    selector: 'toolbar-template-demo',
    templateUrl: './toolbar-template-demo.component.html',
    standalone: true,
    imports: [ToolbarModule,ButtonModule , AvatarModule, SharedModule]
})
export class ToolbarTemplateDemo {

  constructor(private route:ActivatedRoute,private router:Router){}

  onSignout(){
    this.router.navigate(['/signin'],{relativeTo:this.route})
  }
}