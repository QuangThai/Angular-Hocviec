import { Component, OnInit } from "@angular/core";
import { FeeTypeItems } from "src/app/model/items/feeTypeItems";
import { feeTypeService } from "src/app/_services/items/feeType.service";
import { MatDialog} from "@angular/material";
import { from } from "rxjs";
import { FeeDetailsComponent } from "src/app/Components/fee-details/fee-details.component";
import { ToastrService } from "ngx-toastr";
import { FormDeleteComponent } from "src/app/Components/form-delete/form-delete.component";
@Component({
  templateUrl: "listFeeType.component.html",
  styleUrls: ["listFeeType.component.css"]
})
export class ListFeeTypeItem implements OnInit {

  dataSource: FeeTypeItems[];
  isPopupOpened = true;

  constructor(
    private feeTypeService?: feeTypeService,
    private dialog?: MatDialog,
    private toastr?: ToastrService
  ) {}

  ngOnInit(): void {
    this.onLoadData();
  }

  get allDataSource() {
    return this.feeTypeService.getAllFeeTypeItem();
  }
 
  onLoadData(): void {
    this.feeTypeService.getListItem().subscribe(res => {
      this.dataSource = res;
    });
  }

  // add
  addFeeTypeItem(item: FeeTypeItems) {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(FeeDetailsComponent, {
      data: { item }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.isPopupOpened = false;
        this.dataSource = res;
      }
    });
  }

  // edit
  editFeeTypeItem(id: number) {
    this.isPopupOpened = true;
    const element = this.feeTypeService._dataSource.find(
      c => c.ItemFeeTypeID === id
    );
    const dialogRef = this.dialog.open(FeeDetailsComponent, {
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  // xóa
  onDelete(index: number) {
    this.dialog
      .open(FormDeleteComponent)
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.feeTypeService.deleteFeeTypeItem(index);
          this.toastr.success("Deleted successlly", "Delete");
        }
      });
  }

}
