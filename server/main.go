package main

import (
	"log"
	"net/http"
	"wlf/endpoints"
)

func main() {
	http.HandleFunc("/echo", endpoints.Echo)
	http.HandleFunc("/types", endpoints.GetAllFormTypes)
	log.Fatal(http.ListenAndServe("localhost:8080", nil))
}
