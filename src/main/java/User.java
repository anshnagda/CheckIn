import java.util.*;

public class User {
    String name;
    // int age;
    List<User> friends;
    Map<String, Set<User>> groupMap;
    Map<Integer, Task> myTasks;

    Map<String, String> notifications;
    Map<String, String> newNotifications;

    public User(String name) {
        this.name = name;
        this.friends = new ArrayList<>();
        this.groupMap = new HashMap<>();
        this.myTasks = new HashMap<>();

    }

    public void addFriend(User f, String group) {
        this.friends.add(f);
        Set<User> currGroup = groupMap.get(group);
        currGroup.add(f);
        groupMap.put(group, currGroup);
    }

    public void addGroup(String group) {
        groupMap.putIfAbsent(group, new HashSet<User>());
    }

    public void addTask(String taskName, String description, int freqPerWeek, String groupName)
    {
        Task newTask = new Task(myTasks.size(), taskName, description, freqPerWeek, groupName);
        this.myTasks.put(myTasks.size(), newTask);
    }

    public void addNotification(String notificationSender, String notification) {
        notifications.put(notificationSender, notification);
        newNotifications.put(notificationSender, notification);
    }

    public Map<String, String> getNewNotifications() {
        Map<String, String> ret = newNotifications;
        newNotifications = new HashMap<>();
        return ret;
    }

    public Map<String, String> getAllNotifications() {
        return notifications;
    }
}
