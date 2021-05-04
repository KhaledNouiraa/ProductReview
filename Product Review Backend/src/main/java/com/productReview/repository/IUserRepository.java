/**
 * 
 */
package com.productReview.repository;

import java.util.List;

import com.productReview.entity.Users;
import com.productReview.request.PasswordUpdate;

/**
 * @author HP
 *
 */
public interface IUserRepository {
	Users save(Users users);

	Users getUser(String email);

	boolean verify(Long id);

	boolean upDate(PasswordUpdate information, Long token);

	Users getUserById(Long id );

	List<Users> getUsers();

}
