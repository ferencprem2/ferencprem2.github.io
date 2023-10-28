package database

import (
	"main/src/models"

	"github.com/lonelymous/godab"
)

func AddSupport(support models.Support) (int64, error) {
	result, err := godab.Exec("INSERT INTO Support (Name, County, ZipCode, TownName, StreetName, HouseNumber, Email, PhoneNumber, CustomData) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", support.Name, support.County, support.ZipCode, support.TownName, support.StreetName, support.HouseNumber, support.Email, support.PhoneNumber, support.CustomData)
	if err != nil {
		return 0, err
	}

	// Return last id and error
	return result.LastInsertId()
}
