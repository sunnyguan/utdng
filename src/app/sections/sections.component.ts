import { Component, OnInit } from '@angular/core';
import { Section } from '../section';
import { SectionService } from '../section.service';
import { MessageService } from '../message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  sections: Section[];
  selectedSection: Section;

  constructor(private route: ActivatedRoute, private sectionService: SectionService, private messageService: MessageService) { }

  onSelect(section: Section): void {
    this.selectedSection = section;
    this.messageService.add(`SectionService: Selected section id=${section.id}`);
  }

  ngOnInit(): void {
    this.getSections();
  }

  getSections(): void {
    const query = this.route.snapshot.paramMap.get('query');
    this.sectionService.getSections(query).subscribe(sections => this.sections = sections);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) {
      return;
    }
    this.sectionService.addSection({ name } as Section).subscribe(section => {this.sections.push(section);});
  }

  delete(section: Section): void {
    this.sections = this.sections.filter(h => h !== section);
    this.sectionService.deleteSection(section).subscribe();
  }

}
