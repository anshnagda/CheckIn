import static spark.Spark.*;
public class Main {
    public static void main(String[] args) {
        CORSFilter corsFilter = new CORSFilter();
        corsFilter.apply();

        Server serverObject = new Server();

        get("/hello", (req, res) -> "Hello World");

    }
}
