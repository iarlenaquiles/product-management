import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// import { Product } from '../product';
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryPath: string;
  available: boolean;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'price', 'categoryPath', 'available', 'actions'];
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  products: Product[]= [];

  constructor(private productService: ProductService, private router: Router) {
    this.dataSource = new MatTableDataSource<Product>([]);
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAll().subscribe((data: Product[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe(() => {
      this.fetchProducts();
    });
  }
}
