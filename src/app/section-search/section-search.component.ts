import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Section } from '../section';
import { SectionService } from '../section.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-section-search',
  templateUrl: './section-search.component.html',
  styleUrls: ['./section-search.component.css']
})
export class SectionSearchComponent implements OnInit {
  sections$: Observable<Section[]>;
  private searchTerms = new Subject<string>();
  query = new FormControl('');

  constructor(private router:Router, private route: ActivatedRoute, private sectionService: SectionService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  search_query(): void {
    console.log(this.query.value);
    this.router.navigate([`/sections/${this.query.value}`])
  }

  ngOnInit(): void {
    /* this.sections$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.sectionService.searchSections(term)),
    ); */
  }
}