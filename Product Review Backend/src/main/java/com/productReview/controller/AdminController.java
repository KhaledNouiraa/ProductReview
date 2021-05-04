package com.productReview.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.productReview.entity.Product;
import com.productReview.repository.ProductInterface;
import com.productReview.response.ProductResponse;
import com.productReview.service.IAdminService;

@RestController
@CrossOrigin("*")
public class AdminController {

	@Autowired
	private IAdminService adminService;
	
	@Autowired
	ProductInterface productRepo;

	@PutMapping("admin/update/{productId}")
	public ResponseEntity<ProductResponse> updateProductStatus(@PathVariable long productId, @RequestParam String status ,@RequestHeader String token) {
		if (adminService.verifyproduct(productId,status,token)) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ProductResponse("Seller product status updated by the admin", HttpStatus.ACCEPTED));
		}
		return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new ProductResponse(406,"Bad Response"));
	}
	
	
	
	@GetMapping("admin/products")
	public ResponseEntity<ProductResponse> getAllProductsByStatus(@RequestParam String status) {
		List<Product> products = adminService.getProductsByStatus(status);
		
			return ResponseEntity.status(HttpStatus.OK).body(new ProductResponse(status+" Products ", products));
		

	}
	
}