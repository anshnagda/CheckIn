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

    public void addFeed(String username, int taskID) {
        User curUser = userMap.get(username);
        Task t = curUser.myTasks.get(taskID);

        userFeeds.add(new Feed(username, t));
    }

    public void createTask(String group, String taskName, String description, int freq, String username) {
        User curUser = userMap.get(username);
        curUser.addTask(taskName, description, freq, group);
    }

    public List<Feed> populateFeed(String username) {
        User curUser = userMap.get(username);
        List<Feed> ret = new ArrayList<>();

        for(Feed feed : userFeeds) {
            User feed_author = userMap.get(feed.userName);
            String groupName = feed.currentTask.groupName;
            if (feed_author.groupMap.get(groupName).contains(curUser)) {
                ret.add(feed);
            }
        }

        return ret;
    }

    public Map<String, Integer> friendScores(String username) {
        Map<String, Integer> ret = new HashMap<>();
        for (User friend : userMap.get(username).friends) {
            ret.put(friend.name, 100);
        }

        return ret;
    }

    public Map<String, String> newNotifications(String username) {
        return userMap.get(username).getNewNotifications();
    }

    // constructors
    public Server() {
        this.userMap = new HashMap<>();
        this.userFeeds = new ArrayList<>();
    }
}
