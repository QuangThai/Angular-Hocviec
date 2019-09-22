import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
//Material
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCardModule } from "@angular/material/card";
import { MatTreeModule } from "@angular/material/tree";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDialogModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatOptionModule, MatAutocompleteModule } from "@angular/material";

//_hepler
import { fakeBackendProvider } from "./_helpers";
import { appRoutingModule } from "./app.routing";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login";
import { HomeComponent } from "./home";
import { ListMdnGrpItem } from "./items/mdnGrp";
import { ListFeeTypeItem } from "./items/feeType";
import { ListDVKTExam } from "./items/dvktExam";
import { ListAnalysisItem } from "./items/analysis";
import { ListCDHATDCNItems } from "./items/cdhatdcn";
import { ListBedItems } from "./items/bed";
import { ListOtherFeeExam } from "./items/otherFeeExam";
import { ListTranferFeeItem } from "./items/tranferFee";
import { ListDrugItems } from "./items/drugs";
import { ListMeterialItems } from "./items/meterials";
import { ListBloodItems } from "./items/bloods";
import { FeeDetailsComponent } from './Components/fee-details/fee-details.component';
import { FormsModule} from '@angular/forms';
import { feeTypeService } from './_services/items/feeType.service';
import { FormDeleteComponent } from './Components/form-delete/form-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListMdnGrpItem,
    ListFeeTypeItem,
    ListDVKTExam,
    ListAnalysisItem,
    ListCDHATDCNItems,
    ListBedItems,
    ListOtherFeeExam,
    ListTranferFeeItem,
    ListDrugItems,
    ListMeterialItems,
    ListBloodItems,
    FeeDetailsComponent,
    FormDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
  
    
    //Material
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatTreeModule,
    MatToolbarModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    //
  ],
  providers: [
   
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
    feeTypeService,
  ],
  bootstrap: [AppComponent],
  entryComponents : [FeeDetailsComponent,FormDeleteComponent],

})
export class AppModule {}
