package main

import (
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

func echo(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}

	defer c.Close()
	c.WriteMessage(1, []byte("hello there. connection established."))

	for {
		time.Sleep(1 * time.Second)

		// generate a random number between 0 and 9
		rand := strconv.Itoa(rand.Intn(10))

		c.WriteMessage(1, []byte(rand))
	}
}

func main() {
	http.HandleFunc("/echo", echo)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
