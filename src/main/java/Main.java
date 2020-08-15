import static spark.Spark.*;
public class Main {
    public static void main(String[] args) {
        CORSFilter corsFilter = new CORSFilter();
        corsFilter.apply();
        get("/hello", (req, res) -> "Hello World");


    }
}
