package com.productReview.service;

import java.util.List;

import com.productReview.entity.WishlistProduct;



public interface IWishlistService {
	List<WishlistProduct> addwishProduct(String token,long ProductId);
	
	List<WishlistProduct> getWishlistProducts(String token);
	
	boolean removeWishProduct(String token, Long ProductId);
	
	int getCountOfWishlist(String token);

}
