import { Component, OnInit, Inject, Input } from "@angular/core";
import { feeTypeService } from "src/app/_services/items/feeType.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FeeTypeItems } from "src/app/model/items/feeTypeItems";

@Component({
  selector: "app-fee-details",
  templateUrl: "./fee-details.component.html",
  styleUrls: ["./fee-details.component.css"]
})
export class FeeDetailsComponent implements OnInit {
  public _feeTypeForm: FormGroup;
  
  selectedOption: string = "";

  dataSource: FeeTypeItems[];

  constructor(
    private _fb: FormBuilder,
    private feeTypeService: feeTypeService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<FeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.onLoadData();
    this._feeTypeForm = this._fb.group({
      ItemFeeTypeID: [this.data.ItemFeeTypeID, [Validators.required]],
      ItemFeeTypeName: [
        this.data.ItemFeeTypeName,
        [Validators.required, Validators.minLength(5), Validators.maxLength(30)]
      ],
      EnumName: [this.data.EnumName, [Validators.required]],
      IsInstock: [this.data.IsInstock, [Validators.required]],
      ItemFeeTypeInsID: [this.data.ItemFeeTypeInsID, [Validators.required]]
    });
  }

  onLoadData(): void {
    this.feeTypeService.getListItem().subscribe(res => {
      this.dataSource = res;
    });
  }

  // select option value
  selectChangHandler(event: any) {
    this.selectedOption = event.target.value;
  }

  // reset Form
  onResetForm() {
    this._feeTypeForm.reset();
  }

  onSubmit() {
    console.log(this._feeTypeForm.value);
    if (isNaN(this.data.ItemFeeTypeID)) {
      this.feeTypeService.addFeeTypeItem(this._feeTypeForm.value);
      this.dialogRef.close();
      this.toastr.success("Submitted successfully", "add");
    } else {
      this.feeTypeService.editFeeTypeItem(this._feeTypeForm.value);
      this.dialogRef.close();
      this.toastr.success("Submitted successfully", "Edit");
    }
  }
}
