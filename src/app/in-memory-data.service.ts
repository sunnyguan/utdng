import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Section } from './section';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const sections = [
      { id: 11, name: "Govt 2305" },
      { id: 12, name: "Govt 2306" },
      { id: 13, name: "Ecs 3390" },
      { id: 14, name: "Cs 1200" },
      { id: 15, name: "Ecs 1100" },
      { id: 16, name: "Math 3323" },
      { id: 17, name: "Cs 3345" }
    ];
    return { sections };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(sections: Section[]): number {
    return sections.length > 0 ? Math.max(...sections.map(section => section.id)) + 1 : 11;
  }
}