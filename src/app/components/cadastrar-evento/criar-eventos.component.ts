import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EventoService} from '../../service/evento.service';
import {Evento} from '../../model/evento';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-cadastrar-evento',
  templateUrl: './criar-eventos.component.html',
  styleUrls: ['./criar-eventos.component.scss'],
})
export class CriarEventosComponent implements OnInit {
  declare id: number;
  declare eventosForm: FormGroup;
  mensagem: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private eventosService: EventoService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.consultarEvento();
  }

  initializeForm() {
    this.eventosForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dataHoraEvento: ['', Validators.required],
      localEvento: ['', Validators.required]
    });
  }

  cadastrarEvento() {
    this.eventosService.cadastrarEvento(this.eventosForm.value).subscribe({
      next: (evento: Evento) => {
        if (evento) {
          this.showMessage(3000);
          this.resetForm();
        }
      },
      error: (erro) => {
        this._snackBar.open(
          'Erro ao criar um evento.',
          'Fechar',
          {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          }
        );
      },
    });
  }

  resetControl(control: AbstractControl | null) {
    if (control) {
      control.setValue(null);
      control.clearValidators();
      control.updateValueAndValidity({onlySelf: true, emitEvent: false});
    }
  }

  resetForm() {
    Object.keys(this.eventosForm.controls).forEach((key) => {
      const control = this.eventosForm.get(key);
      this.resetControl(control);
    });
  }

  atualizarEvento() {
    if (this.eventosForm.valid) {
      this.eventosService.atualizarEvento(this.id, this.eventosForm.value).subscribe({
        next: (evento: Evento) => {
          if (evento) {
            this.showMessage(3000);
            this.eventosForm.patchValue(evento);
            this.router.navigate(['/eventos']);
          }
        },
        error: () => {
          this._snackBar.open('Erro ao criar um evento.', 'Fechar', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
      });
    }
  }

  showMessage(duration: number): void {
    this.mensagem = true;

    setTimeout(() => {
      this.mensagem = false;
    }, duration);
  }

  private async consultarEvento(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id !== null) {
        this.id = parseInt(id, 10);
        this.eventosForm.patchValue(
          await firstValueFrom(this.eventosService.consultarEvento(this.id))
        );
      }
    });
  }
}
