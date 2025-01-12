package endpoints

import (
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

func Echo(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}

	defer c.Close()
	c.WriteMessage(1, []byte("hello there. connection established."))

	go func() {
		for {
			_, message, err := c.ReadMessage()
			if err != nil {
				log.Println("read error:", err)
				break
			}
			log.Println("read:", string(message))
			if string(message) == "disconnect" {
				break
			}
		}
	}()

	for {
		time.Sleep(1 * time.Second)

		// generate a random number between 0 and 9
		rand := strconv.Itoa(rand.Intn(10))

		err = c.WriteMessage(1, []byte(rand))
		if err != nil {
			break
		}
	}
}
