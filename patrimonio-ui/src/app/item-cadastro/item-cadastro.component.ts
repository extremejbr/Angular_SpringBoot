import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';



import { ItemService } from '../item.service';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-item-cadastro',
  templateUrl: './item-cadastro.component.html',
  styleUrls: ['./item-cadastro.component.css'],
  providers: [MessageService]
})
export class ItemCadastroComponent implements OnInit {

  // itens = [
  //   { etiqueta: 'AA1234', descricao: 'Notebook', dataAquisicao: new Date() },
  //   { etiqueta: 'BB9876', descricao: 'Mouse', dataAquisicao: new Date() },
  // ];

  editarItem = [];
  itens = [];
  msgsBar: Message[] = [];
  msgs: Message[] = [];

  idItemEditar = 0;
  dataAquisicaoItemeditar: Date;
  buttonAdicionar = true;
  buttonAtualizar = false;

  constructor(private itemService: ItemService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.consultar();

  }

  consultar() {
    this.itemService.listar().subscribe(dados => this.itens = dados);
  }

  adicionar(frm: FormControl) {
    console.log(frm.value);

    this.itemService.adicionar(frm.value)
      .subscribe(() => {
        this.showSuccessAdicionar(frm.value.etiqueta);
        frm.reset();
        this.consultar();

      });
  }

  excluir(itemID) {
    this.confirmationService.confirm({
      message: 'Você deseja excluir o Item?',
      header: 'Confirmar Exclução Item ' + itemID,
      icon: 'fa fa-trash',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmado ', detail: 'Item ' + itemID + ' Excluído!' }];
        this.itemService.excluir(itemID)
          .subscribe(() => {
            // this.showSuccessExcluir(itemID);
            this.consultar();
          });
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Cancelado', detail: 'Item não excluído!' }];
      }
    });
  }

  editar(itemID) {

    this.itemService.buscar(itemID)
      .subscribe(dados => {
        this.editarItem = dados[0];
        this.idItemEditar = dados[0].id;
        let etiqueta = dados[0].etiqueta;
        let descricao = dados[0].descricao;
        let dataAquisicao = dados[0].dataAquisicao;
        console.log(this.editarItem);

        this.dataAquisicaoItemeditar = new Date(dataAquisicao);
        this.buttonAdicionar = false;
        this.buttonAtualizar = true;


      });
  }

  atualizar(frm: FormControl, itemId) {
    console.log(frm.value);

    this.itemService.editar(frm.value, itemId)
      .subscribe(() => {
        this.showSuccessAtualizar(frm.value.etiqueta);
        frm.reset();
        this.consultar();

        this.buttonAdicionar = true;
        this.buttonAtualizar = false;

      });
  }

  cancelar(frm: FormControl) {
    frm.reset();
    this.buttonAdicionar = true;
    this.buttonAtualizar = false;
  }

  showSuccessAdicionar(etiqueta) {
    // this.msgs = [];
    this.msgsBar.push({ severity: 'success', summary: 'Item ' + etiqueta + ' adicionado com sucesso.', detail: '' });
  }

  showSuccessAtualizar(etiqueta) {
    // this.msgs = [];
    this.msgsBar.push({ severity: 'success', summary: 'Item ' + etiqueta + ' atualizado com sucesso.', detail: '' });
  }
  
  showSuccessExcluir(etiqueta) {
    // this.msgs = [];
    this.msgsBar.push({ severity: 'success', summary: 'Item ' + etiqueta + ' excluído com sucesso.', detail: '' });
  }

  showViaService() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
  }

}
