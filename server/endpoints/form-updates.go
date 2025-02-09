package endpoints

import (
	"encoding/json"
	"log"
	"net/http"

	"wlf/models"
	"wlf/utils"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func FormUpdates(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	// initialize the ws connection
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	defer conn.Close()
	conn.WriteMessage(1, []byte("connection established!"))

	// store the ws connection
	utils.ConnectionPool.Lock()
	utils.ConnectionPool.Connections = append(utils.ConnectionPool.Connections, conn)
	utils.ConnectionPool.Unlock()

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("read error:", err)
		}
		log.Println("read:", string(message))

		// listen for disconnect message
		if string(message) == "disconnect" {
			break
		}

		// listen for form updates
		var newInput models.InputValue
		jsonErr := json.Unmarshal(message, &newInput)
		if jsonErr != nil {
			log.Println("json error:", jsonErr)
			break
		}

		// persist updates to db
		savedInputResponse, err := UpdateInputState(newInput)
		if err != nil {
			log.Println("db error:", err)
			break
		}
		savedInput, jsonErr := json.Marshal(savedInputResponse)
		if jsonErr != nil {
			log.Println("json error:", err)
			break
		}

		// notify all clients about the new update
		for _, connection := range utils.ConnectionPool.Connections {
			connection.WriteMessage(1, []byte(savedInput))
		}
	}

	// remove the connection from the pool once it closes
	utils.ConnectionPool.Lock()
	utils.ConnectionPool.Connections = utils.RemoveConnection(utils.ConnectionPool.Connections, conn)
	utils.ConnectionPool.Unlock()
}
