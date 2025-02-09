package endpoints

import (
	"log"
	"wlf/models"
	"wlf/utils"
)

func UpdateInputState(value models.InputValue) (*models.InputValue, error) {
	// establish db connection
	db, connErr := utils.GetDatabaseConnection()
	if connErr != nil {
		log.Fatal(connErr)
		return nil, connErr
	}
	defer db.Close()

	// update the row in db table "input_value"
	query :=
		`UPDATE input_value
	 SET text_value=$1, number_value=$2, bool_value=$3, select_value=$4
	 WHERE id=$5
	 RETURNING id, text_value, number_value, bool_value, select_value`

	var updatedRow models.InputValue
	queryErr := db.QueryRow(query, value.Text_value, value.Number_value, value.Bool_value, value.Select_value, value.ID).Scan(&updatedRow.ID, &updatedRow.Text_value, &updatedRow.Number_value, &updatedRow.Bool_value, &updatedRow.Select_value)
	if queryErr != nil {
		log.Fatal(queryErr)
		return nil, queryErr
	}

	return &updatedRow, nil
}
