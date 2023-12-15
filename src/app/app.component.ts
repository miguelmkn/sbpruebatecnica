import { Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Pedido, producto } from './Producto'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  mostrarElementonuevo = false;
  consultaelemnto = false;
  tabaladatos = false;
  title = 'ptl';
  fechaYHora: string = "";
  listaElementos: producto[] = [];
  articulo: string =""; 
  PrecioArticulo: number = 0; 
  Cantidadarticulos: number = 0 ; 
  @ViewChild("nombrescliente")  nombreclientess!: ElementRef;
  @ViewChild("articulo")  articulos!: ElementRef;
  @ViewChild("PrecioArticulo")  PrecioArticulos!: ElementRef;
  @ViewChild("Cantidadarticulos")  Cantidadarticuloss!: ElementRef;
  @ViewChild("subtotal")  subtotals!: ElementRef;
  @ViewChild("IVA")  IVAs!: ElementRef;
  @ViewChild("Total")  Totals!: ElementRef;
  @ViewChild("dpInicio")  dpInicios!: ElementRef;
  @ViewChild("dpFin")  dpFins!: ElementRef;
  Subtotal: number = 0;
  iva:number = 0;
  Total:number = 0;
  listainfromacion: Pedido[] = [];
  listainfromacionfiltrada: Pedido[] = [];

  obtenerValores(vae:Pedido){
    const fechaHoraActual = new Date();
    const formatoFechaHora = this.formatoFechaHora(fechaHoraActual);
    let listainfromacionfiltradaupdate: Pedido[] = [];
    const objetoafiltrar: Pedido[]=this.listainfromacion;
    const indice = objetoafiltrar.findIndex(objeto => objeto.Id === vae.Id);
    if (indice !== -1) {
      objetoafiltrar[indice].estatus = false;
      objetoafiltrar[indice].Fechaelim = formatoFechaHora;
    }
    listainfromacionfiltradaupdate = objetoafiltrar;
  }
  
  alta(){

    this.mostrarElementonuevo = true;
    this.consultaelemnto = false;
    this.tabaladatos = false;
    const fechaHoraActual = new Date();
    const formatoFechaHora = this.formatoFechaHora(fechaHoraActual);
    this.fechaYHora = formatoFechaHora;

  }

  Modificacion(){
    this.mostrarElementonuevo = false;
    this.consultaelemnto = true;
  };

  cargaproductos(){
    const p1: string = this.articulos.nativeElement.value;
    const p2: number = this.PrecioArticulos.nativeElement.value;
    const p3: number = this.Cantidadarticuloss.nativeElement.value;
    let iva1articulo: number = 0; 
    let ivatodosarticulos: number = 0; 
    let subtotal1articulo: number = 0; 
    let subtotaltodoslosarticulos: number = 0; 
    let totaltodoslossarticulos: number = 0; 

    const nuevoElemento: producto = {   
      nombreproducto: p1,
      precio: p2,
      cantidad:p3
    };
    this.listaElementos.push(nuevoElemento);

    iva1articulo = p2*.16;
    ivatodosarticulos = iva1articulo*p3;
    subtotal1articulo = p2-iva1articulo;
    subtotaltodoslosarticulos = subtotal1articulo*p3;
    totaltodoslossarticulos = p2*p3;

    this.Subtotal = this.Subtotal + subtotaltodoslosarticulos;
    this.iva = this.iva + ivatodosarticulos;
    this.Total = this.Total + totaltodoslossarticulos

    this.articulos.nativeElement.value = "";
    this.PrecioArticulos.nativeElement.value = 0;
    this.Cantidadarticuloss.nativeElement.value = 0;

    this.subtotals.nativeElement.value = this.Subtotal;
    this.IVAs.nativeElement.value = this.iva;
    this.Totals.nativeElement.value = this.Total;

  };

  newpedidos(){
    let id = this.fechaYHora.trim();
    id = id.replace(/:/g,'');
    id = id.replace(/0/g,'');

    const nuevoElemento: Pedido = {   
      Id:id.toString(),
      Fechacrea:this.fechaYHora,
      Fechaelim:"",
      Ciente:this.nombreclientess.nativeElement.value,
      prodcutospedido: this.listaElementos,
      subtotal:this.Subtotal,
      iva:this.iva,
      total:this.Total,
      estatus:true
    };

    this.listainfromacion.push(nuevoElemento);
    
    this.fechaYHora = "";
    this.listaElementos = [];
    this.articulo = ""; 
    this.PrecioArticulo = 0; 
    this.Cantidadarticulos = 0 ; 
    this.Subtotal = 0;
    this.iva = 0;
    this.Total = 0;
    this.nombreclientess.nativeElement.value = "";
    this.articulos.nativeElement.value = "";
    this.PrecioArticulos.nativeElement.value = "1";
    this.Cantidadarticuloss.nativeElement.value = "1";
    this.subtotals.nativeElement.value = "0"
    this.IVAs.nativeElement.value = "0"
    this.Totals.nativeElement.value = "0"

  

  };

  formatoFechaHora(fecha: Date): string {
    // Corregir el tipo de las opciones
    const year = fecha.getFullYear();
    const month = this.agregarCero(fecha.getMonth() + 1);
    const day = this.agregarCero(fecha.getDate());
    const hours = this.agregarCero(fecha.getHours());
    const minutes = this.agregarCero(fecha.getMinutes());
    const seconds = this.agregarCero(fecha.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  agregarCero(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
  }


  Consultapedidos(){

    const fechaFiltroinicio: string = this.dpInicios.nativeElement.value.toString();
    const fechaFiltrofin: string = this.dpFins.nativeElement.value.toString();
    const objetoafiltrar: Pedido[]=this.listainfromacion;
    const objetoafiltro1: Pedido[]=objetoafiltrar.filter(objeto => this.compararFechas(objeto.Fechacrea, fechaFiltroinicio) > 0);
    const objetoafiltro2: Pedido[]=objetoafiltro1.filter(objeto => this.compararFechas(objeto.Fechacrea, fechaFiltrofin) < 0);
    this.listainfromacionfiltrada = objetoafiltro2;
    this.tabaladatos = true;
  };

  compararFechas(fecha1: string, fecha2: string): number {
    const date1: Date = new Date(fecha1);
    const date2: Date = new Date(fecha2);

    return date1.getTime() - date2.getTime();
  }



}
