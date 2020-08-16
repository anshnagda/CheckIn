import java.util.*;
import java.time.LocalDateTime; // Import the LocalDateTime class
import java.time.format.DateTimeFormatter; // Import the DateTimeFormatter class
public class Feed {

    String userName;
    Task currentTask;
    String dateAndTime;

    public Feed(String userName, Task task, LocalDateTime myDateObj) {
        this.userName = userName;
        this.currentTask = task;
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        this.dateAndTime = myDateObj.format(myFormatObj);
    }

}
