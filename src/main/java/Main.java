import com.google.gson.Gson;

import spark.Request;
import spark.Response;
import spark.Spark;

import java.net.http.HttpRequest;
import java.time.LocalDateTime;
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
        post("/addTask", (req, res) -> addTask(req, res));
        post("/logTask", (req, res) -> logTask(req, res));
        post("/notify", (req, res) -> notify(req, res));
    }

    public static String populateFeed(Request req, Response res) {
        String user = req.queryParams("userName");
        List<Feed> userFeed = serverObject.populateFeed(user);
        Map<Integer, Task> currUserTask = serverObject.userMap.get(user).myTasks;
        Collection<Task> currUserTaskList = currUserTask.values();
        Map<String, Integer> friendAndScores = serverObject.friendScores(user);
        Map<String,String> notifications = serverObject.newNotifications(user);
        Map<String, Set<String>> friendGroups = serverObject.userGroups(user);

        Map<String, Object> ret = new HashMap<>();
        ret.put("timeline", userFeed);
        ret.put("tasks", currUserTaskList);
        ret.put("friendScore", friendAndScores);
        ret.put("notification", notifications);
        ret.put("groups", friendGroups);
        Gson retString = new Gson();
        return retString.toJson(ret);
    }

    public static String addTask(Request req, Response res) {
        String user = req.queryParams("userName");
        String taskname = req.queryParams("taskName");
        String groupname = req.queryParams("groupName");
        String description = req.queryParams("description");
        int freq = Integer.parseInt(req.queryParams("frequency"));
        Gson retString = new Gson();

        return retString.toJson(serverObject.createTask(groupname, taskname, description, freq, user));
    }

    public static String logTask(Request req, Response res) {
        String user = req.queryParams("userName");
        int taskID = Integer.parseInt(req.queryParams("taskID"));
        System.out.println(user + " " + taskID);
        serverObject.addFeed(user, taskID);
        return "";
    }

    public static String notify(Request req, Response res) {
        String sender = req.queryParams("userName");
        String receiver = req.queryParams("friendName");
        String notification = req.queryParams("notificationText");
        serverObject.addNotification(sender, receiver, notification);
        return "";
    }

    public static void loadTestingData() {
        Set<String> anshGroups = new HashSet<>();
        anshGroups.add("Badminton");
        anshGroups.add("Computer Science");
        Set<String> rishGroups = new HashSet<>();
        rishGroups.add("Gym");
        rishGroups.add("Computer Science");
        Set<String> xiaoGroups = new HashSet<>();
        xiaoGroups.add("Harem");
        xiaoGroups.add("UW");
        Set<String> wayneGroups = new HashSet<>();
        wayneGroups.add("Gym");
        wayneGroups.add("Work");
        wayneGroups.add("Meal prep");

        serverObject.createUser("ansh", anshGroups);
        serverObject.createUser("rish", rishGroups);
        serverObject.createUser("xiao", xiaoGroups);
        serverObject.createUser("wayne", wayneGroups);
        serverObject.createTask("Computer Science", "Study", "CSE331", 3, "ansh");
        serverObject.createTask("Computer Science", "Study", "Research", 6, "ansh");
        Set<String> group = new HashSet<>();
        group.add("Computer Science");
        serverObject.addFriend("ansh","rish", group);
        serverObject.addFriend("rish","ansh", group);

        group = new HashSet<>();
        group.add("Badminton");
        serverObject.addFriend("ansh","xiao", group);

        group = new HashSet<>();
        group.add("Harem");
        group.add("UW");
        serverObject.addFriend("xiao","ansh", group);
        serverObject.addFriend("xiao","rish", group);
        serverObject.addFriend("xiao","wayne", group);

        group = new HashSet<>();
        group.add("Gym");
        group.add("Work");
        group.add("Meal prep");
        serverObject.addFriend("wayne","xiao", group);

        group = new HashSet<>();
        group.add("Gym");
        group.add("Work");
        serverObject.addFriend("wayne","ansh", group);
        serverObject.addFriend("wayne","rish", group);

        LocalDateTime now = LocalDateTime.now();

        serverObject.addFeed("ansh", 0);
        serverObject.addFeed("ansh", 1);

    }
//    LOAD GET request. Body of request: “username”
//    Body of response: {“timeline”: [list of tuples (“task name”, username, description)],
//    “tasks”: [list of tuples(“task id”, “task name”, “description”, “frequency”, “groupName”)],
//    “friends”: [list of tuples(“friend name”, “score”, “name of most recent task”)],
//    “notifications”: [ check-ins, etc]}

}
