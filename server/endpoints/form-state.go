package endpoints

import (
	"log"
	"net/http"
	"wlf/utils"
)

func GetFormState(w http.ResponseWriter, _ *http.Request) {
	db, err := utils.GetDatabaseConnection()
	if err != nil {
		log.Fatal(err)
		return
	}
	defer db.Close()

	// 1) fetch all inputs and their values from the database
	rows, err := db.Query("SELECT * FROM input JOIN input_value ON input.id = input_value.id")
	if err != nil {
		log.Fatal(err)
		return
	}

	// 2) convert the db response to JSON
	json, err := utils.RowsToJsonString(rows)
	if err != nil {
		log.Fatal(err)
		return
	}

	// 3) write the JSON to the response
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(json))
}
