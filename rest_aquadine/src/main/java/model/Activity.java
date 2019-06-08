package model;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @Column(name = "activityId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int activityId;

    @Column(name = "date")
    private Date date;

    @ManyToOne(targetEntity = Category.class)
    @JoinColumn(name = "categoryId")
    private Category categoryId;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user")
    private User user;

    @Column(name = "description")
    private String description;

    @Column(name = "attendees")
    private int attendees;

    @Column(name = "unknown")
    private int unknown;

    @Column(name = "notAttending")
    private int notAttending;

    @Column(name = "img")
    private String img;


//    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Invitation> invitationList = new ArrayList<>();

    public Activity() {
    }


    public int getActivityId() {
        return activityId;
    }


    public Category getCategoryId() {
        return categoryId;
    }



    public User getUser() {
        return user;
    }

    public void setActivityId(int activityId) {
        this.activityId = activityId;
    }


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setCategoryId(Category categoryId) {
        this.categoryId = categoryId;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAttendees() {
        return attendees;
    }

    public void setAttendees(int attendees) {
        this.attendees = attendees;
    }

    public int getUnknown() {
        return unknown;
    }

    public void setUnknown(int unknown) {
        this.unknown = unknown;
    }

    public int getNotAttending() {
        return notAttending;
    }

    public void setNotAttending(int notAttending) {
        this.notAttending = notAttending;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

//    public List<Invitation> getInvitationList() {
//        return invitationList;
//    }
//
//    public void setInvitationList(List<Invitation> invitationList) {
//        this.invitationList = invitationList;
//    }
}
