CREATE TABLE MeasurementData(
    PersonId INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),  -- Changed from INT to VARCHAR
    County VARCHAR(40),
    ZipCode VARCHAR(20),  -- Changed from INT to VARCHAR
    TownName VARCHAR(100),
    StreetName VARCHAR(100),
    HouseNumber VARCHAR(15),
    Email VARCHAR(100),   -- Increased the length
    PhoneNumber VARCHAR(15),
    MeasurementDate DATETIME,
    TarpTypes Varchar(20),
    PRIMARY KEY(PersonId)
)

CREATE TABLE Support(
    PersonId int NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),  -- Changed from INT to VARCHAR
    County VARCHAR(40),
    ZipCode VARCHAR(20),  -- Changed from INT to VARCHAR
    TownName Varchar(100),
    StreetName Varchar(100),
    HouseNumber Varchar(15),
    Email VARCHAR(100),   -- Increased the length
    PhoneNumber Varchar (15),
    CustomData Varchar(200),
    PRIMARY KEY(PersonId)
)
