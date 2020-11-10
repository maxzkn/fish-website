import { Component, OnInit } from '@angular/core';
import { HamburgerService } from 'src/app/services/hamburger.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin-article-new',
  templateUrl: './admin-article-new.component.html',
  styleUrls: ['./admin-article-new.component.scss'],
})
export class AdminArticleNewComponent implements OnInit {
  constructor(
    private hamburger: HamburgerService,
    private formBuilder: FormBuilder
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
      editor: [null, Validators.compose([Validators.required])],
    });
  }

  applyMargin() {
    return this.hamburger.marginStyleOther();
  }

  onSubmit(form: FormGroup) {
    const regex = /(<([^>]+)>)/ig;
    const result = form.value.editor.replace(regex, "");
    console.log(
      'title: ' + form.value.title + 'select: ' + form.value.status + 'editor text: ' + result
    );
  }
}
