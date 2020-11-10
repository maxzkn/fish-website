import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ARTICLES } from 'src/app/models/articles';
import { HamburgerService } from 'src/app/services/hamburger.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.scss']
})
export class AdminArticlesComponent implements OnInit, AfterViewInit {

  constructor(private hamburger: HamburgerService) { }

  ngOnInit(): void {
  }

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['ID', 'Title', 'Source', 'Status'];
  dataSource = new MatTableDataSource(ARTICLES);

  applyMargin() {
    return this.hamburger.marginStyleOther();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
