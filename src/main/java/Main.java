import com.google.gson.Gson;

import java.net.http.HttpRequest;
import java.util.*;
import static spark.Spark.*;
public class Main {
     static Server serverObject;
    public static void main(String[] args) {
        CORSFilter corsFilter = new CORSFilter();
        corsFilter.apply();
        serverObject = new Server();
        loadTestingData();
        get("/populateFeed", (req, res) -> populateFeed(req, res) );

    }

    public static String populateFeed(spark.Request req, spark.Response res) {
        String user = req.queryParams("userName");
        List<Feed> userFeed = serverObject.populateFeed(user);
        Map<Integer, Task> currUserTask = serverObject.userMap.get(user).myTasks;
        Map<String, Integer> friendAndScores = serverObject.friendScores(user);
        Map<String,String> notifications = serverObject.newNotifications(user);
        Map<String, Set<String>> friendGroups = serverObject.userGroups(user);

        Map<String, Object> ret = new HashMap<>();
        ret.put("timeline", userFeed);
        ret.put("tasks", currUserTask);
        ret.put("friendScore", friendAndScores);
        ret.put("notification", notifications);
        ret.put("groups", friendGroups);
        Gson retString = new Gson();
        return retString.toJson(ret);
    }

    public static void loadTestingData() {
        Set<String> anshGroups = new HashSet<>();
        anshGroups.add("badminton");
        anshGroups.add("Computer Science");
        Set<String> rishGroups = new HashSet<>();
        rishGroups.add("Gym");
        rishGroups.add("Computer Science");
        Set<String> xiaoGroups = new HashSet<>();
        xiaoGroups.add("harem");
        xiaoGroups.add("UW");
        Set<String> wayneGroups = new HashSet<>();
        wayneGroups.add("gym");
        wayneGroups.add("work");
        wayneGroups.add("meal prep");
        serverObject.createUser("ansh", anshGroups);
        serverObject.createUser("rish", rishGroups);
        serverObject.createUser("xiao", xiaoGroups);
        serverObject.createUser("wayne", wayneGroups);
        int taskID = serverObject.createTask("Computer Science", "Study", "CSE331", 3, "ansh");
        int taskID2 = serverObject.createTask("Computer Science", "Study", "Research", 6, "ansh");
        Set<String> anshRishGroups = new HashSet<>();
        anshRishGroups.add("Computer Science");
        serverObject.addFriend("ansh","rish", anshRishGroups);
        serverObject.addFeed("ansh", taskID);
        serverObject.addFeed("ansh", taskID2);

    }
//    LOAD GET request. Body of request: “username”
//    Body of response: {“timeline”: [list of tuples (“task name”, username, description)],
//    “tasks”: [list of tuples(“task id”, “task name”, “description”, “frequency”, “groupName”)],
//    “friends”: [list of tuples(“friend name”, “score”, “name of most recent task”)],
//    “notifications”: [ check-ins, etc]}

}
