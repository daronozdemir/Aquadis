package rest.model;

import model.Activity;
import model.Order;
import rest.modelError.ClientError;
import service.RepositoryService;
import service.impl.RepositoryServiceImpl;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/orders")
public class OrderResource {
    private RepositoryService service;

    public OrderResource() {
        System.out.println("Before order resource.");
        service = RepositoryServiceImpl.getInstance();
        System.out.println("After order resource.");
    }

    /**
     * returns all orders
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Order> getOrders() {
        System.out.println("Before get all orders.");
        return service.getOrders();
    }

    /**
     *
     * @param orderID
     * @return
     */
    @GET
    @Path("/{orderID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrderFromId(@PathParam("orderID")int orderID){
        System.out.println("Before get group from id");
        Order order = service.getOrderFromId(orderID);

        System.out.println("Check if order exists");
        if(order == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("Cannot find order with id: " + orderID)).build();
        }
        return Response.status(Response.Status.OK)
                .entity(order).build();
    }

    @GET
    @Path("/userId/{userID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrderFromUser(@PathParam("userID")int userID){
        System.out.println("Before get group from id");
        List<Order> order = service.getOrdersByUser(userID);

        System.out.println("Check if order exists");
        if(order == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("Cannot find order with id: " + userID)).build();
        }
        return Response.status(Response.Status.OK)
                .entity(order).build();
    }

    @GET
    @Path("/invitationId/{invitationId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrderFromInvitation(@PathParam("invitationId")int invitationId){
        System.out.println("Before get group from id");
        List<Order> order = service.getOrdersByInvitation(invitationId);

        System.out.println("Check if order exists");
        if(order == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("Cannot find order with id: " + invitationId)).build();
        }
        return Response.status(Response.Status.OK)
                .entity(order).build();
    }

    /**
     * creates a activity
     * @param newOrder
     * @return
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Order createOrder(Order newOrder) {
        System.out.println("Before create order");
        return service.createOrder(newOrder);
    }

//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public List<Order> searchOrders(String naam) {
//        System.out.println("Before get all users.");
//        return service.searchOrders(naam);
//    }
}

