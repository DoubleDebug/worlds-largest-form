package endpoints

import (
	"log"
	"net/http"

	"wlf/utils"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func FormUpdates(w http.ResponseWriter, r *http.Request) {
	// initialize the ws connection
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}

	defer conn.Close()
	conn.WriteMessage(1, []byte("connection established!"))

	// store the ws connection
	utils.ConnectionPool.Lock()
	utils.ConnectionPool.Connections = append(utils.ConnectionPool.Connections, conn)
	utils.ConnectionPool.Unlock()

	// listen for disconnect message
	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("read error:", err)
			break
		}
		log.Println("read:", string(message))
		if string(message) == "disconnect" {
			break
		}
	}

	// remove the connection from the pool once it closes
	utils.ConnectionPool.Lock()
	utils.ConnectionPool.Connections = utils.RemoveConnection(utils.ConnectionPool.Connections, conn)
	utils.ConnectionPool.Unlock()
}
