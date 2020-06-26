import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Section } from '../section';
import { SectionService } from '../section.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-section-search',
  templateUrl: './section-search.component.html',
  styleUrls: ['./section-search.component.css'],
  animations: [
    trigger('panelInOut', [
      transition('void => *', [
        style({opacity: 0}),
        animate(200 )
      ]),
      transition('* => void', [
        animate(200, style({opacity: 0}))
      ])
    ])
  ]
})
export class SectionSearchComponent implements OnInit, AfterViewInit {
  sections$: Observable<Section[]>;
  private searchTerms = new Subject<string>();
  query = new FormControl('');
  opened: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private sectionService: SectionService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  submitMe(name: string){
    // (<HTMLInputElement>document.getElementById('search-box')).value = name;
    this.router.navigate([`/sections/${name}`])
  }

  ngAfterViewInit() {
    console.log('hi');
    let search = document.getElementsByClassName('search')[0] as HTMLElement;
    let line1 = document.getElementsByClassName('line-1')[0] as HTMLElement;
    let line2 = document.getElementsByClassName('line-2')[0] as HTMLElement;
    search.addEventListener('click', function () {
      search.classList.add('active');
      search.style.fontSize = '32px';
      line1.style.transform = 'rotate(45deg)';
      line1.style.top = '0px';
      line1.style.left = '0px';
      line2.style.height = '40px';
      line2.style.opacity = '1';
    });

    document.querySelectorAll(".line-1, .line-2").forEach(function (elem) {
      elem.addEventListener("click", function () {
        search.classList.remove('active');
        search.style.fontSize = '22px';
        line1.style.transform = 'rotate(-45deg)';
        line1.style.top = '-20px';
        line1.style.left = '45px';
        line2.style.height = '0px';
        line2.style.opacity = '0';
      });
    });
  }

  search_query(): void {
    console.log(this.query.value);
    this.router.navigate([`/sections/${this.query.value}`])
  }

  ngOnInit(): void {
    this.sections$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.sectionService.searchSections(term)),
    );
  }
}