import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  // providers: [MdnGrpService],
  templateUrl: "listBedItems.component.html",
  styleUrls: ["listBedItems.component.css"]
})
export class ListBedItems implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
