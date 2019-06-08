package rest.model;

import model.Activity;
import model.Invitation;
import rest.modelError.ClientError;
import service.RepositoryService;
import service.impl.RepositoryServiceImpl;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@Path("/invitations")
public class InvitationResource {
    private RepositoryService service;

    public InvitationResource() {
        System.out.println("Before invitation resource.");
        service = RepositoryServiceImpl.getInstance();
        System.out.println("After invitation resource.");
    }

    /**
     * returns all invitation
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Invitation> getInvitation() {
        System.out.println("running getInvitation(): all " + service.getAllInvitations());
        return service.getAllInvitations();
    }

    /**
     *
     * @param invitationID
     * @return
     */
    @GET
    @Path("/{invitationID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInvitationFromId(@PathParam("invitationID")int invitationID){
        System.out.println("Before get invitation from id");
        Invitation invitation = service.getInvitationFromId(invitationID);

        System.out.println("Check if invitation exists");
        if(invitation == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("Cannot find invitation with id: " + invitationID)).build();
        }
        return Response.status(Response.Status.OK)
                .entity(invitation).build();
    }

//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public List<Invitation> searchInvitations(String naam) {
//        System.out.println("Before get all users.");
//        return service.searchInvitations(naam);
//    }

    /**
     *
     * @param activityID
     * @return
     */
    @GET
    @Path("/activityId/{activityID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInvitationsByActivity(@PathParam("activityID")int activityID){
        System.out.println("Before get invitation from id");
        List<Invitation> invitation = service.getInvitationsByActivity(activityID);

        System.out.println("Check if invitation exists");
        if(invitation == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("Cannot find invitation with id: " + activityID)).build();
        }
        return Response.status(Response.Status.OK)
                .entity(invitation).build();
    }

    /**
     *
     * @param userID
     * @return
     */
    @GET
    @Path("/user/{userID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInvitationsByUser(@PathParam("userID")int userID){
        System.out.println("Before get invitation from id");
        List<Invitation> invitation = service.getInvitationsByUser(userID);

        System.out.println("Check if invitation exists");
        if(invitation == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("Cannot find invitation with id: " + userID)).build();
        }
        return Response.status(Response.Status.OK)
                .entity(invitation).build();
    }

    /**
     *
     * @param userID
     * @param activityID
     * @return
     */
    @GET
    @Path("/userId/activityId/{userID}/{activityID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInvitationsByUserAndActivity(@PathParam("userID")int userID, @PathParam("activityID") int activityID){
        System.out.println("Before get invitation from id");
        List<Invitation> invitation = service.getInvitationsByUserAndActivity(userID, activityID);

        System.out.println("Check if invitation exists");
        if(invitation == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("Cannot find invitation with id: " + userID)).build();
        }
        return Response.status(Response.Status.OK)
                .entity(invitation).build();
    }

    /**
     * creates a activity
     * @param newInvitation
     * @return
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Invitation createInvitation(Invitation newInvitation) {
        System.out.println("Before create invitation");
        return service.createInvitation(newInvitation);
    }
}
