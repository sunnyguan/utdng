import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Section } from '../section';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-section-search',
  templateUrl: './section-search.component.html',
  styleUrls: [ './section-search.component.css' ]
})
export class SectionSearchComponent implements OnInit {
  sections$: Observable<Section[]>;
  private searchTerms = new Subject<string>();

  constructor(private sectionService: SectionService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.sections$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.sectionService.searchSections(term)),
    );
  }
}