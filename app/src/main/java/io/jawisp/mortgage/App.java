package io.jawisp.mortgage;

import java.util.Map;

import io.jawisp.Jawisp;
import io.jawisp.http.Context;
import io.jawisp.utils.Env;

public class App {

    static void indexPage(Context ctx) {
        Map<String, Object> model = Map.of(
                "title", "Hypothekenrechner",
                "isDev", Env.getBool("DEV_MODE", false));
        ctx.render("index.html", model);
    }

    public static void main(String[] args) {
        Jawisp.build(config -> config
                .port(Env.getInt("SERVER_PORT", 8082))
                .staticResources("/static")
                .templateEngine("pebble")
                .routes(route -> route.get("/", App::indexPage)))
                .start();
    }
}
