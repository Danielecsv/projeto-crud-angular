import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0.0
  };

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.readById(id).subscribe(product => {
      this.product = product;
   });
  }

  deleteProduct(): void {
    //Usar o ! para o probelma de declaraçao nula -> ta na página do chrome
    this.productService.delete(this.product.id!).subscribe(() => {
     this.productService.showMessage("Produto excluido com sucesso!");
     this.router.navigate(['/products']);
    });

  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
