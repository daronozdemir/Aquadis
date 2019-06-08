package rest.model;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import model.User;
import rest.jwt.JWTUtils;
import rest.modelError.ClientError;
import service.RepositoryService;
import service.impl.RepositoryServiceImpl;

import javax.ws.rs.*;
import javax.ws.rs.POST;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.security.Key;
import java.util.Date;
import java.util.List;

import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import static javax.ws.rs.core.MediaType.APPLICATION_FORM_URLENCODED;
import static javax.ws.rs.core.Response.Status.UNAUTHORIZED;

@Path("/users")
public class UserResource {
    private RepositoryService service;

    public UserResource() {
        System.out.println("Before user resource.");
        service = RepositoryServiceImpl.getInstance();
        System.out.println("After user resource.");
    }

//    @POST
//    @Consumes(APPLICATION_FORM_URLENCODED)
//    public Response authenticateUser(@FormParam("email") String email,
//                                     @FormParam("password") String password,
//                                     @Context UriInfo uri){
//        try{
//            if (!service.checkPassword(email, password)){
//                throw new IllegalAccessException("Not authorized!");
//            }
//
//            String token = issueToken(email, uri);
//
//            return Response.ok().header(AUTHORIZATION, "Bearer " + token).build();
//
//        } catch (IllegalAccessException e) {
//
//            return Response.status(UNAUTHORIZED).build();
//            String token = issueToken(email, uri);
//            return Response.ok().header(AUTHORIZATION, "Bearer " + token).build();
//        }
//    }

 //   private String issueToken(String email, UriInfo uri) {
   //     Key key = JWTUtils.getKey();

        // Could have more than one role, but now it is just one
//        String [] roles = service.getRoles(login);

//        String jwtToken = Jwts.builder()
  //              .setSubject(email)
    //            .setIssuer(uri.getPath())
 //               .setIssuedAt(new Date())
 //               .setExpiration(new Date(System.currentTimeMillis()+15*60*1000)) // 15 minutes
 //               .signWith(key, SignatureAlgorithm.HS512)
  //              .compact();

 //       return jwtToken;
  //  }


    /**
     * returns all users
     * @return
     */

   @GET
   @Produces(MediaType.APPLICATION_JSON)
   public List<User> getUsers() {
        System.out.println("Before get all users.");
        return service.getUsers();
    }

    /**
     * creates a user
     * @param newUser
     * @return
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User createUser(User newUser) {
        System.out.println("Before create user");
        return service.createUser(newUser);
    }

    @Path("/change")
    @Consumes({MediaType.APPLICATION_JSON})
    @PUT
    @Produces({MediaType.APPLICATION_JSON})
    public Response changeUser(User user) {
        try {
            service.updateUser(user);
            return Response.status(Response.Status.OK).entity(user).build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e).build();
        }

    }

    /**
     *
     * @param userID
     * @return
     */
    @GET
    @Path("/{userID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserFromID(@PathParam("userID")int userID){
        System.out.println("Before get user from id");
        User user = service.getUserFromId(userID);

        System.out.println("Check if user exists");
        if(user == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("Cannot find user with id: " + userID)).build();
        }
        return Response.status(Response.Status.OK)
                .entity(user).build();
    }
/**
    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> searchUser(String naam) {
        System.out.println("Before get all users.");
        return service.searchUsers(naam);
    }
**/
}






























/**public class UserResource {

    public List<model.User> getUsers()
    {
        List<model.User> result = new ArrayList<>();

        Connection connection = null;
        try {
            // Obtain a model connection
            MySQLJDBCUtil jdbcUtil = new MySQLJDBCUtil();
            connection = jdbcUtil.getConnection();

            // Create the SQL query
            StringBuilder query = new StringBuilder();
            query.append("SELECT");
            query.append("  userId as id");
            query.append(", name");
            query.append(", username");
            query.append(", password");
            query.append(", email");
            query.append(", avatarUrl");
            query.append(" FROM users");

            // Create the statement, execute the query, and get a resultset
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query.toString());

            // Process the resultset
            while (resultSet.next()) {
                model.User user = new model.User();
                user.setId(resultSet.getInt("id"));
                user.setName(resultSet.getString("name"));
                user.setUsername(resultSet.getString("username"));
                user.setPassword(resultSet.getString("password"));
                user.setEmail(resultSet.getString("email"));
                user.setAvatarUrl(resultSet.getString("avatarUrl"));

                result.add(user);
            }

            // Close the resultset and statement
            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            System.err.println("SQL exception occurred - " + e.getMessage());
        } //finally {
            // Try to close the connection
         //   try {
         //       connection.close();
         //   } catch(SQLException e) {
                //ignore
         //   }

     //   }
        return result;
    }

    public model.User getUser(int id)
    {
        model.User result = new model.User();

        Connection connection = null;
        try {
            // Obtain a model connection
            MySQLJDBCUtil jdbcUtil = new MySQLJDBCUtil();
            connection = jdbcUtil.getConnection();

            // Create the SQL query
            StringBuilder query = new StringBuilder();
            query.append("SELECT");
            query.append("  userId as id");
            query.append(", name");
            query.append(", username");
            query.append(", password");
            query.append(", email");
            query.append(", avatarUrl");
            query.append(" FROM users");
            query.append(" WHERE userId = ").append(id);

            // Create the statement, execute the query, and get a resultset
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query.toString());

            // Process the resultset
            if (resultSet.next()) {
                result.setId(resultSet.getInt("id"));
                result.setName(resultSet.getString("name"));
                result.setUsername(resultSet.getString("username"));
                result.setPassword(resultSet.getString("password"));
                result.setEmail(resultSet.getString("email"));
                result.setAvatarUrl(resultSet.getString("avatarUrl"));

            }

            // Close the resultset and statement
            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            System.err.println("SQL exception occurred - " + e.getMessage());
        } finally {
            // Try to close the connection
            try {
                connection.close();
            } catch(SQLException e) {
                //ignore
            }

        }
        return result;
    }
}
 **/
