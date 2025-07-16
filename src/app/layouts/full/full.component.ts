import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
  visible: boolean;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );
  routerActive: string = 'activelink';
  sidebarMenu: sidebarMenu[] = [
    {
      link: '/criar',
      icon: 'file-plus',
      menu: 'Criar Eventos',
      visible: true,
    },
    {
      link: '/eventos',
      icon: 'calendar',
      menu: 'Eventos',
      visible: true,
    }
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
  }
}
