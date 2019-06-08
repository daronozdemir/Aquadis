package rest.model;

import model.Menu;
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


@Path("/menus")
public class MenuResource {
    private RepositoryService service;

    public MenuResource() {
        System.out.println("Before menu resource.");
        service = RepositoryServiceImpl.getInstance();
        System.out.println("After menu resource.");
    }

    /**
     * returns all menus
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Menu> getMenus() {
        System.out.println("Before get all menus.");
        return service.getAllMenus();
    }

    /**
     *
     * @param menuID
     * @return
     */
    @GET
    @Path("/{menuID}")
    @JwtTokenMandatory
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMenuFromID(@PathParam("menuID")int menuID){
        System.out.println("Before get menu from id");
        Menu menu = service.getMenuFromId(menuID);

        System.out.println("Check if menu exists");
        if(menu == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("Cannot find menu with id: " + menuID)).build();
        }
        return Response.status(Response.Status.OK)
                .entity(menu).build();
    }

    @GET
    @Path("/menuId/categoryId/{menuID}/{categoryID}")
    @Produces
    public Response getMenuFromMenuAndCategoryID(@PathParam("menuID")int menuID, @PathParam("categoryID") int categoryID){
        System.out.println("Before get menu from id");
        List<Menu> menu = service.getMenusBy(menuID, categoryID);

        System.out.println("Check if menu exists");
        if(menu == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("Cannot find menu with id: " + menuID + "AND" + categoryID)).build();
        }
        return Response.status(Response.Status.OK)
                .entity(menu).build();
    }

    @GET
    @Path("/categoryId/{categoryID}")
    @Produces
    public Response getMenuFromMenuAndCategoryID(@PathParam("categoryID") int categoryID){
        System.out.println("Before get menu from id");
        List<Menu> menu = service.getMenusByCat(categoryID);

        System.out.println("Check if menu exists");
        if(menu == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("Cannot find menu with id: " + categoryID)).build();
        }
        return Response.status(Response.Status.OK)
                .entity(menu).build();
    }

//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public List<Menu> searchMenus(String naam) {
//        System.out.println("Before get all users.");
//        return service.searchMenus(naam);
//    }
}





