package com.hospital.management.api.core.security;

import java.util.Collection;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.hospital.management.api.features.hospitalmanagement.enums.Gender;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class CustomUserDetail  implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private String email;
    private String password;
	private Set<? extends GrantedAuthority> authorities;

    // add new field 
    private String firstName;
    private String lastName;
    private String roleName;
    private Gender gender; 

    public CustomUserDetail() {}
    
	public CustomUserDetail(String email, String password, Set<? extends GrantedAuthority> authorities,
            String firstName, String lastName, Gender gender, String roleName) {
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleName = roleName;
        this.gender = gender;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getRoleName() {
        return roleName;
    }
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
    public Gender getGender() {
        return gender;
    }
    public void setGender(Gender gender) {
        this.gender = gender;
    }
    @Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}