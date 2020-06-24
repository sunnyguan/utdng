import { Component, OnInit } from '@angular/core';
import { Section } from '../section';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  sections: Section[] = [];

  constructor(private sectionService: SectionService) { }

  ngOnInit() {
    this.getSections();
  }

  getSections(): void {
    this.sectionService.getSections()
      .subscribe(sections => this.sections = sections.slice(1, 5));
  }
}