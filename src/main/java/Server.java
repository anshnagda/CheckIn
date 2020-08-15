import java.util.*;

public class Server {
    // fields
    Map<String, User> userMap;
    List<Feed> userFeeds;

    // methods
    public void createUser(String username, Set<String> groups) {
        User newUser = new User(username);
        for (String group : groups) {
            newUser.addGroup(group);
        }
        userMap.put(username, newUser);
    }

    public void addFeed(String username, String taskName, String description) {
        User curUser = userMap.get(username);
        for (Task t: curUser.myTasks) {
            if (t.taskName.equals(taskName) && t.description.equals(description)) {
                userFeeds.add(new Feed(curUser, t));
            }
        }
    }

    public void createTask(String group, String taskName, String description, int freq, String username) {
        User curUser = userMap.get(username);
        Task curTask = new Task(group,taskName,description,freq);
        curUser.addTask(curTask);
    }

    public List<Feed> populateFeed() {

    }

    // constructors
    public Server() {
        this.userMap = new HashMap<>();
        this.userFeeds = new ArrayList<>();
    }
}
