package model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "invitations")
public class Invitation {

    @Id
    @Column(name = "invitationId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int invitationId;

    @ManyToOne(targetEntity = Activity.class)
    @JoinColumn(name = "activity")
    private Activity activity;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user")
    private User user;

    @Column(name = "reacted")
    private int reacted;

    @Column(name = "going")
    private int going;

//    @OneToMany(mappedBy = "invitation", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Order> orders = new ArrayList<>();

    public int getInvitationId() {
        return invitationId;
    }



    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }


    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public void setInvitationId(int invitationId) {
        this.invitationId = invitationId;
    }

    public int getReacted() {
        return reacted;
    }

    public void setReacted(int reacted) {
        this.reacted = reacted;
    }

    public int getGoing() {
        return going;
    }

    public void setGoing(int going) {
        this.going = going;
    }

//    public List<Order> getOrders() {
//        return orders;
//    }
//
//    public void setOrders(List<Order> orders) {
//        this.orders = orders;
//    }
}
