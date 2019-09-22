import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  // providers: [MdnGrpService],
  templateUrl: "listAnalysis.component.html",
  styleUrls: ["listAnalysis.component.css"]
})
export class ListAnalysisItem implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
