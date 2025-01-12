package utils

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

// Opens a connection to the database.
// Note: the user of this function is responsible for closing the connection.
func GetDatabaseConnection() (*sql.DB, error) {
	// 1) load the environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
		return nil, err
	}
	dbUrl := os.Getenv("DB_URL")

	// 2) establish a connection to the database
	db, err := sql.Open("postgres", dbUrl)

	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return db, nil
}
