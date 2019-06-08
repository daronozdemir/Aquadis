package rest.model;

import model.Category;
import rest.jwt.filter.JwtTokenMandatory;
import rest.modelError.ClientError;
import service.RepositoryService;
import service.impl.RepositoryServiceImpl;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@Path("/categories")
public class CategoryResource {
    private RepositoryService service;

    public CategoryResource() {
        System.out.println("Before category resource.");
        service = RepositoryServiceImpl.getInstance();
        System.out.println("After category resource.");
    }

    /**
     * returns all categories
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Category> getCategories() {
        System.out.println("Before get all categories." + service.getCategories());
        return service.getCategories();
    }

    /**
     *
     * @param categoryID
     * @return
     */
    @GET
    @Path("/{categoryID}")
//    @JwtTokenMandatory
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCategoryFromID(@PathParam("categoryID")int categoryID){
        System.out.println("Before get category from id");
        Category category = service.getCategoryFromId(categoryID);

        System.out.println("Check if category exists");
        if(category == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("Cannot find category with id: " + categoryID)).build();
        }
        return Response.status(Response.Status.OK)
                .entity(category).build();
    }

//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public List<Category> searchCategories(String naam) {
//        System.out.println("Before get all users.");
//        return service.searchCategories(naam);
//    }
}