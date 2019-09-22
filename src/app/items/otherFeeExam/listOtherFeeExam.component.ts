import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  // providers: [MdnGrpService],
  templateUrl: "listOtherFeeExam.component.html",
  styleUrls: ["listOtherFeeExam.component.css"]
})
export class ListOtherFeeExam implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
