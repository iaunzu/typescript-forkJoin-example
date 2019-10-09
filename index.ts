import { of, forkJoin } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const observer = x => appDiv.innerHTML += `<br>${JSON.stringify(x)}`

const getPersona = (personaId: number) => of({personaId, coches: null}).pipe(delay(1000));
const getCoches  = (personaId: number) => of([{cocheId: 41}]).pipe(delay(500));

console.time();
const id = 1;
forkJoin(getPersona(id), getCoches(id)).pipe(
  tap(() => console.timeEnd()),
  tap(([pers, coches]) => pers.coches = coches),
  map(([pers, coches]) => pers)
).subscribe(observer);
