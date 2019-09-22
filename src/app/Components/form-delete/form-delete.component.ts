import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-form-delete",
  templateUrl: "./form-delete.component.html",
  styleUrls: ["./form-delete.component.css"]
})
export class FormDeleteComponent implements OnInit {
  constructor(public dialog: MatDialogRef<FormDeleteComponent>) {}

  ngOnInit() {}

  closeDialog() {
    this.dialog.close(false);
  }
}
