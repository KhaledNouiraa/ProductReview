package com.productReview.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.productReview.entity.WishlistProduct;
import com.productReview.response.Response;
import com.productReview.service.IWishlistService;

@RestController

@CrossOrigin("*")
public class WishlistController {
	@Autowired
	private IWishlistService wishproductService;

	@PostMapping("productstore/v3/wishlist/addproductWishlist/{productId}")
	public ResponseEntity<Response> addProductsToWish(@RequestHeader String token, @PathVariable long productId)
			throws Exception {
		List<WishlistProduct> wishproduct = wishproductService.addwishProduct(token, productId);
		return ResponseEntity.status(HttpStatus.ACCEPTED)
				.body(new Response("product is added to wishlist Bag", 200, wishproduct));
	}

	@GetMapping("productstore/v3/wishlist/getwishproducts")
	public ResponseEntity<Response> getProductsfromWish(@RequestHeader(name = "token") String token) throws Exception {
		List<WishlistProduct> wishproduct = wishproductService.getWishlistProducts(token);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response(" wishlist Bag is fetched", 200, wishproduct));
	}

	@DeleteMapping("productstore/v3/wishlist/removeWishlist/{productId}")
	public ResponseEntity<Response> removeProductsToWish(@RequestHeader String token, @PathVariable Long productId)
			throws Exception {
		boolean wishproduct = wishproductService.removeWishProduct(token, productId);
		if (wishproduct != false) {
			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.body(new Response("product romoved from wishlist Bag", 200, wishproduct));
		}
		return ResponseEntity.status(HttpStatus.ACCEPTED)
				.body(new Response("there no product found to remove", 200, wishproduct));

	}

	@GetMapping("productstore/v3/wishlist/wishlistcount")
	public ResponseEntity<Response> getWishProductsCount(@RequestHeader(name = "token") String token) throws Exception {
		int wishproductCount = wishproductService.getCountOfWishlist(token);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("no of wishproducts", 200, wishproductCount));
	}
}