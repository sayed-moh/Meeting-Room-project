import { Component, OnInit, ViewChild } from '@angular/core';
 
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from '../shared/shared-service.service';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports:[SidebarModule,ButtonModule,AvatarModule],
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  data: boolean=false;
  subscription!:Subscription
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
 
 
  constructor(private sharedService: SharedServiceService ,private router:Router) {}
  ngOnInit(){
    
    this.data=false;
    this.subscription=this.sharedService.dataSource.subscribe(value => this.data = value);
    console.log(this.data);
  }
 
  goToEvents()
  {
    this.data=false;
    this.router.navigate(["/events"]);
    
    
  }
}