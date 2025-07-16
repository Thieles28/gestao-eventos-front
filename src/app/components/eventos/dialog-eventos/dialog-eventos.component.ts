import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Evento} from 'src/app/model/evento';
import {EventoService} from 'src/app/service/evento.service';

@Component({
  selector: 'app-dialog-autor',
  templateUrl: './dialog-eventos.component.html',
  styleUrls: ['./dialog-eventos.component.scss'],
})
export class DialogEventosComponent implements OnInit {
  declare evento: Evento;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { eventoId: number },
    private eventoService: EventoService
  ) {
  }

  ngOnInit(): void {
    this.consultarEvento();
  }

  consultarEvento() {
    if (this.data.eventoId != null) {
      this.eventoService.consultarEvento(this.data.eventoId).subscribe((evento: Evento) => {
        this.evento = evento;
      });
    }
  }
}
