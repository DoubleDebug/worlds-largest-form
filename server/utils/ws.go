package utils

import (
	"sync"

	"github.com/gorilla/websocket"
)

var ConnectionPool = struct {
	sync.Mutex
	Connections []*websocket.Conn
}{}

func RemoveConnection(conns []*websocket.Conn, conn *websocket.Conn) []*websocket.Conn {
	for i, c := range conns {
		if c == conn {
			return append(conns[:i], conns[i+1:]...)
		}
	}
	return conns
}
