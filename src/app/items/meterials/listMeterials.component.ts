import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  // providers: [MdnGrpService],
  templateUrl: "listMeterials.component.html",
  styleUrls: ["listMeterials.component.css"]
})
export class ListMeterialItems implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
