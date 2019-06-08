package service.impl;

import model.*;
import service.RepositoryService;

import javax.jws.soap.SOAPBinding;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class RepositoryServiceImpl implements RepositoryService {

    private EntityManagerFactory entityManagerFactory;

    // A singleton reference
    private static RepositoryServiceImpl instance;

    // An instance of the service is created and during class initialisation
    static {
        System.out.println("Make new instance.");
        instance = new RepositoryServiceImpl();
//        System.out.println("Load examples.");
//        instance.loadExamples();
    }

    public static RepositoryService getInstance() {
        return instance;
    }

    private Map<String, User> users;

    private RepositoryServiceImpl() {
        users = new LinkedHashMap<>();
        System.out.println("Connect to database.");
        entityManagerFactory = Persistence.createEntityManagerFactory("aquadine");
    }

    private EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }


    @Override
    public List<User> getUsers() {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<User> users = em.createQuery("SELECT u FROM User u").getResultList();
        em.close();
        return users;
    }

    @Override
    public User getUserFromId(int id) {
        EntityManager em = getEntityManager();
        User user = em.find(User.class, id);
        em.close();
        return user;
    }

    @Override
    public User createUser(User user) {
        System.out.println("Before create user.");
        return (User) addEntity(user);
    }

    @Override
    public Activity createActivity(Activity activity) {
        System.out.println("Before create activity.");
        return (Activity) addEntity(activity);
    }

    @Override
    public Order createOrder(Order order) {
        System.out.println("Before create order.");
        return (Order) addEntity(order);
    }

    @Override
    public Invitation createInvitation(Invitation invitation) {
        System.out.println("Before create invitation.");
        return (Invitation) addEntity(invitation);
    }

//    @Override
//    public User updateUser(User user){
//        return (User) addEntity(user);
//    }

    @Override
    public List<Category> getCategories() {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<Category> category = em.createQuery("SELECT c FROM Category c").getResultList();
        em.close();
        return category;
    }

    @Override
    public Category getCategoryFromId(int id) {
        EntityManager em = getEntityManager();
        Category category = em.find(Category.class, id);
        em.close();
        return category;
    }

    @Override
    public List<Activity> getAllActivities() {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<Activity> activities = em.createQuery("SELECT a FROM Activity a").getResultList();
        em.close();
        return activities;
    }

    @Override
    public Activity getActivityFromId(int id) {
        EntityManager em = getEntityManager();
        Activity activity = em.find(Activity.class, id);
        em.close();
        return activity;
    }

    @Override
    public List<Menu> getAllMenus() {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<Menu> menus = em.createQuery("SELECT m FROM Menu m").getResultList();
        em.close();
        return menus;
    }

    @Override
    public Menu getMenuFromId(int id) {
        EntityManager em = getEntityManager();
        Menu menu = em.find(Menu.class, id);
        em.close();
        return menu;
    }

    @Override
    public List<Invitation> getAllInvitations() {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<Invitation> invitations = em.createQuery("SELECT i FROM Invitation i").getResultList();
        em.close();
        return invitations;
    }

    @Override
    public Invitation getInvitationFromId(int id) {
        EntityManager em = getEntityManager();
        Invitation invitation = em.find(Invitation.class, id);
        em.close();
        return invitation;
    }

    @Override
    public List<Order> getOrders() {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<Order> orders = em.createQuery("SELECT o FROM Order o").getResultList();
        em.close();
        return orders;
    }

    @Override
    public Order getOrderFromId(int id) {
        EntityManager em = getEntityManager();
        Order order = em.find(Order.class, id);
        em.close();
        return order;
    }

    @Override
    public void updateUser(User user){
        EntityManager em = getEntityManager();
        em.getTransaction().begin();
        user = em.merge(user);
        em.persist(user);
        em.getTransaction().commit();

        em.close();
    }


    /**
     * Adds a object to the database. In our case the object
     *
     * @param object User or Group
     * @return the object
     */
    @Override
    public Object addEntity(Object object) {
        System.out.println("Before add entity.");
        EntityManager entityManager = getEntityManager();

        System.out.println("Before transaction.");
        entityManager.getTransaction().begin();
        entityManager.merge(object);
        entityManager.getTransaction().commit();

        entityManager.close();

        return object;
    }

    @Override
    public List<Menu> getMenusBy(int mainId, int catFK) {
        EntityManager em = getEntityManager();

        Query query = em.createQuery("SELECT m FROM Menu m inner join m.category c WHERE m.mainId = :mainId AND c.categoryId = :catFK ORDER BY m.name");
        query.setParameter("mainId", mainId);
        query.setParameter("catFK", catFK);

        List<Menu> menu = query.getResultList();

        em.close();

        if (menu == null) {
            return null;
        }
        return menu;
    }

    @Override
    public List<Menu> getMenusByCat(int catFK) {
        EntityManager em = getEntityManager();

        Query query = em.createQuery("SELECT m FROM Menu m inner join m.category c WHERE  c.categoryId = :catFK");
        query.setParameter("catFK", catFK);

        List<Menu> menu = query.getResultList();

        em.close();

        if (menu == null) {
            return null;
        }
        return menu;
    }

    @Override
    public List<Order> getOrdersByUser(int userId) {
        EntityManager em = getEntityManager();

        Query query = em.createQuery("SELECT o FROM Order o inner join o.user u WHERE  u.id = :userId");
        query.setParameter("userId", userId);

        List<Order> orders = query.getResultList();

        em.close();

        if (orders == null) {
            return null;
        }
        return orders;
    }

    @Override
    public List<Order> getOrdersByInvitation(int invId) {
        EntityManager em = getEntityManager();
        Query query = em.createQuery("SELECT o FROM Order o inner join o.invitation i WHERE  i.invitationId = :invId");
        query.setParameter("invId", invId);

        List<Order> orders = query.getResultList();

        em.close();

        if (orders == null) {
            return null;
        }
        return orders;
    }

    @Override
    public List<Menu> searchMenus(String naam) {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<Menu> menus = em.createQuery("SELECT m.name FROM Menu m").getResultList();
        naam.compareTo(menus.toString());
        em.close();
        return menus;
    }

    @Override
    public List<Activity> searchActivities(String naam) {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<Activity> activities = em.createQuery("SELECT c.name FROM Activity a INNER JOIN a.categoryId c").getResultList();
        naam.compareTo(activities.toString());
        em.close();
        return activities;
    }

    @Override
    public List<Category> searchCategories(String naam) {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<Category> categories = em.createQuery("SELECT c.name FROM Category c ").getResultList();
        naam.compareTo(categories.toString());
        em.close();
        return categories;
    }

    @Override
    public List<Invitation> searchInvitations(String naam) {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<Invitation> invitations = em.createQuery("SELECT c.name FROM Invitation i INNER JOIN i.activity a INNER JOIN a.categoryId c").getResultList();
        naam.compareTo(invitations.toString());
        em.close();
        return invitations;
    }

    @Override
    public List<Order> searchOrders(String naam) {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<Order> orders = em.createQuery("SELECT m.name FROM Order o INNER JOIN o.menu m ").getResultList();
        naam.compareTo(orders.toString());
        em.close();
        return orders;
    }

    @Override
    public List<User> searchUsers(String naam) {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<User> users = em.createQuery("SELECT m.name FROM Order o INNER JOIN o.menu m ").getResultList();
        naam.compareTo(users.toString());
        em.close();
        return users;
    }

    @Override
    public List<Invitation> getInvitationsByActivity(int activityId) {
        EntityManager em = getEntityManager();
        //SELECT * FROM invitations inner join activities ON invitations.activityId = activities.activityId WHERE invitations.activityId = 2;
        Query query = em.createQuery("SELECT i FROM Invitation i inner join i.activity a WHERE a.activityId = :activityId");
        query.setParameter("activityId", activityId);

        List<Invitation> invitation = query.getResultList();

        em.close();

        if (invitation == null) {
            return null;
        }

        return invitation;
    }

    @Override
    public List<Invitation> getInvitationsByUser(int userID) {
        EntityManager em = getEntityManager();
        //SELECT * FROM invitations inner join activities ON invitations.activityId = activities.activityId WHERE invitations.activityId = 2;
        Query query = em.createQuery("SELECT i FROM Invitation i inner join i.user u WHERE u.id = :userID");
        query.setParameter("userID", userID);

        List<Invitation> invitation = query.getResultList();

        em.close();

        if (invitation == null) {
            return null;
        }

        return invitation;
    }

    @Override
    public List<Invitation> getInvitationsByUserAndActivity(int userId, int activityId) {
        EntityManager em = getEntityManager();

        Query query = em.createQuery("SELECT i FROM Invitation i inner join i.user u inner join i.activity a WHERE u.id = :userId AND a.activityId = :activityId");
        query.setParameter("userId", userId);
        query.setParameter("activityId", activityId);

        List<Invitation> invitation = query.getResultList();
        em.close();
        if (invitation == null) {
            return null;
        }
        return invitation;
    }


//    public boolean checkPassword(String email, String password) {
//
//        User u = users.get(email);
//
//        if (u == null) {
//            return false;
//        }
//
//        return u.checkPassword(password);
//
//
//    }
}
