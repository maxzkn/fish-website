import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { HamburgerService } from 'src/app/services/hamburger.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articleArray: Object[] = [];

  constructor(
    private hamburger: HamburgerService,
    private articles: ArticleService
  ) {}

  ngOnInit(): void {
    this.showArticles();
  }

  showArticles() {
    this.articles
      .getAllArticles()
      .subscribe(articles => {
        console.log(articles);
        this.articleArray = articles;
      });
  }

  applyMargin() {
    return this.hamburger.marginStyleHome();
  }
}
