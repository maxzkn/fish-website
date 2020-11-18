import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleService } from 'src/app/services/article.service';
import { HamburgerService } from 'src/app/services/hamburger.service';

@Component({
  selector: 'app-articles-read',
  templateUrl: './articles-read.component.html',
  styleUrls: ['./articles-read.component.scss']
})
export class ArticlesReadComponent implements OnInit {
  selectedArticle = null;
  selected$: Observable<any>;

  constructor(private articleService: ArticleService,
              private router: Router,
              private hamburger: HamburgerService) { }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle() {
    // console.log(this.articleService.articleId);
    this.selected$ = this.articleService
      .getAllArticles()
      .pipe(
        map(articles =>
          articles.filter(
            article => article.id === this.articleService.articleId
          )
        )
      );

    if (this.articleService.articleId) {
      this.selected$.subscribe((article) => {
        console.log(article[0]);
        this.selectedArticle = article[0];
      });
    }
    else {
      this.router.navigate(['/articles']);
    }
  }

  applyMargin() {
    return this.hamburger.marginStyleHome();
  }
}
