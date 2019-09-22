import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  // providers: [MdnGrpService],
  templateUrl: "listTranferFee.component.html",
  styleUrls: ["listTranferFee.component.css"]
})
export class ListTranferFeeItem implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
