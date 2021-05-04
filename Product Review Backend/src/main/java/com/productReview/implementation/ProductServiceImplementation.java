package com.productReview.implementation;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.productReview.dto.EditProductDto;
import com.productReview.dto.ProductDto;
import com.productReview.dto.RatingReviewDTO;
import com.productReview.entity.Product;
import com.productReview.entity.ReviewAndRating;
import com.productReview.entity.Users;
import com.productReview.exception.ProductAlreadyExist;
import com.productReview.exception.UserException;
import com.productReview.repository.AddressRepository;
import com.productReview.repository.IUserRepository;
import com.productReview.repository.ProductImple;
import com.productReview.repository.ReviewRatingRepository;
import com.productReview.response.EmailData;
import com.productReview.service.IProductService;
import com.productReview.util.EmailProviderService;
import com.productReview.util.JwtGenerator;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProductServiceImplementation implements IProductService {
	
	private static Logger log = Logger.getLogger(ProductServiceImplementation.class);

	private Product productinformation = new Product();
	private ModelMapper modelMapper = new ModelMapper();
	
	@Autowired
	private EmailProviderService em; 
	@Autowired
	private EmailData emailData;

	@Autowired
	private ProductImple repository;

	@Autowired
	private IUserRepository userRepository;
	@Autowired
	AddressRepository addrepository;

	@Autowired
	private JwtGenerator generate;

	
	@Autowired
	private ReviewRatingRepository rrRepository;

    @Autowired
    private  WishlistImplementation WishServiceNotify;
	
	@Transactional
	@Override

	public boolean addProducts(String imageName,ProductDto information,String token)
	{	
		Long id;
	
			id = (long) generate.parseJWT(token);
			Users userInfo = userRepository.getUserById(id);
			if(userInfo != null) 
			{			
				String userRole = userInfo.getRole();
				System.out.println("actual Role is " + userRole);
				String fetchRole = userRole;
				if (fetchRole.equals("seller") ) 
				{
					Product product=repository.fetchbyProductName(information.getProductName());
					System.out.println("Product name "+information.getProductName());
					if(product ==null)
					{
						productinformation = modelMapper.map(information, Product.class);
						productinformation.setProductName(information.getProductName());
						productinformation.setAuthorName(information.getAuthorName());
						productinformation.setPrice(information.getPrice());  
						productinformation.setImage(imageName);
						productinformation.setStatus("OnHold");
						productinformation.setNoOfproduct(information.getNoOfProducts());
						productinformation.setCreatedDateAndTime(LocalDateTime.now());
						productinformation.setUserId(id);
						repository.save(productinformation);
						return true;
					}
					else
					{
						throw new ProductAlreadyExist("Product is already exist Exception..");
					}
				}
				else 
				{
					throw new UserException("Your are not Authorized User");
				}
			
		} else {
			throw new UserException("User doesn't exist");
		}

	}

	@Transactional
	@Override
	public List<Product> getProductInfo(String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) { 
			List<Product> products = repository.getAllProducts(id);
			return products;
		} else {
			throw new UserException("User doesn't exist");
		}

	}

	public double getOriginalPrice(double price, long quantity) {
		long result = (long) (price / quantity);
		return result;
	}

	@Override
	public Product getTotalPriceofProduct(Long productId, long quantity) {
		Product productinfo = repository.fetchbyId(productId); 
		double Price = productinfo.getPrice();

		long Quantity = quantity;

		if (Quantity <= productinfo.getNoOfproduct() || Quantity >= productinfo.getNoOfproduct()) {
			if (productinfo != null && quantity > 0) {
				double price = getOriginalPrice(Price, productinfo.getNoOfproduct());
				double totalPrice = (price * Quantity);
				productinfo.setNoOfproduct(quantity);

				productinfo.setNoOfproduct(quantity);

				productinfo.setPrice(totalPrice);
				repository.save(productinfo);
				return productinfo;
			} else if (productinfo != null && quantity < 1) {
				double price = getOriginalPrice(Price, productinfo.getNoOfproduct());
				double totalPrice = (price * 1);
				productinfo.setNoOfproduct(quantity);
				productinfo.setPrice(totalPrice);
				repository.save(productinfo);
				return productinfo;
			}
		}
		return null;
	}

	@Transactional
	@Override
	public List<Product> sortGetAllProducts() {
		List<Product> list = repository.findAll();
		list.sort((Product product1, Product product2) -> product1.getCreatedDateAndTime().compareTo(product2.getCreatedDateAndTime()));
		return list;
	}

	@Override
	public List<Product> sorting(boolean value) {
		List<Product> list = repository.findAll();
		if (value == true) {
			list.sort((Product product1, Product product2) -> product1.getPrice().compareTo(product2.getPrice()));
			return list;
		} else {
			list.sort((Product product1, Product product2) -> product1.getPrice().compareTo(product2.getPrice()));
			Collections.reverse(list);
			return list;
		}
	}

	@Override
	public List<Product> findAllPageBySize(int pagenumber) {
		long count = repository.count();
		int pageSize = 2;
		int pages = (int) ((count / pageSize));
		int i = pagenumber; // i should start with zero or 0...
		while (i <= pages) {
			List<Product> list = repository.findAllPage(PageRequest.of(i, pageSize));
			i++;
			return list;
		}
		return null;
	}

	@Override
	public Product getProductbyId(Long productId) {
		Product info = repository.fetchbyId(productId);
		if (info != null) {
			return info;
		}
		return null;
	}

	@Override

	public boolean editProduct(long productId,EditProductDto information,String token) {
		
		Long id;
	
			id = (long) generate.parseJWT(token);
			Users userInfo = userRepository.getUserById(id);
			if(userInfo != null) 
			{			
				String userRole = userInfo.getRole();
				System.out.println("actual Role is " + userRole);
				String fetchRole = userRole;

				if (fetchRole.equals("seller") ) 
				{
					Product info =repository.fetchbyId(productId);
					if(info!=null) 
					{
						Long l=info.getNoOfproduct();
						int beforeNoOfproducts=l.intValue();
						log.info("------------------------"+beforeNoOfproducts);
						info.setProductId(productId);
						info.setProductName(information.getProductName());
						info.setNoOfproduct(information.getNoOfProducts());
						info.setPrice(information.getPrice());
						info.setAuthorName(information.getAuthorName());
						info.setProductDetails(information.getProductDetails());
//						info.setImage(imageName);
						info.setUpdatedDateAndTime(information.getUpdatedAt());
					
						Long af=info.getNoOfproduct();
						int afterNoOfproducts=af.intValue();
						log.info("------------------------"+afterNoOfproducts);
//						if(after==before) {
//						
//						}
						
//						for (WishlistProduct w : userInfo.getWishlistProduct()) {
//							for(Product wishproduct :w.getProductsList()) {
//						
//							if(wishproduct.getProductId()==productId) {
						if(beforeNoOfproducts==0) {
							log.info("------------------------"+afterNoOfproducts);
							
							if(afterNoOfproducts>beforeNoOfproducts) {
								WishServiceNotify.setNotifyWishproducts(true);
								if(WishServiceNotify.isNotifyWishproducts()==true) {
//									Users userdetails=new Users();
			
//									emailData.setEmail(userdetails.getEmail());
									
									String body="<html> \n"
							 				
								 			
	 				+"<h3 ; style=\"background-color:#990000;color:#ffffff;\" >\n "
	 				+ "<center>Productstore Notification</center> "
	 				+ "</h3>\n "
	 				+ "<body  style=\"background-color:#FAF3F1;\">\n"+
	 				"<br>"+" ur Wish product is available name is"+info.getProductName()+"\n"
	 				+"   check ur product below link<br>"+"\n"
	 		+" http://localhost:4200/wish<br>"
	
	 		+ "</body>"
	 		+ " </html>" ;
											
											emailData.setSubject("Notification in WishList");
									
											emailData.setBody(body);
									
											em.sendMail("sandeepkumarrayala@gmail.com", 
													emailData.getSubject(), emailData.getBody());
									 
								}
							}
							
						}
//							}//if id equating
//							}//wish product
//						}//wishproductw for
						info.setUpdatedDateAndTime(LocalDateTime.now());
						repository.save(info);
						return true;
					}
				}
				else 
				{
					throw new UserException("Your are not Authorized User");
				}
			}
		 else {
			throw new UserException("User doesn't exist");
		}

		return false;
	}

	@Transactional
	@Override
	public boolean deleteProduct(long productId, String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			String userRole = userInfo.getRole();
			System.out.println("actual Role is " + userRole);
			log.info("Actual ");
			String fetchRole = userRole;

			if (fetchRole.equals("seller") ) {
				Product info = repository.fetchbyId(productId);
				if (info != null) {
					repository.deleteByProductId(productId);
					return true;
				}
			} else {
				throw new UserException("Your are not Authorized User");
			}
		} else {
			throw new UserException("User doesn't exist");
		}

		return false;
	}


	@Transactional
	@Override
	public boolean editProductStatus(long productId, String status, String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		log.info("");
		if (userInfo != null) {
			Product info = repository.fetchbyId(productId);
			if (info != null) {
				repository.updateProductStatusByProductId(status, productId);
				return true;
			}
		} else {
			throw new UserException("User doesn't exist");
		}

		return false;
	}

	@Transactional
	@Override
	public List<Product> getAllOnHoldProducts(String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			List<Product> approvedOnHoldProducts = repository.getAllOnHoldProducts();
			return approvedOnHoldProducts;
		} else {
			throw new UserException("User doesn't exist");
		}

	}

	public List<Product> getAllRejectedProducts(String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			List<Product> rejectedProducts = repository.getAllRejectedProducts();
			return rejectedProducts;
		} else {
			throw new UserException("User doesn't exist");
		}

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
	@Override
	public Page<Product> getProductAproval(Optional<String> searchBy, Optional<Integer> page, Optional<String> sortBy,
			Optional<String> order) {
		if (order.equals(Optional.ofNullable("asc"))) {
			return repository.findByProductName(searchBy.orElse("_"),
					PageRequest.of(page.orElse(0), 12, Sort.Direction.ASC, sortBy.orElse("product_id")));
		} else {
			return repository.findByProductName(searchBy.orElse("_"),
					PageRequest.of(page.orElse(0), 12, Sort.Direction.DESC, sortBy.orElse("product_id")));
		}
	}

	@Override
	public List<Product> getAllAprovedProduct() {
		List<Product> approvedProducts = repository.getAllApprovedProducts();
		return approvedProducts;
	}


	@Override
	public boolean writeReviewAndRating(String token, RatingReviewDTO rrDTO, Long productId) {
//		Long uId = generate.parseJWT(token);
//		Users user = userRepository.getUserById(uId);
//		Product product = repository.fetchbyId(productId);
//		boolean notExist =  product.getReviewRating().stream().noneMatch(rr -> rr.getUser().getUserId()==uId);
//		if(notExist) {
//			ReviewAndRating rr = new ReviewAndRating(rrDTO);
//			rr.setUser(user);
//			product.getReviewRating().add(rr);
//			rrRepository.save(rr);
//			repository.save(product);
//		}
//		else {
//			ReviewAndRating rr = product.getReviewRating().stream().filter(r -> r.getUser().getUserId()==uId).findFirst().orElseThrow(() -> new ProductAlreadyExist("Review doesnot exist"));
//			rr.setRating(rrDTO.getRating());
//			rr.setReview(rrDTO.getReview());
//			rrRepository.save(rr);
//			repository.save(product);
//
//		}
		
		Long userId = generate.parseJWT(token);
		Users user = userRepository.getUserById(userId);
		ReviewAndRating review = rrRepository.getProductReview(productId , user.getName());
		if(review==null) {
			ReviewAndRating rr = new ReviewAndRating(rrDTO);
			rr.setProductId(productId);
			rr.setUserName(user.getName());
			rrRepository.save(rr);
			return true;
			
		}
		return false;

	}

	@Override
	public List<ReviewAndRating> getRatingsOfProduct(Long productId) {

//		Product product=repository.fetchbyId(productId);
//
//		return product.getReviewRating();
		return rrRepository.getreviews(productId);
	}
	
	@Override
	public double avgRatingOfProduct(Long productId) {
		double rate=0.0;
		try {
		rate = repository.avgRateOfProduct(productId);
		System.out.println("rate getted:"+rate);
		}catch(Exception e)
		{
			System.out.println("No rating");
		}
		return rate;
	}

	@Override
	public Integer getProductsCount() {
		
		return repository.getAllApprovedProducts().size();
	}
	
	@Transactional
	@Override
	public boolean uploadProductImage(long productId, String imageName, String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			String userRole = userInfo.getRole();
			System.out.println("actual Role is " + userRole);
			String fetchRole = userRole;

			if (fetchRole.equals("seller") ) {
				Product info = repository.fetchbyId(productId);
				if (info != null) {
					info.setImage(imageName);
					repository.save(info);
					return true;
				}
			}
		} else {
			throw new UserException("User doesn't exist");
		}

		return false;
	}
	
	@Transactional
	@Override
	public List<Product> sortProductByRate() {
		
		List<Product> products = repository.getAllApprovedProducts();
		System.out.println("Approved products:"+products);
		List<Product> sortProduct = products.stream().sorted((product1,product2)->(avgRatingOfProduct(product1.getProductId())<avgRatingOfProduct(product2.getProductId()))?1:(avgRatingOfProduct(product1.getProductId())>avgRatingOfProduct(product2.getProductId()))?-1:0).collect(Collectors.toList());
		System.out.println("After sorting:"+sortProduct);
		return sortProduct;
	}

}
