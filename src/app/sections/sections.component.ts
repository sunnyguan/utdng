import { Component, OnInit } from '@angular/core';
import { SECTIONS } from '../mock_sections';
import { Section } from '../section';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  sections = SECTIONS;
  selectedSection: Section;

  onSelect(section: Section): void {
    this.selectedSection = section;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
