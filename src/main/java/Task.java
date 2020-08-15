public class Task {
    int taskID;
    String taskName;
    String description;

    int freqPerWeek;
    String groupName;

    public Task(int taskID, String taskName, String description, int freqPerWeek, String groupName) {
        this.taskID = taskID;
        this.groupName = groupName;
        this.taskName = taskName;
        this.description = description;
        this.freqPerWeek = freqPerWeek;

    }
}
