package main

import (
	"log"
	"net/http"
	"wlf/endpoints"
)

func main() {
	http.HandleFunc("/form-updates", endpoints.FormUpdates)
	http.HandleFunc("/types", endpoints.GetAllFormTypes)
	http.HandleFunc("/state", endpoints.GetFormState)
	http.HandleFunc("/update-state", endpoints.UpdateState)
	log.Println("Server started on http://localhost:8080")
	log.Fatal(http.ListenAndServe("localhost:8080", nil))
}
