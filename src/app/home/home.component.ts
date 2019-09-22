import { FlatTreeControl } from "@angular/cdk/tree";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, Injectable, OnInit } from "@angular/core";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";
import { BehaviorSubject, Observable } from "rxjs";

import { AuthenticationService } from "../_services";

const LOAD_MORE = "LOAD_MORE";

/** Nested node */
export class LoadmoreNode {
  childrenChange = new BehaviorSubject<LoadmoreNode[]>([]);

  get children(): LoadmoreNode[] {
    return this.childrenChange.value;
  }

  constructor(
    public item: string,
    public hasChildren = false,
    public loadMoreParentItem: string | null = null
  ) {}
}

/** Flat node with expandable and level information */
export class LoadmoreFlatNode {
  constructor(
    public item: string,
    public level = 1,
    public expandable = false,
    public loadMoreParentItem: string | null = null
  ) {}
}

@Injectable()
export class LoadmoreDatabase {
  batchNumber = 5;
  dataChange = new BehaviorSubject<LoadmoreNode[]>([]);
  nodeMap = new Map<string, LoadmoreNode>();

  /** The data */
  rootLevelNodes: string[] = [
    "DANH MỤC",
    "QUẢN LÝ",
    "QUẢN LÝ Y TẾ",
    "ĐĂNG KÝ KCB",
    "KHÁM CHỮA BỆNH",
    "QUẢN LÝ THANH QUYẾT TOÁN",
    "BÁO CÁO",
    "TRỢ GIÚP"
  ];
  dataMap = new Map<string, string[]>([
    [
      "DANH MỤC",
      ["DANH MỤC Y TẾ", "DANH MỤC TÀI KHOẢN", "THÔNG TIN KHOA PHÒNG", "KHO"]
    ],
    ["QUẢN LÝ", []],
    ["QUẢN LÝ Y TẾ", []],
    ["ĐĂNG KÝ KCB", []],
    ["KHÁM CHỮA BỆNH", []],
    ["QUẢN LÝ THANH QUYẾT TOÁN", []],
    ["BÁO CÁO", []],
    ["TRỢ GIÚP", []],
    [
      "DANH MỤC Y TẾ",
      [
        "NHÓM Y TẾ;/mdnGrp",
        "LOẠI CHI PHÍ;/feeType",
        "DANH MỤC DỊCH VỤ",
        "THUỐC VÀ VẬT TƯ Y TẾ",
        "ĐỒNG BỘ BẢO HIỂM Y TẾ"
      ]
    ],
    [
      "DANH MỤC DỊCH VỤ",
      [
        "DANH MỤC DỊCH VỤ KỸ THUẬT;/dvktExam",
        "DANH MỤC XÉT NGHIỆM;/analysis",
        "DANH MỤC CĐHA - TDCN;/cdhatdcn",
        "DANH MỤC NGÀY GIƯỜNG;/bed",
        "DANH MỤC CÔNG KHÁM;/otherFeeExam",
        "DANH MỤC PHÍ VẬN CHUYỂN;/tranferFee"
      ]
    ],
    [
      "THUỐC VÀ VẬT TƯ Y TẾ",
      [
        "DANH MỤC THUỐC;/drugs",
        "DANH MỤC VẬT TƯ Y TẾ;/meterials",
        "DANH MỤC MÁU VÀ CHẾ PHẨM;/bloods"
      ]
    ],
    ["ĐỒNG BỘ BẢO HIỂM Y TẾ", ["DANH MỤC KỸ THUẬT 3465;#"]]
  ]);

  initialize() {
    const data = this.rootLevelNodes.map(name => this._generateNode(name));
    this.dataChange.next(data);
  }

  /** Expand a node whose children are not loaded */
  loadMore(item: string, onlyFirstTime = false) {
    if (!this.nodeMap.has(item) || !this.dataMap.has(item)) {
      return;
    }
    const parent = this.nodeMap.get(item)!;
    const children = this.dataMap.get(item)!;
    if (onlyFirstTime && parent.children!.length > 0) {
      return;
    }
    const newChildrenNumber = parent.children!.length + this.batchNumber;
    const nodes = children
      .slice(0, newChildrenNumber)
      .map(name => this._generateNode(name));
    if (newChildrenNumber < children.length) {
      // Need a new load more node
      nodes.push(new LoadmoreNode(LOAD_MORE, false, item));
    }

    parent.childrenChange.next(nodes);
    this.dataChange.next(this.dataChange.value);
  }

  private _generateNode(item: string): LoadmoreNode {
    if (this.nodeMap.has(item)) {
      return this.nodeMap.get(item)!;
    }
    const result = new LoadmoreNode(item, this.dataMap.has(item));
    this.nodeMap.set(item, result);
    return result;
  }
}

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [LoadmoreDatabase]
})
export class HomeComponent implements OnInit {
  title = "Hệ thống quản lý bệnh viện";
  returnUrl: string;
  currentUser: any;
  nodeMap = new Map<string, LoadmoreFlatNode>();
  treeControl: FlatTreeControl<LoadmoreFlatNode>;
  treeFlattener: MatTreeFlattener<LoadmoreNode, LoadmoreFlatNode>;
  // Flat tree data source
  dataSource: MatTreeFlatDataSource<LoadmoreNode, LoadmoreFlatNode>;

  // constructor(
  //   private router: Router,
  //   private authenticationService: AuthenticationService
  // ) {
  //   this.authenticationService.currentUser.subscribe(
  //     x => (this.currentUser = x)
  //   );
  // }

  constructor(
    private _database: LoadmoreDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );

    this.treeControl = new FlatTreeControl<LoadmoreFlatNode>(
      this.getLevel,
      this.isExpandable
    );

    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });

    _database.initialize();

    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/login";
  }

  getChildren = (node: LoadmoreNode): Observable<LoadmoreNode[]> =>
    node.childrenChange;

  transformer = (node: LoadmoreNode, level: number) => {
    const existingNode = this.nodeMap.get(node.item);

    if (existingNode) {
      return existingNode;
    }

    const newNode = new LoadmoreFlatNode(
      node.item,
      level,
      node.hasChildren,
      node.loadMoreParentItem
    );
    this.nodeMap.set(node.item, newNode);
    return newNode;
  };

  getLevel = (node: LoadmoreFlatNode) => node.level;

  isExpandable = (node: LoadmoreFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: LoadmoreFlatNode) => _nodeData.expandable;

  isLoadMore = (_: number, _nodeData: LoadmoreFlatNode) =>
    _nodeData.item === LOAD_MORE;

  /** Load more nodes from data source */
  loadMore(item: string) {
    this._database.loadMore(item);
  }

  loadChildren(node: LoadmoreFlatNode) {
    this._database.loadMore(node.item, true);
  }

  getUrlRouter(item: string) {
    return item.split(";").length > 1 ? item.split(";")[1] : "";
  }

  getItemName(item: string) {
    return item.split(";")[0];
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
