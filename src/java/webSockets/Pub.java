/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webSockets;

import java.io.IOException;
import javax.websocket.OnMessage;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author merguez
 */
@ServerEndpoint("/pub")
public class Pub {

    @OnMessage
    public String onMessage(String message) throws IOException {
        return message;
    }
    
}
