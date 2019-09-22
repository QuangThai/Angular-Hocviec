import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FeeTypeItems } from "src/app/model/items/feeTypeItems";
import { Observable } from 'rxjs';

export interface Config {
  heroesUrl: string;
  textfile: string;
}

@Injectable() export class feeTypeService {
  configUrl = "assets/feeTypeItems/feeTypeItems.json";

  _dataSource: FeeTypeItems[] = [
    {
      ItemFeeTypeID: 1,
      ItemFeeTypeName: "02. XÉT NGHIỆM",
      EnumName: "Xn",
      IsInstock: true,
      ItemFeeTypeInsID: "03. XÉT NGHIỆM"
    },
    {
      ItemFeeTypeID: 2,
      ItemFeeTypeName: "03. CHUẨN ĐOÁN HÌNH ẢNH",
      EnumName: "Cdha",
      IsInstock: false,
      ItemFeeTypeInsID: "04. CHUẨN ĐOÁN HÌNH ẢNH"
    },
    {
      ItemFeeTypeID: 3,
      ItemFeeTypeName: "05. THUỐC",
      EnumName: "Drug",
      IsInstock: true,
      ItemFeeTypeInsID: "05. THĂM DÒ CHỨC NĂNG"
    },
    {
      ItemFeeTypeID: 4,
      ItemFeeTypeName: "05. MÁU - CHẾ PHẨM MÁU",
      EnumName: "Flood",
      IsInstock: true,
      ItemFeeTypeInsID: "04. BAO BÌ ĐÓNG GÓI THUỐC"
    },
    {
      ItemFeeTypeID: 5,
      ItemFeeTypeName: "04. THỦ THUẬT - PHẨU THUẬT",
      EnumName: "Ptt",
      IsInstock: false,
      ItemFeeTypeInsID: "07. THUỐC K.CHỐNG THÁI GHÉP"
    },
    {
      ItemFeeTypeID: 6,
      ItemFeeTypeName: "06. VẬT TƯ Y TẾ",
      EnumName: "Vtyt",
      IsInstock: true,
      ItemFeeTypeInsID: "05. THUỐC THANH TOÁN THEO TỈ LỆ"
    },
    {
      ItemFeeTypeID: 7,
      ItemFeeTypeName: "04. DỊCH VỤ KỶ THANH TOÁN THEO TỈ LỆ",
      EnumName: "DvktPercent",
      IsInstock: false,
      ItemFeeTypeInsID: "09. PHÍ VẬN CHUYỂN MÁU"
    },
    {
      ItemFeeTypeID: 8,
      ItemFeeTypeName: "05. THUỐC K - CHỐNG THAI THÉP",
      EnumName: "Canner",
      IsInstock: false,
      ItemFeeTypeInsID: "09. MÁU - CHẾ PHẨM MÁU"
    },
    {
      ItemFeeTypeID: 9,
      ItemFeeTypeName: "01. KHÁM BỆNH",
      EnumName: "Kcb",
      IsInstock: false,
      ItemFeeTypeInsID: "06. THỦ THUẬT - PHẨU THUẬT"
    },
    {
      ItemFeeTypeID: 10,
      ItemFeeTypeName: "10. PHÍ VẬN CHUYỂN",
      EnumName: "Tranfer",
      IsInstock: false,
      ItemFeeTypeInsID: "06. DỊCH VỤ KỸ THANH TOÁN THEO TỈ LỆ"
    },
    {
      ItemFeeTypeID: 11,
      ItemFeeTypeName: "01. NGÀY GIƯỜNG ĐIỀU TRỊ NỘI TRÚ",
      EnumName: "Bed",
      IsInstock: false,
      ItemFeeTypeInsID: "08. VẬT TƯ Y TẾ"
    },
    {
      ItemFeeTypeID: 12,
      ItemFeeTypeName: "12. VẬT TƯ Y TẾ KĨ THUẬT CAO",
      EnumName: "VttyPercent",
      IsInstock: true,
      ItemFeeTypeInsID: "10. PHÍ VẬN CHUYỂN"
    },
    {
      ItemFeeTypeID: 13,
      ItemFeeTypeName: "13. ĐIỀU TRỊ BẰNG YHCT",
      EnumName: "Yhct",
      IsInstock: false,
      ItemFeeTypeInsID: "01. KHÁM BỆNH"
    },
    {
      ItemFeeTypeID: 14,
      ItemFeeTypeName: "03. THĂM DÒ CHỨC NĂNG",
      EnumName: "Tdcn",
      IsInstock: false,
      ItemFeeTypeInsID: "01. NGÀY GIƯỜNG ĐIỀU TRỊ NGOẠI TRÚ"
    },
    {
      ItemFeeTypeID: 15,
      ItemFeeTypeName: "01. NGÀY GIƯỜNG ĐIỀU TRỊ NGOẠI TRÚ",
      EnumName: "BedOsdExam",
      IsInstock: false,
      ItemFeeTypeInsID: "01. NGÀY GIƯỜNG ĐIỀU TRỊ NỘI TRÚ"
    },
    {
      ItemFeeTypeID: 16,
      ItemFeeTypeName: "05. THUỐC THANH TOÁN THEO TỈ LỆ",
      EnumName: "DrugPercent",
      IsInstock: true,
      ItemFeeTypeInsID: "07. THUỐC"
    },
    {
      ItemFeeTypeID: 17,
      ItemFeeTypeName: "99. TỈ LỆ KHÁC",
      EnumName: "Other",
      IsInstock: false,
      ItemFeeTypeInsID: "09. MÁU - CHẾ PHẨM MÁU"
    }
  ];

  constructor(private http: HttpClient) {}

  getAllFeeTypeItem() {
    return this._dataSource;
  }

  addFeeTypeItem(item: FeeTypeItems) {
    // item.ItemFeeTypeID = this._dataSource.length + 1;
    this._dataSource.push(item);
  }

  editFeeTypeItem(item: FeeTypeItems) {
    const index = this._dataSource.findIndex(
      c => c.ItemFeeTypeID === item.ItemFeeTypeID
    );
    this._dataSource[index] = item;
  }

  deleteFeeTypeItem(id: number) {
    this._dataSource = this._dataSource.filter(c => c.ItemFeeTypeID !== id);
  }

  getListItem() {
    return this.http.get<FeeTypeItems[]>(this.configUrl);
  }

  getDetailItem(id) {
    return this.http.get(`${environment.apiUrl}/api/FeeType/${id}`);
  }

  addDetailItem(item) {
    return this.http.post(`${environment.apiUrl}/api/FeeType/Add`, item);
  }

  updateDetailItem(item) {
    return this.http.post(`${environment.apiUrl}/api/FeeType/Update`, item);
  }

  deleteDetailItem(id) {
    return this.http.delete(`${environment.apiUrl}/api/FeeType/Delete/${id}`);
  }
}
