package endpoints

import (
	"encoding/json"
	"log"
	"net/http"
	"wlf/models"
	"wlf/utils"
)

func UpdateState(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	// read request body
	var inputValue models.InputValue
	if err := json.NewDecoder(r.Body).Decode(&inputValue); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// establish db connection
	db, connErr := utils.GetDatabaseConnection()
	if connErr != nil {
		log.Fatal(connErr)
		return
	}
	defer db.Close()

	// update the row in db table "input_value"
	query :=
		`UPDATE input_value
		 SET text_value=$1, number_value=$2, bool_value=$3, select_value=$4
		 WHERE id=$5
		 RETURNING id, text_value, number_value, bool_value, select_value`

	var updatedRow models.InputValue
	queryErr := db.QueryRow(query, inputValue.Text_value, inputValue.Number_value, inputValue.Bool_value, inputValue.Select_value, inputValue.ID).Scan(&updatedRow.ID, &updatedRow.Text_value, &updatedRow.Number_value, &updatedRow.Bool_value, &updatedRow.Select_value)
	if queryErr != nil {
		log.Fatal(queryErr)
		return
	}

	// send a message to all connected ws clients
	utils.ConnectionPool.Lock()
	for _, conn := range utils.ConnectionPool.Connections {
		inputValueJson, err := json.Marshal(updatedRow)
		if err != nil {
			log.Fatal(err)
			break
		}

		err = conn.WriteMessage(1, inputValueJson)
		if err != nil {
			log.Fatal(err)
			break
		}
	}
	utils.ConnectionPool.Unlock()

	// write updated row as JSON response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(updatedRow); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
