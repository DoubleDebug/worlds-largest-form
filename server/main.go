package main

import (
	"log"
	"net/http"
	"wlf/endpoints"
)

func main() {
	http.HandleFunc("/form-updates", endpoints.FormUpdates)
	http.HandleFunc("/types", endpoints.GetAllFormTypes)
	http.HandleFunc("/form-state", endpoints.GetFormState)
	http.HandleFunc("/select-options", endpoints.GetSelectOptions)
	log.Println("Server started on http://localhost:8080")
	log.Fatal(http.ListenAndServe("localhost:8080", nil))
}
