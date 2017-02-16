/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webSockets;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author merguez
 */
@ServerEndpoint("/chat")
public class Chat {

    Session session;
    private static Set<Session> sessions = Collections.synchronizedSet(new HashSet<>());

    @OnMessage
    public String onMessage(String message) throws IOException {
        JSONParser parser = new JSONParser();
        String user = "";
        String type = "";
        String mess = "";
        try {
            Object obj = parser.parse(message);
            JSONObject jsonObject = (JSONObject) obj;
            user = (String) jsonObject.get("user");
            type = (String) jsonObject.get("type");
            mess = (String) jsonObject.get("message");
        } catch (ParseException ex) {
            Logger.getLogger(Chat.class.getName()).log(Level.SEVERE, null, ex);
        }
        synchronized (sessions) {
            for (Session client : sessions) {
                switch (type) {
                    case "connexion":
                        if (client != session) {
                            client.getBasicRemote().sendText(user + " vient de se connecter");
                        }
                        break;
                    case "discussion":
                        client.getBasicRemote().sendText(user + ": " + mess);
                        break;
                    case "deconnexion":
                        client.getBasicRemote().sendText(user + " vient de se déconnecter");
                }
            }
        }
        return null;
    }

    @OnOpen
    public void onOpen(Session session) throws IOException {
        this.session = session;
        if (sessions.isEmpty()) {
            session.getBasicRemote().sendText("Vous êtes le premier connecté");
        }
        sessions.add(session);
    }

    @OnError
    public void onError(Throwable t) {
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
    }

}
