import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Articles } from 'src/app/models/articles';
import { ArticleService } from 'src/app/services/article.service';
import { FileTypeValidatorService } from 'src/app/services/file-type-validator.service';
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
  minDate: Date;
  maxDate: Date;

  constructor(
    private hamburger: HamburgerService,
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private typeValidator: FileTypeValidatorService
  ) {
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 20, 0, 1); // minimum to January 1st 20 years in the past
      this.maxDate = new Date();
  }

  addArticleForm: FormGroup;

  statuses: Status[] = [
    { value: 'visible', viewValue: 'Visible' },
    { value: 'invisible', viewValue: 'Invisible' },
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
        date: [this.selectedArticle.dateWritten.toDate()],
        editor: [this.selectedArticle.body, Validators.compose([Validators.required])],
      });
      if (this.selectedArticle.image) this.fileName = this.selectedArticle.imageName;
    }
  }

  applyMargin() {
    return this.hamburger.marginStyleOther();
  }

  onSubmit(form: FormGroup) {
    if (this.selectedFile) {
    this.articleService.deleteOldArticleImage(this.selectedArticle).then(() => {
      this.articleService
        .uploadArticleImage(this.selectedFile).then(() => {
          this.articleService.editSelectedArticle(form, form.value.editor).then(() => {
            this.router.navigate(['/admin/articles']);
          });
        });
      });
      } else {
        this.articleService.editSelectedArticle(form, form.value.editor).then(() => {
          this.router.navigate(['/admin/articles']);
        });
      }
  }

  imgInputChange(fileInputEvent: any) {
    const validateFile = this.typeValidator.validateFile(fileInputEvent.target.files[0]);
    if (validateFile) {
      this.fileName = fileInputEvent.target.files[0].name;
      this.selectedFile = fileInputEvent.target.files[0];
    } else {
      window.alert('Only image files are allowed!');
    }
  }
}
