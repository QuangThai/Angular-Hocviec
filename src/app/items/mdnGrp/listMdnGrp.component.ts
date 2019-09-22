import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { MdnGrpService } from "src/app/_services/items/mdnGrp.service";
import { MdnGrpItems } from "src/app/model/items/mdnGrpItems";

/**
 * @title Card with multiple sections
 */
@Component({
  providers: [MdnGrpService],
  templateUrl: "listMdnGrp.component.html",
  styleUrls: ["listMdnGrp.component.css"]
})
export class ListMdnGrpItem implements OnInit {
  displayedColumns: string[] = [
    "ItemGrpID",
    "ItemGrpName",
    "ItemPrntGrpID",
    "ItemGrpTypeID",
    "ItemFeeTypeID",
    "Note",
    "IsActive"
  ];
  dataSource: MdnGrpItems[] = [];

  constructor(
    private route: ActivatedRoute,
    private mdnGrpService: MdnGrpService
  ) {}

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData(): void {
    this.mdnGrpService.getListItem().subscribe(res => {
      this.dataSource = res;
    });
  }
}
