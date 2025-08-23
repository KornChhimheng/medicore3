package com.hospital.management.api.core.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenUtil {
    private static final String secreteString = "30bbf3ac8a327fd58d827cb5df0de4e485f4970f2ce0f970bbde9c2defcbec91745e6adf4197fb34b7b048e5e75a1406";
    private final Key secretKey = new SecretKeySpec( Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8)), "HmacSHA256");

    private  static  final long JWT_TOKEN_VALIDITY = 3600000 ;//3600000 ;  //1 hours
    private  static  final long EXPIRATION_TIME = 86400000 ;  //24 hours
    public String generateToken(UserDetails userDetails){
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                 .claim("authorities", userDetails.getAuthorities()
                    .stream().map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }
    public String generateRefreshToken(HashMap<String, Object> claims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(claims)  // Use setClaims instead of addClaims
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }


    public List<String> extractRoles(String token) {
        Claims claims = extractAllClaims(token);
        String role = claims.get("authorities", String.class);
        return List.of(role); // Convert single role to List
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    
}