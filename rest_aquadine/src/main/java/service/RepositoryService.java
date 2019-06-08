package service;

import model.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

public interface RepositoryService {

    /**
     * getting all users
     *
     * @return users
     */
    List<User> getUsers();

    /**
     * getting all users from id
     *
     * @return users
     */
    User getUserFromId(int id);

    User createUser(User user);

    List<Category> getCategories();

    Category getCategoryFromId(int id);

    List<Activity> getAllActivities();

    Activity getActivityFromId(int id);

    List<Menu> getAllMenus();

    Menu getMenuFromId(int id);

    List<Invitation> getAllInvitations();

    Invitation getInvitationFromId(int id);

    List<Order> getOrders();

    Order getOrderFromId(int id);

    List<Menu> getMenusBy(int mainId, int catFK);

    List<Menu> getMenusByCat(int catFK);

    List<Order> getOrdersByUser(int userId);

    List<Order> getOrdersByInvitation(int invId);

    Object addEntity(Object object);

    List<Activity> searchActivities(String naam);

    List<Menu> searchMenus(String naam);

    List<Category> searchCategories(String naam);

    List<Invitation> searchInvitations(String naam);

    List<Order> searchOrders(String naam);

    List<User> searchUsers(String naam);

    List<Invitation>  getInvitationsByActivity(int activityId);

    List<Invitation>  getInvitationsByUser(int userId);

    List<Invitation>  getInvitationsByUserAndActivity(int userId, int activityId);

    //boolean checkPassword(String email, String password);

    Activity createActivity(Activity activity);

    Order createOrder(Order order);

    Invitation createInvitation(Invitation invitation);

//    User updateUser(User user);
    void updateUser(User user);
}
