import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Section } from '../section';
import { SectionService } from '../section.service';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, AfterViewInit {
  sections: Section[] = [];
  query = new FormControl('');
  constructor(private sectionService: SectionService, private router:Router, private route: ActivatedRoute, ) { }

  search_query(): void {
    console.log(this.query.value);
    this.router.navigate([`/sections/${this.query.value}`])
  }

  ngOnInit() {
    //this.getSections();
  }

  ngAfterViewInit() {
    console.log('hi');
    let search = document.getElementsByClassName('search')[0] as HTMLElement;
    let line1 = document.getElementsByClassName('line-1')[0] as HTMLElement;
    let line2 = document.getElementsByClassName('line-2')[0] as HTMLElement;
    search.addEventListener('click', function () {
      search.classList.add('active');
      line1.style.transform = 'rotate(45deg)';
      line1.style.top = '0px';
      line1.style.left = '0px';
      line2.style.height = '40px';
      line2.style.opacity = '1';
    });

    document.querySelectorAll(".line-1, .line-2").forEach(function (elem) {
      elem.addEventListener("click", function () {
        search.classList.remove('active');
        line1.style.transform = 'rotate(-45deg)';
        line1.style.top = '-20px';
        line1.style.left = '45px';
        line2.style.height = '0px';
        line2.style.opacity = '0';
      });
    });
  }


  getSections(): void {
    /* this.sectionService.getSections("govt 2306")
      .subscribe(sections => this.sections = sections.slice(1, 5)); */
  }
}