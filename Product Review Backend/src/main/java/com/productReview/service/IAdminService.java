package com.productReview.service;

import java.util.List;

import com.productReview.entity.Product;


public interface IAdminService {
	

	boolean verifyproduct(long productId, String staus, String token);


	List<Product> getProductsByStatus(String status);


}
