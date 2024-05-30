import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SigninComponent } from './authenticate/signin/signin.component';
import { SignupComponent } from './authenticate/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { CalenderGridComponent } from './calender/calender-grid/calender-grid.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OverlayPanelBasicDemo } from './calender/popup/popup.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { EventService } from './shared/eventService';
import { DialogBasicDemo } from './calender/editpopup/editpopup.component';
import { ToolbarTemplateDemo } from './toolbar-template-demo/toolbar-template-demo.component';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedModule } from 'primeng/api/shared';
import { AddeventComponent } from './calender/addevent/addevent.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedServiceService } from './shared/shared-service.service';
import { MyeventsComponent } from './myevents/myevents.component';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    CalenderGridComponent,
    
    

   
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,DropdownComponent,FormsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FullCalendarModule,
    OverlayPanelBasicDemo,
    OverlayPanelModule,
    InputTextModule,
    DialogBasicDemo,
    ToolbarTemplateDemo,
    AddeventComponent,
    SidebarComponent,
    MyeventsComponent,

    
  ],
  providers: [EventService,OverlayPanelBasicDemo,SharedServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
