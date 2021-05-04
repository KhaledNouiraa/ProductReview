package com.productReview.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.productReview.dto.EditProductDto;
import com.productReview.dto.ProductDto;
import com.productReview.dto.RatingReviewDTO;
import com.productReview.entity.Product;
import com.productReview.entity.ReviewAndRating;

public interface IProductService {

	boolean addProducts(String imageName, ProductDto information, String token);

	List<Product> getProductInfo(String token);

	List<Product> sortGetAllProducts();

	List<Product> sorting(boolean value);

	List<Product> findAllPageBySize(int pagenumber);

	Product getProductbyId(Long productId);

	Product getTotalPriceofProduct(Long productId, long quantity);

	boolean editProduct(long productId, EditProductDto information, String token);

	boolean deleteProduct(long productId, String token);

	List<Product> getAllAprovedProduct();

	boolean editProductStatus(long productId, String status, String token);

	List<Product> getAllOnHoldProducts(String token);

	List<Product> getAllRejectedProducts(String token);

	boolean writeReviewAndRating(String token, RatingReviewDTO rrDTO, Long productId);

	List<ReviewAndRating> getRatingsOfProduct(Long productId);

	Integer getProductsCount();

	double avgRatingOfProduct(Long productId);

	Page<Product> getProductAproval(Optional<String> searchBy, Optional<Integer> page, Optional<String> sortBy,
			Optional<String> order);

	boolean uploadProductImage(long productId, String imageName, String token);

	List<Product> sortProductByRate();
}