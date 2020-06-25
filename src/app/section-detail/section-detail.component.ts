import { Component, OnInit, Input } from '@angular/core';
import { Section } from '../section';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from '../section.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.css']
})
export class SectionDetailComponent implements OnInit {
  section: Section;
  
  constructor(private route: ActivatedRoute, private sectionService: SectionService, private location: Location) { }

  ngOnInit(): void {
    this.getSection();
  }

  getSection(): void {
    const sid = this.route.snapshot.paramMap.get('sid');
    this.sectionService.getSection(sid).subscribe(section => this.section = section);
  }

  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.sectionService.updateSection(this.section).subscribe(() => this.goBack());
  }

}
