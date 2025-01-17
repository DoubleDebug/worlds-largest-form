package main

import (
	"log"
	"net/http"
	"wlf/endpoints"
)

func main() {
	http.HandleFunc("/echo", endpoints.Echo)
	http.HandleFunc("/types", endpoints.GetAllFormTypes)
	http.HandleFunc("/state", endpoints.GetFormState)
	log.Println("Server started on http://localhost:8080")
	log.Fatal(http.ListenAndServe("localhost:8080", nil))
}
