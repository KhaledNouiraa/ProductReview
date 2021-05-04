package com.productReview.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.productReview.entity.Product;
import com.productReview.entity.Users;
import com.productReview.exception.AdminNotFoundException;
import com.productReview.exception.ProductNotFoundException;
import com.productReview.repository.CustomerRepository;
import com.productReview.repository.ProductImple;
import com.productReview.repository.ProductInterface;
import com.productReview.service.IAdminService;
import com.productReview.util.JwtGenerator;

@Service
public class AdminServiceImpl implements IAdminService {

//	@Autowired
//	private IOrderStatusRepository orderStatusRepo;
//
	@Autowired
	CustomerRepository userRepo;

	@Autowired
	JwtGenerator jwt;

	@Autowired
	private ProductImple productRepository;
	
	@Autowired
	ProductInterface productRepo; 

	@Override
	public boolean verifyproduct(long productId,String staus, String token) {
 
		long userid = 0;
		Users user = null;
			userid = jwt.parseJWT(token);
			System.out.println("user id:" + userid);
			user = userRepo.getCustomerDetailsbyId(userid);
			System.out.println("user:" + user);
	
		if (user != null) {
			Product product = productRepo.findByProductId(productId);
			System.out.println("productinfo "+product);
			
			if (product != null) {
				product.setStatus(staus);

				productRepo.save(product);
				return true;
				
			} else {
				throw new ProductNotFoundException("Product Not Found");
			}

		} else {
			throw new AdminNotFoundException("Admin Not Found");
		}
	}

		@Override
	public List<Product> getProductsByStatus(String status) {
		
		return productRepo.findByStatus(status);
	}



	


}
