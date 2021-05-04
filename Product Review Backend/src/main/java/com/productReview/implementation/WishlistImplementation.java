package com.productReview.implementation;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.productReview.entity.Product;
import com.productReview.entity.Users;
import com.productReview.entity.WishlistProduct;
import com.productReview.repository.ProductImple;
import com.productReview.repository.UserRepository;
import com.productReview.service.IWishlistService;
import com.productReview.util.JwtGenerator;
@Service
public class WishlistImplementation implements IWishlistService {
	@Autowired
	private JwtGenerator generate;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ProductImple productRepository;


	Users user=new Users();
	private  boolean notifyWishproducts;
	
	

	public boolean isNotifyWishproducts() {
		return notifyWishproducts;
	}

	public void setNotifyWishproducts(boolean notifyWishproducts) {
		this.notifyWishproducts = notifyWishproducts;
	}

	
	
	public Users wishproducts(Product product,Users user) {
		
		WishlistProduct wishproduct =new WishlistProduct();
		ArrayList<Product> productlist = new ArrayList<>();
		productlist.add(product);
		wishproduct.setWishlistTime(LocalDateTime.now());
		wishproduct.setProductsList(productlist);
		user.getWishlistProduct().add(wishproduct);
		return user;
		
	}

	@Override
	@Transactional
	public List<WishlistProduct> getWishlistProducts(String token) {
		Long id;
	
			id = (long) generate.parseJWT(token);
			Users user = userRepository.findById(id).get();
			if(user!=null) {
			List<WishlistProduct> wishProducts = user.getWishlistProduct();
			List<WishlistProduct> productsinWish=new ArrayList<>();
			  for(WishlistProduct product:wishProducts) {
				  if(!(product.getProductsList().isEmpty())) {
					  productsinWish.add(product);
					   
					  
					  }
				  Product productstackdeatils;
				 for( Product productstack:product.getProductsList()) {
				Long l=	 productstack.getNoOfproduct();
				int i=l.intValue();
				 if(i==0) {
					 productstackdeatils=productstack;
					setNotifyWishproducts(false);
				 }
				 }

				  
				 
			  }
			
		     return productsinWish;
			}
			//write here exception........
		return null;
	}

	@Override
	@Transactional
	public boolean removeWishProduct(String token, Long productId) {
		
		Long id;
			id = (long) generate.parseJWT(token);
			Users user = userRepository.findById(id).get();
			if(user!=null) {
			Product product = productRepository.findById(productId).get();
			if(product!=null) {
	
			for (WishlistProduct  wishlist : user.getWishlistProduct()) {
				boolean exitsInWishlist = wishlist.getProductsList().stream()
						.noneMatch(products -> products.getProductId().equals(productId));
				if (!exitsInWishlist) {
					userRepository.save(user);
					wishlist.getProductsList().remove(product);
					wishlist.getProductsList().clear();
					boolean users = userRepository.save(user).getWishlistProduct()
					!= null ? true : false;
					if (user != null) {
						return users;
					}
				}
			}}//product
			//product exception
			
			}//user
			//exception user
		
		return false;
	}

	@Override
	@Transactional
	public int getCountOfWishlist(String token) {
		Long id;
			id = (long) generate.parseJWT(token);
         int countOfWishList=0;
		Users user = userRepository.findById(id).get();
		if(user!=null)
		{
		List<WishlistProduct> wishlist = user.getWishlistProduct();
         for(WishlistProduct wishproduct:wishlist) {
        	 if(!wishproduct.getProductsList().isEmpty()) {
        		 countOfWishList++;
        	 }
         }
		return countOfWishList;
		}
		//write here exception...................
		
		return 0;
		}

	@Override
	public List<WishlistProduct> addwishProduct(String token, long ProductId) {
		// TODO Auto-generated method stub
		return null;
	}

	
	
	
	
}