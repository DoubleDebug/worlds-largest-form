package endpoints

import (
	"log"
	"net/http"
	"wlf/utils"
)

func GetSelectOptions(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")

	db, err := utils.GetDatabaseConnection()
	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer db.Close()

	// 1) fetch all select options
	rows, err := db.Query("SELECT * FROM select_option")
	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// 2) convert the db response to JSON
	rowsAsJson, err := utils.RowsToJsonString(rows)
	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// 3) write the JSON to the response
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(rowsAsJson))
}
