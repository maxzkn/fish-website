import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Articles } from 'src/app/models/articles';
import { ArticleService } from 'src/app/services/article.service';
import { HamburgerService } from 'src/app/services/hamburger.service';
import { Status } from '../../../../models/statuses';

@Component({
  selector: 'app-admin-article-edit',
  templateUrl: './admin-article-edit.component.html',
  styleUrls: ['./admin-article-edit.component.scss'],
})
export class AdminArticleEditComponent implements OnInit {
  fileName: string = '';
  selectedFile: File = null;
  selectedArticle = null;
  selected$: Observable<any>;

  constructor(
    private hamburger: HamburgerService,
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
  ) {}

  addArticleForm: FormGroup;

  statuses: Status[] = [
    { value: 'active', viewValue: 'Active' },
    { value: 'inactive', viewValue: 'Inactive' },
  ];

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
        this.initForm();
      });
    } else {
      this.router.navigate(['/admin/articles']);
    }
  }

  initForm() {
    if (this.selectedArticle) {
      this.addArticleForm = this.formBuilder.group({
        title: [this.selectedArticle.title, Validators.compose([Validators.required])],
        status: [this.selectedArticle.status, Validators.compose([Validators.required])],
        source: [this.selectedArticle.source],
        editor: [this.selectedArticle.body, Validators.compose([Validators.required])],
      });
      if (this.selectedArticle.image) this.fileName = this.selectedArticle.imageName;
    }
  }

  applyMargin() {
    return this.hamburger.marginStyleOther();
  }

  onSubmit(form: FormGroup) {
    const regex = /(<([^>]+)>)/gi;
    const articleText = form.value.editor.replace(regex, '');

    if (this.selectedFile) {
    this.articleService.deleteOldArticleImage(this.selectedArticle).then(() => {
      this.articleService
        .uploadArticleImage(this.selectedFile, form.value.title).then(() => {
          this.articleService.editSelectedArticle(form, articleText).then(() => {
            this.router.navigate(['/admin/articles']);
          });
        });
      });
      } else {
        this.articleService.editSelectedArticle(form, articleText).then(() => {
          this.router.navigate(['/admin/articles']);
        });
      }
  }

  imgInputChange(fileInputEvent: any) {
    this.fileName = fileInputEvent.target.files[0].name;
    this.selectedFile = fileInputEvent.target.files[0];
  }
}
