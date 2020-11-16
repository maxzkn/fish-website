import { Component, OnInit } from '@angular/core';
import { HamburgerService } from 'src/app/services/hamburger.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../../../services/article.service';
import { Status } from '../../../../models/statuses';

@Component({
  selector: 'app-admin-article-new',
  templateUrl: './admin-article-new.component.html',
  styleUrls: ['./admin-article-new.component.scss'],
})
export class AdminArticleNewComponent implements OnInit {
  fileName: string = null;
  selectedFile: File = null;

  constructor(
    private hamburger: HamburgerService,
    private formBuilder: FormBuilder,
    private articleService: ArticleService
  ) {}

  addArticleForm: FormGroup;

  statuses: Status[] = [
    { value: 'active', viewValue: 'Active' },
    { value: 'inactive', viewValue: 'Inactive' },
  ];

  ngOnInit(): void {
    this.addArticleForm = this.formBuilder.group({
      title: [null, Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
      source: [null],
      editor: [null, Validators.compose([Validators.required])],
    });
  }

  applyMargin() {
    return this.hamburger.marginStyleOther();
  }

  onSubmit(form: FormGroup) {
    const regex = /(<([^>]+)>)/gi;
    const articleText = form.value.editor.replace(regex, '');
    if (this.selectedFile) {
      this.articleService
        .uploadArticleImage(this.selectedFile)
        .then(() => {
          this.articleService.saveArticleInDatabase(form.value, articleText);
        });
    } else {
      this.articleService.saveArticleInDatabase(form.value, articleText);
    }
  }

  imgInputChange(fileInputEvent: any) {
    this.fileName = fileInputEvent.target.files[0].name;
    this.selectedFile = fileInputEvent.target.files[0];
  }
}
