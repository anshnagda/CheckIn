import java.util.*;

public class User {
    String name;
    // int age;
    List<User> friends;
    Map<String, Set<User>> groupMap;
    List<Task> myTasks;

    public User(String name) {
        this.name = name;
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

    public void addTask(Task t) {
        this.myTasks.add(t);
    }
}
