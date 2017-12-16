import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoaderService {

  pageContent;

  constructor(private http: HttpClient) { }

  public getPageContent() {
    this.http.get('assets/sources').subscribe(data => this.pageContent = data);
  }

}
