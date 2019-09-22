import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { MdnGrpItems } from "src/app/model/items/mdnGrpItems";

export interface Config {
  heroesUrl: string;
  textfile: string;
}

@Injectable({ providedIn: "root" })
export class MdnGrpService {
  configUrl = "assets/mdnGrpItems/mdnGrpItems.json";

  constructor(private http: HttpClient) {}

  getListItem() {
    return this.http.get<MdnGrpItems[]>(this.configUrl);
    // return this.http.get(`${environment.apiUrl}/api/MdnGrps`);
  }

  getDetailItem(id) {
    return this.http.get(`${environment.apiUrl}/api/MdnGrps/${id}`);
  }

  addDetailItem(item) {
    return this.http.post(`${environment.apiUrl}/api/MdnGrps/Add`, item);
  }

  updateDetailItem(item) {
    return this.http.post(`${environment.apiUrl}/api/MdnGrps/Update`, item);
  }

  deleteDetailItem(id) {
    return this.http.delete(`${environment.apiUrl}/api/MdnGrps/Delete/${id}`);
  }
}
