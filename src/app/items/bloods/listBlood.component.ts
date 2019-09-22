import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  // providers: [MdnGrpService],
  templateUrl: "listBlood.component.html",
  styleUrls: ["listBlood.component.css"]
})
export class ListBloodItems implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
