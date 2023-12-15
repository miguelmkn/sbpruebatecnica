export interface Pedido{
    Id:string;
    Fechacrea:string;
    Fechaelim:string;
    Ciente:string;
    prodcutospedido: Array<producto>;
    subtotal:number;
    iva:number;
    total:number;
    estatus:boolean;
}

export interface producto {
    nombreproducto: string;
    precio: number;
    cantidad:number;
}





