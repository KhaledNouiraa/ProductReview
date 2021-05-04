package com.productReview.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.productReview.entity.Product;
import com.productReview.entity.ReviewAndRating;
@Repository
public interface ProductImple extends JpaRepository<Product, Long> {
	
	@Query("from Product where product_id=:id")
	Product fetchbyId(Long id);
	
	@Query( value = "select * from product", nativeQuery = true)
    List<Product> findAllPage(Pageable pageable);
	
	@Query("from Product where product_id=:id ")
	List<Product> fetchbyIdList(Long id);
	
	@Modifying
	@Query("delete from Product where product_id=:id")
	void deleteByProductId(long id);
	
	@Query( value = "select * from productinfo where  status='approved'", nativeQuery = true)
    List<Product> getApprovedProducts();
	
	@Query( value = "select * from productinfo where product_name like %?1% AND status='approved'", nativeQuery = true)
    Page<Product> findByProductName(String name, Pageable pageable);
	
	@Query( value = "select * from productinfo where status='OnHold'", nativeQuery = true)
    List<Product> getAllonHoldProducts();
	
	@Query( value = "select rating and review from review_and_rating where product_id=:id", nativeQuery = true)
	List<ReviewAndRating> reviews(Long id);
	
	@Query( value = "select avg(rating) from review_and_rating where product_id=:id", nativeQuery = true)
    double avgRateOfProduct(long id);

	@Modifying
	@Query("update from Product set status=:status where product_id=:id")
	int updateProductStatusByProductId(String status,long id);
	
	@Query( value = "select * from productinfo where user_id=:id", nativeQuery = true)
    List<Product> getAllProducts(long id);
	
	@Query( value = "select * from productinfo where status='approved'", nativeQuery = true)
    List<Product> getAllApprovedProducts();

	@Query( value = "select * from productinfo where status='onhold'", nativeQuery = true)
	List<Product> getAllOnHoldProducts();
	
	@Query( value = "select * from productinfo where status='rejected'", nativeQuery = true)
	List<Product> getAllRejectedProducts();

	@Query("from Product where product_name=:name")
	Product fetchbyProductName(String name);
}