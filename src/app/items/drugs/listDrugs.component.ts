import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  // providers: [MdnGrpService],
  templateUrl: "listDrugs.component.html",
  styleUrls: ["listDrugs.component.css"]
})
export class ListDrugItems implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
