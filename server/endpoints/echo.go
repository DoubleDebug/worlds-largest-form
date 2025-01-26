package endpoints

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type InputValue struct {
	ID           int     `json:"id"`
	Text_value   *string `json:"text_value"`
	Number_value *int    `json:"number_value"`
	Bool_value   *bool   `json:"bool_value"`
	Select_value *int    `json:"select_value"`
}

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

		// generate a random number between 0 and 99
		randNum := rand.Intn(100)
		randInputValue := InputValue{
			ID:           1,
			Text_value:   nil,
			Number_value: &randNum,
			Bool_value:   nil,
			Select_value: nil,
		}
		inputValueJson, err := json.Marshal(randInputValue)
		if err != nil {
			break
		}

		err = c.WriteMessage(1, inputValueJson)
		if err != nil {
			break
		}
	}
}
