import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  // providers: [MdnGrpService],
  templateUrl: "listDVKTExam.component.html",
  styleUrls: ["listDVKTExam.component.css"]
})
export class ListDVKTExam implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
