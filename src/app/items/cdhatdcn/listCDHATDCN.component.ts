import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  // providers: [MdnGrpService],
  templateUrl: "listCDHATDCN.component.html",
  styleUrls: ["listCDHATDCN.component.css"]
})
export class ListCDHATDCNItems implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
