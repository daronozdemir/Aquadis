import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

//Defines the base URI for all resource URIs.
@ApplicationPath("services/rest")
//The java class declares root resource and provider classes
public class MyApplication extends Application{

    public MyApplication() {
    }
}