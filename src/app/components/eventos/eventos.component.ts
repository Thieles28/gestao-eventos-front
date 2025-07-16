import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {Evento} from '../../model/evento';
import {DialogEventosComponent} from './dialog-eventos/dialog-eventos.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EventoService} from "../../service/evento.service";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements AfterViewInit {
  displayedColumns: string[] = ['titulo', 'descricao', 'dataHoraEvento', 'localEvento', 'acoes'];
  declare eventos: Array<Evento>;
  dataSource = new MatTableDataSource<Evento>();

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private eventosService: EventoService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.listarEventos();
  }

  listarEventos() {
    this.eventosService.listarEventos().subscribe({
      next: (eventos: Evento[]) => {
        if (eventos) {
          this.dataSource.data = eventos;
        }
      },
      error: (erro) => {
        console.error(erro);
      },
    });
  }

  visualizarEvento(id: Number) {
    const dialogRef = this.dialog.open(DialogEventosComponent, {
      data: {eventoId: id},
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  atualizarEvento(id: Number) {
    this.router.navigate(['/atualizar', id]);
  }

  removerEvento(id: Number) {
    this.eventosService.removerEvento(id).subscribe(() => {
      this._snackBar.open('Evento removido com sucesso!', 'Fechar', {
        panelClass: 'success-snackbar',
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.listarEventos();
    });
  }
}
