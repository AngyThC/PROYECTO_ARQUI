import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Customer } from 'src/app/models/customer';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetails } from 'src/app/models/orderdetail';
import { OrderdetailsService } from 'src/app/services/orderdetails.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  order: Order = new Order();
  orderdetail: OrderDetails = new OrderDetails();
  orderDatatable: any = [];
  orderDetailDatatable: any = [];
  customer: Customer = new Customer();
  Customers: string[] = [];
  Drinks: string[] = [];
  Dishes: string[] = [];

  constructor(private orderService: OrderService, private orderdetailservice: OrderdetailsService) { }

  ngOnInit(): void {
    this.loadOrderData();
    this.loadOrderDetailData();
    this.loadClientes();
    this.loadDrinks();
    this.loadDishes();
  }

  generatePDF(): void {
    // Verificar el estado de la orden antes de generar la factura
    if (this.order.Status === 'DESACTIVADO') {
      alert('No se puede generar la factura porque la orden está DESACTIVADA.');
      return; // No generar factura si la orden está DESACTIVADA
    }
  
    // Código para generar el PDF
    const orderDetailsForInvoice = this.getOrderDetailsByOrderId(this.order.OrderID);
    this.generateInvoicePDF(this.order, orderDetailsForInvoice);
  }
  
  generateInvoicePDF(order: Order, orderDetails: OrderDetails[]): void {
    const pdf = new jsPDF();
    
    // Contenido de la factura para la orden
    const orderContent = `
      ID ORDEN: ${order.OrderID}
      Tipo de Orden: ${order.TypeOrder}
      Nombre Cliente: ${order.Name_Customer}
      Descripcion: ${order.DescriptionOrder}
      Estado de orden: ${order.Status}
    `;
  
    // Configuración de la tabla de detalles
    const columns = ["Order Details ID", "Dish ID", "Quantity Dish", "Drink ID", "Quantity Drink", "Total Amount", "Order ID"];
    const data = orderDetails.map(detail => [detail.OrderDetailsID, detail.DishID, detail.QuantityDish, detail.DrinkID, detail.QuantityDrink, detail.TotalAmount, detail.OrderID]);
  
    // Calcular el total de la factura
    const totalAmount = orderDetails.reduce((total, detail) => total + detail.TotalAmount, 0);
  
    // Agregar contenido de la orden al PDF
    pdf.text(orderContent, 10, 10);
  
    // Agregar algunos espacios
    pdf.text('', 10, 20);
  
    // Agregar tabla de detalles
    autoTable(pdf, {
      startY: 60,
      head: [columns],
      body: data,
    });
  
    // Calcular y agregar la suma de los totales
    const totalSumText = `Total Compra: ${totalAmount}`;
    pdf.text(totalSumText, 10, 10);
  
    // Guardar o abrir el PDF
    pdf.save('invoice.pdf');
  }


  loadOrderData() {
    this.orderService.GetOrder().subscribe((res: any) => {
      this.orderDatatable = res;
    });
  }

  loadOrderDetailData() {
    this.orderdetailservice.GetDetails().subscribe((res: any) => {
      this.orderDetailDatatable = res;
    });
  }

  addOrder(order: Order): void {
    console.log(order);
    this.orderService.AddOrder(order).subscribe(res => {
      if (res) {
        alert(`La orden se ha registrado correctamente`);
        this.clearOrder();
        this.loadOrderData();
      } else {
        alert('Error de registro');
      }
    });
  }

  addOrderDetail(orderdetail: OrderDetails): void {
    console.log(orderdetail);
    this.orderdetailservice.AddDetails(orderdetail).subscribe(res => {
      if (res) {
        alert(`El detalle de orden se ha registrado correctamente`);
        this.clearOrderDetail();
        this.loadOrderDetailData();
      } else {
        alert('Error de registro');
      }
    });
  }

  updateOrder(order: Order): void {
    this.orderService.Updateorder(order.OrderID, order).subscribe(res => {
      if (res) {
        alert(`La orden se ha modificado correctamente`);
        this.clearOrder();
        this.loadOrderData();
      } else {
        alert('ERROR');
      }
    });
  }

  onChangeState(order: Order): void {
    order.Status = (order.Status === 'ACTIVO') ? 'DESACTIVADO' : 'ACTIVO';
  
    // Llamada al servicio para actualizar el estado en la base de datos
    this.orderService.Updateorder(order.OrderID, order).subscribe(res => {
      if (res) {
        alert(`El estado de la orden ${order.DescriptionOrder} se ha actualizado a ${order.Status}`);
        this.clearOrder();
        this.loadOrderData();
      } else {
        alert('Error de actualización');
      }
    });
  }
  
  updateOrderDetail(orderdetail: OrderDetails): void {
    this.orderdetailservice.UpdateDetails(orderdetail.OrderDetailsID, orderdetail).subscribe(res => {
      if (res) {
        alert(`El detalle orden se ha modificado correctamente`);
        this.clearOrderDetail();
        this.loadOrderDetailData();
      } else {
        alert('ERROR');
      }
    });
  }

  onSetOrderData(select: any) {
    this.order.OrderID = select.OrderID;
    this.order.TypeOrder = select.TypeOrder;
    this.order.Name_Customer = select.Name_Customer;
    this.order.DescriptionOrder = select.DescriptionOrder;
    this.orderdetail.OrderID = select.OrderID;
    this.order.Status = select.Status;
  }

  onSetOrderDetailData(select: any) {
    this.orderdetail.OrderDetailsID = select.OrderDetailsID;
    this.orderdetail.DishID = select.DishID;
    this.orderdetail.QuantityDish = select.QuantityDish;
    this.orderdetail.DrinkID = select.DrinkID;
    this.orderdetail.QuantityDrink = select.QuantityDrink;
    this.orderdetail.TotalAmount = select.TotalAmount;
    this.orderdetail.OrderID = select.OrderID;
  }

  clearOrder() {
    this.order.OrderID = 0;
    this.order.TypeOrder = '';
    this.order.Name_Customer = '';
    this.order.DescriptionOrder = '';
    this.order.Status = '';
  }

  clearOrderDetail() {
    this.orderdetail.OrderDetailsID = 0;
    this.orderdetail.DishID = '';
    this.orderdetail.QuantityDish = 0;
    this.orderdetail.DrinkID = '';
    this.orderdetail.QuantityDrink = 0;
    this.orderdetail.TotalAmount = 0;
    this.orderdetail.OrderID = 0;
  }

  // Funciones para limpiar
  clearOrderAndDetail() {
    this.clearOrder();
    this.clearOrderDetail();
  }

  loadClientes() {
    this.orderService.loadCliente().subscribe((res: any) => {
      this.Customers = res.map((item: any) => item.Name_Customer);
    });
  }

  loadDrinks() {
    this.orderService.loadDrinks().subscribe((res: any) => {
      this.Drinks = res.map((item: any) => item.DrinkName);
    });
  }

  loadDishes() {
    this.orderService.loadDishes().subscribe((res: any) => {
      this.Dishes = res.map((item: any) => item.DishName);
    });
  }

  getOrderDetailsByOrderId(orderId: number): OrderDetails[] {
    return this.orderDetailDatatable.filter((detail: OrderDetails) => detail.OrderID === orderId);
  }
}
