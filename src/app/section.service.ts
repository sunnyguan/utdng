import { Injectable } from '@angular/core';
import { Section } from './section';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private sectionsUrl = "api/sections";

  httpOptions2 = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getSections(): Observable<Section[]> {
    // this.log('SectionService: fetched sections');
    var a = this.http.get<Section[]>("http://salty-cove-22105.herokuapp.com/api/coursetest?query=govt 2306");
    console.log(a);
    return a;

    /*const sections = [
      { id: 11, name: "Govt 2305" },
      { id: 12, name: "Govt 2306" },
      { id: 13, name: "Ecs 3390" },
      { id: 14, name: "Cs 1200" },
      { id: 15, name: "Ecs 1100" },
      { id: 16, name: "Math 3323" },
      { id: 17, name: "Cs 33455" }
    ];
    return of(sections);*/
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getSection(id: number): Observable<Section> {
    // this.log(`SectionService: fetched section id=${id}`);
    const url = `${this.sectionsUrl}/${id}`;
    return this.http.get<Section>(url).pipe(tap(_ => this.log(`fetched section id=${id}`)), catchError(this.handleError<Section>(`getSection id=${id}`)));
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  updateSection(section: Section): Observable<any> {
    return this.http.put(this.sectionsUrl, section, this.httpOptions).pipe(tap(_ => this.log(`updated section id=${section.id}`)), catchError(this.handleError<any>('updateSection')));
  }

  addSection(section: Section): Observable<Section> {
    return this.http.post<Section>(this.sectionsUrl, section, this.httpOptions).pipe(tap((newSection: Section) => this.log(`added section with id=${newSection.id}`)), catchError(this.handleError<Section>('addSection')));
  }

  deleteSection(section: Section | number): Observable<Section> {
    const id = typeof section === 'number' ? section : section.id;
    const url = `${this.sectionsUrl}/${id}`;
    return this.http.delete<Section>(url, this.httpOptions).pipe(tap(_ => this.log(`deleted section id=${id}`)), catchError(this.handleError<Section>('deleteSection')));
  }

  searchSections(term: string): Observable<Section[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Section[]>(`${this.sectionsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found sections matching "${term}"`) :
        this.log(`no sections matching "${term}"`)),
      catchError(this.handleError<Section[]>('searchSections', []))
    );
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`SectionService: ${message}`);
  }
}