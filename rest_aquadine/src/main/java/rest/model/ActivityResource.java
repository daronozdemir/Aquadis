package rest.model;

import model.Activity;
import model.User;
import rest.modelError.ClientError;
import service.RepositoryService;
import service.impl.RepositoryServiceImpl;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/activities")
public class ActivityResource {
    private RepositoryService service;

    public ActivityResource() {
        System.out.println("Before activity resource.");
        service = RepositoryServiceImpl.getInstance();
        System.out.println("After activity resource.");
    }

    /**
     * returns all activities
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Activity> getAllActivities() {
        System.out.println("Before get all Activities.");
        return service.getAllActivities();
    }

    /**
     *
     * @param activityID
     * @return
     */
    @GET
    @Path("/{activityID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(@PathParam("activityID")int activityID){
        System.out.println("Before get group from id");
        Activity activity = service.getActivityFromId(activityID);

        System.out.println("Check if activity exists");
        if(activity == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("Cannot find activity with id: " + activityID)).build();
        }
        return Response.status(Response.Status.OK)
                .entity(activity).build();
    }

    /**
     * creates a activity
     * @param newActivity
     * @return
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Activity createActivity(Activity newActivity) {
        System.out.println("Before create activity");
        return service.createActivity(newActivity);
    }

//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public List<Activity> searchActivities(String naam) {
//        System.out.println("Before get all users.");
//        return service.searchActivities(naam);
//    }
}
