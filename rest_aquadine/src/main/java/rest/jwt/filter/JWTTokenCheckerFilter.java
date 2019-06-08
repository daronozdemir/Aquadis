/**package rest.jwt.filter;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import rest.jwt.JWTUtils;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.lang.annotation.Annotation;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Method;
import java.security.Key;
import java.util.ArrayList;
import java.util.List;

@Provider
//@JwtTokenMandatory
public class JWTTokenCheckerFilter implements ContainerRequestFilter {

    @Context
    private ResourceInfo resourceInfo;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        // Get the HTTP Authorization header from the request
        String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

        // Extract the token from the HTTP Authorization header
        String token = authorizationHeader != null ? authorizationHeader.substring("Bearer".length()).trim() : "";

        // Get the allowed permissions of the resource
        String[] permissions = getPermissions();

        try {

            // Validate the token
            Key key = JWTUtils.getKey();
            Jws<Claims> jws = Jwts.parser().setSigningKey(key).parseClaimsJws(token);

//            List<String> roles = (List<String>) jws.getBody().get("roles");

            // check permissions
//            boolean allowed = false;
//            for(String permission : permissions) {
//                if(roles.contains(permission)) {
//                    allowed = true;
//                    break;
//                }
//            }
//
//            if(!allowed) {
//                requestContext.abortWith(Response.status(Response.Status.FORBIDDEN).build());
//                return;
//            }

            System.out.println("#### valid token : " + token);

        } catch (ExpiredJwtException | MalformedJwtException | SignatureException | UnsupportedJwtException | IllegalArgumentException e) {
            e.printStackTrace();
            System.out.println("#### invalid token : " + token);
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }

    private String[] getPermissions() {
        Method method = resourceInfo.getResourceMethod();
        JwtTokenMandatory tokenMandatory = method.getAnnotation(JwtTokenMandatory.class);
        return tokenMandatory.permissions();
    }


}
**/