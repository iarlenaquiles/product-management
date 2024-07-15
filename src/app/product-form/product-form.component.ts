import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean = false;
  productId: number = 0;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      categoryPath: ['', Validators.required],
      available: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEditMode = true;
      this.productService.get(this.productId).subscribe(product => {
        this.productForm.patchValue(product);
      });
    }
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.productService.update(this.productId, this.productForm.value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
