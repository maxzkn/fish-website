import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { HamburgerService } from 'src/app/services/hamburger.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articleArray: Object[] = [];
  loggedIn: boolean = false;

  constructor(
    private hamburger: HamburgerService,
    private articleService: ArticleService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // if (this.auth.loggedIn) this.loggedIn = !this.loggedIn;
    // console.log(this.loggedIn)
    this.auth.user$.subscribe((user) => {
      if (user) this.loggedIn = !this.loggedIn;
      this.showArticles();
    });
  }

  showArticles() {
    if (this.loggedIn) {
      this.articleService.getAllArticles().subscribe((articles) => {
        console.log(articles);
        this.articleArray = articles;
      });
    } else {
      this.articleService.getAllArticles().pipe(
          map(articles =>
            articles.filter((article) => article.status === 'visible')
          )
        )
        .subscribe((articles) => {
          console.log(articles);
          this.articleArray = articles;
        });
    }
  }

  selectArticle(id: any) {
    this.articleService.selectArticle(id);
  }

  applyMargin() {
    return this.hamburger.marginStyleOther();
  }
}
