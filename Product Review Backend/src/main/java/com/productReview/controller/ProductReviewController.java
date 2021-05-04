package com.productReview.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.productReview.dto.EditProductDto;
import com.productReview.dto.ProductDto;
import com.productReview.dto.RatingReviewDTO;
import com.productReview.entity.Product;
import com.productReview.entity.ReviewAndRating;
import com.productReview.response.ProductResponse;
import com.productReview.service.IProductService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin
public class ProductReviewController {

	@Autowired
	IProductService productservice;

	@PostMapping("products/{imageName}")
	public ResponseEntity<ProductResponse> addProduct(@PathVariable String imageName, @RequestBody ProductDto information,@RequestHeader("token") String token) {
		
		boolean res=productservice.addProducts(imageName,information,token);
		if(res)
			return ResponseEntity.status(HttpStatus.CREATED).body(new ProductResponse(200, "Product Added Successfully.."));
		else
			return ResponseEntity.status(HttpStatus.CREATED).body(new ProductResponse(400, "The Product details not added "));
	}
	


	@GetMapping("products/")
	public ResponseEntity<ProductResponse> getProducts(@RequestHeader("token") String token) {
		List<Product> products = productservice.getProductInfo(token);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ProductResponse("The Product details are", products));
	}

	/**
	 * This controller is for getting 12 approval products per page! it can search product
	 * based on there autherName it can sort the product by anything like price,
	 * product_name, product_id etc, it can order the product both asc and desc order default
	 * will be desc order it can return the product based on there passing url
	 * paramater
	 * 
	 * @param searchByProductName example (" ", product name, raju, etc)
	 * @param page             Example (" ", 1,2,3,4.........)
	 * @param sortBy           example (" ", product_id, price, created_date_and_time
	 *                         etc)
	 * @param order            (" ", asc,desc,)
	 * @return 12 products and number of page and everything
	 */

	@GetMapping("products/approved")
	public ResponseEntity<ProductResponse> getAllApproved(@RequestParam Optional<String> searchByProductName,
			@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy,
			@RequestParam Optional<String> order) {
		Page<Product> products = productservice.getProductAproval(searchByProductName, page, sortBy, order);
		if (products != null)
			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.body(new ProductResponse("The Approved Product details are", products));
		else
			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.body(new ProductResponse(400, "No Approved Products available"));
	}
	
	@GetMapping(value = "products/getproduct/{productId}")
	public ResponseEntity<ProductResponse> getProductbyId(@PathVariable("productId") Long productId) {
		Product info = productservice.getProductbyId(productId);
		return ResponseEntity.status(HttpStatus.OK).body(new ProductResponse("The product is", info));
	}
	
	
	@PutMapping("products/{productId}")
	public ResponseEntity<ProductResponse> editProduct(@PathVariable("productId") long productId,@RequestBody EditProductDto information,@RequestHeader("token") String token){
		boolean res =productservice.editProduct(productId,information,token);
		if(res)
			return ResponseEntity.status(HttpStatus.CREATED).body(new ProductResponse(200, "The Product is Updated Successfully"));
		return null;
	}

	@DeleteMapping("products/{productId}")
	public ResponseEntity<ProductResponse> deleteProduct(@PathVariable long productId, @RequestHeader("token") String token) {
		boolean res = productservice.deleteProduct(productId, token);
		if (res)
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ProductResponse(202, "The Product is Deleted"));
		return null;
	}

	@PutMapping("products/{productId}/{status}")
	public ResponseEntity<ProductResponse> editProductStatus(@PathVariable long productId, @PathVariable String status,
			@RequestHeader("token") String token) {
		boolean res = productservice.editProductStatus(productId, status, token);
		if (res)
			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.body(new ProductResponse(202, "The Product Status is changed sucessfully.."));
		else
			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.body(new ProductResponse(400, "The Product Status is not updated.."));
	}



	@GetMapping("products/onHoldProducts")
	public ResponseEntity<ProductResponse> getAllOnHoldProducts(@RequestHeader("token") String token) {
		List<Product> products = productservice.getAllOnHoldProducts(token);
		if (products != null)
			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.body(new ProductResponse("The Approved & OnHold Product details are", products));
		else
			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.body(new ProductResponse(400, "No Approved & OnHold Products available"));
	}

	@GetMapping("products/rejectedProducts")
	public ResponseEntity<ProductResponse> getAllRejectedProducts(@RequestHeader("token") String token) {
		List<Product> products = productservice.getAllRejectedProducts(token);
		if (products != null)
			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.body(new ProductResponse("The Rejected Product details are", products));
		else
			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.body(new ProductResponse(400, "No Rejected Products available"));
	}
	@ApiOperation(value = "get all rating and reviews of the product ")
	@GetMapping("products/getratereviews")
	public ResponseEntity<ProductResponse> getProductRatingAndReview(@RequestParam Long productId){
		List<ReviewAndRating> rr = productservice.getRatingsOfProduct(productId);
		if(rr != null)
		 return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ProductResponse("Ratings and review", rr ));
		else
			 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ProductResponse("Ratings and review not found", rr ));	
	}
	
	@ApiOperation(value = "Get verified Products Count")
	@GetMapping("products/count")
	public ResponseEntity<ProductResponse> getProductsCount(){
		int productcount = productservice.getProductsCount();
			 return ResponseEntity.status(HttpStatus.OK).body(new ProductResponse("Ratings and review", productcount ));
			
	}
	
	@ApiOperation(value = "Write Review of the product")
	@PutMapping("products/ratingreview")
	public ResponseEntity<ProductResponse> writeReview(@RequestBody RatingReviewDTO rrDto,@RequestHeader(name="token") String token, @RequestParam Long productId){
		if(productservice.writeReviewAndRating(token, rrDto , productId))
		 return ResponseEntity.status(HttpStatus.OK).body(new ProductResponse("Thank you..for your review", 200 ));			
		else
			 return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(new ProductResponse("You are already given rate", 208 ));
			
	}
	
	@ApiOperation(value = "Average rating of the product")
	@GetMapping("products/avgrate")
	public ResponseEntity<ProductResponse> avgRatingOfProduct(@RequestParam long productId){
		double rate = productservice.avgRatingOfProduct(productId);
		if(rate>0.0)
		 return ResponseEntity.status(HttpStatus.OK).body(new ProductResponse("Avg rate", rate ));
		else

			return ResponseEntity.status(HttpStatus.OK).body(new ProductResponse("Avg rate", 0 ));
				
	}
	
	@ApiOperation(value = "Products sorted by rating")
	@GetMapping("products/sortbyrate")
	public ResponseEntity<ProductResponse> sortProductByRate(){
		List<Product> products = productservice.sortProductByRate();
		if(products!=null)
		 return ResponseEntity.status(HttpStatus.OK).body(new ProductResponse("products fetched", products ));
		else
			return ResponseEntity.status(HttpStatus.OK).body(new ProductResponse("products not fetched" , products));		
	}
	
	@PostMapping("products/productimage/{productId}")
	public ResponseEntity<ProductResponse> uploadImage(@RequestParam("imageFile") MultipartFile file,@RequestHeader String token,@PathVariable long productId)  {
		String imageName=file.getOriginalFilename();
	    boolean res=productservice.uploadProductImage(productId,imageName,token);
	     if(res)
	    	 return ResponseEntity.status(HttpStatus.OK).body(new ProductResponse(202, "Image Uploaded Succesfully"));
	     else
	    	 return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ProductResponse(203,"error")); 
	}

	

}
