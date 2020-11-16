import { Component, OnInit, ViewChild } from '@angular/core';
import { Articles } from 'src/app/models/articles';
import { HamburgerService } from 'src/app/services/hamburger.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ArticleService } from 'src/app/services/article.service';
import { MatPaginator } from '@angular/material/paginator';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.scss'],
})
export class AdminArticlesComponent implements OnInit {
  articleArray: Articles[] = [];
  displayedColumns: string[] = [
    'No.',
    'Title',
    'Source',
    'Status',
    'Date',
    'Action',
  ];
  dataSource: MatTableDataSource<Articles>;

  constructor(
    private hamburger: HamburgerService,
    private articleService: ArticleService,
  ) {}

  ngOnInit(): void {
    this.showArticles();
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyMargin() {
    return this.hamburger.marginStyleOther();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showArticles() {
    this.articleService.getAllArticles().subscribe((articles) => {
      console.log(articles);
      this.articleArray = articles;
      this.dataSource = new MatTableDataSource(this.articleArray);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  selectArticle(id: any) {
    console.log(id);
    this.articleService.selectArticle(id);
  }

  deleteArticle(article) {
    this.articleService.deleteSelectedArticle(article.id, article.imageName, article.title);
  }
}
