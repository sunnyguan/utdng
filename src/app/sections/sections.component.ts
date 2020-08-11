import { Component, OnInit } from '@angular/core';
import { Section } from '../section';
import { SectionService } from '../section.service';
import { MessageService } from '../message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  sections: Section[];
  query: string;
  search_string = new FormControl('');
  selectedSection: Section;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private route: ActivatedRoute, private router: Router, private sectionService: SectionService, private messageService: MessageService) { }

  onSelect(section: Section): void {
    this.selectedSection = section;
    this.messageService.add(`SectionService: Selected section id=${section.id}`);
  }

  ngOnInit(): void {
    const query = this.route.snapshot.paramMap.get('query');
    this.query = query;
    this.getSections();
  }

  getSections(): void {
    this.isLoading$.next(true);
    this.sectionService.getSections(this.query).subscribe(
      (data) => {
        console.log(data);
        this.sections = data;
        this.isLoading$.next(false);
      }
    );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.sectionService.addSection({ name } as Section).subscribe(section => { this.sections.push(section); });
  }

  delete(section: Section): void {
    this.sections = this.sections.filter(h => h !== section);
    this.sectionService.deleteSection(section).subscribe();
  }

  getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

  comparer = (idx, asc) => (a, b) => ((v1, v2) =>
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
  )(this.getCellValue(asc ? a : b, idx), this.getCellValue(asc ? b : a, idx));

  asc: boolean = true;
  sort(th) {
    th = event.target || event.srcElement || event.currentTarget;
    const table = th.closest('table');
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
      .sort(this.comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
      .forEach(tr => table.appendChild(tr));
  }

  search_query() {
    this.query = this.search_string.value;
    this.router.navigate([`/sections/${this.search_string.value}`]);
    this.getSections();
  }

}
