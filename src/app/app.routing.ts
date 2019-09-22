import { Routes, RouterModule } from "@angular/router";

// import { AppComponent } from "./app.component";
import { LoginComponent } from "./login";
import { HomeComponent } from "./home";
import { ListMdnGrpItem } from "./items/mdnGrp";
import { ListFeeTypeItem } from "./items/feeType";
import { ListDVKTExam } from "./items/dvktExam";
import { ListAnalysisItem } from "./items/analysis";
import { ListCDHATDCNItems } from "./items/cdhatdcn";
import { ListOtherFeeExam } from "./items/otherFeeExam";
import { ListBedItems } from "./items/bed";
import { ListTranferFeeItem } from "./items/tranferFee";
import { ListDrugItems } from "./items/drugs";
import { ListMeterialItems } from "./items/meterials";
import { ListBloodItems } from "./items/bloods";
import { FeeDetailsComponent} from "./Components/fee-details/fee-details.component"
import { AuthGuard } from "./_helpers";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "mdnGrp", component: ListMdnGrpItem },
      { path: "feeType", component: ListFeeTypeItem },
      { path: "dvktExam", component: ListDVKTExam },
      { path: "analysis", component: ListAnalysisItem },
      { path: "cdhatdcn", component: ListCDHATDCNItems },
      { path: "otherFeeExam", component: ListOtherFeeExam },
      { path: "bed", component: ListBedItems },
      { path: "tranferFee", component: ListTranferFeeItem },
      { path: "drugs", component: ListDrugItems },
      { path: "meterials", component: ListMeterialItems },
      { path: "bloods", component: ListBloodItems },
      { path: "feeDetails", component:FeeDetailsComponent}
    ]
  },
  { path: "login", component: LoginComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

export const appRoutingModule = RouterModule.forRoot(routes);
