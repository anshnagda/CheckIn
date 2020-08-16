import java.time.LocalDateTime;
import java.util.*;

public class User {
    String name;
    // int age;
    List<String> friends;
    Map<String, Set<String>> groupMap;
    Map<Integer, Task> myTasks;

    Map<String, String> notifications;
    Map<String, String> newNotifications;

    Map<Feed, LocalDateTime> myFeeds;

    public User(String name) {
        this.name = name;
        this.friends = new ArrayList<>();
        this.groupMap = new HashMap<>();
        this.myTasks = new HashMap<>();
        this.myFeeds = new HashMap<>();
    }

    public void addFriend(String f, Set<String> groups) {
        this.friends.add(f);
        for (String group: groups) {
            Set<String> currGroup = groupMap.get(group);
            currGroup.add(f);
            groupMap.put(group, currGroup);
        }
    }
    /*
    public int computeScore() {
        int totalScore = 0;
        LocalDateTime now = LocalDateTime.now();
        Map<Feed, LocalDateTime> filteredMap = new HashMap<>();
        for (Feed feed : myFeeds.keySet()) {
            LocalDateTime difference = now.min
        }


        for (int taskNum : myTasks.keySet()) {
            Task task = myTasks.get(taskNum);
            int curScore = 0;



            totalScore += curScore;
        }

        return totalScore / myTasks.size();
    }*/

    public void addGroup(String group) {
        groupMap.putIfAbsent(group, new HashSet<String>());
    }

    public Task addTask(String taskName, String description, int freqPerWeek, String groupName)
    {
        Task newTask = new Task(myTasks.size(), taskName, description, freqPerWeek, groupName);
        this.myTasks.put(myTasks.size(), newTask);
        return newTask;
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
