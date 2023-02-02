CREATE DATABASE [Dynatron];

USE [Dynatron];

CREATE TABLE [dbo].[Customer] (
  [Id] INT IDENTITY (1, 1) PRIMARY KEY,
  [FirstName] VARCHAR(50) NOT NULL,
  [MiddleName] VARCHAR(50) NULL,
  [LastName] VARCHAR(50) NOT NULL,
  [Email] VARCHAR(100) NOT NULL,
  [CreatedDate] DATETIME NOT NULL DEFAULT GETDATE(),
  [LastUpdatedDate] DATETIME NULL,
);

--DECLARE @counter INT = 1;

--WHILE (@counter <= 100)
--BEGIN
--  INSERT INTO [dbo].[Customer] ([FirstName], [LastName], [Email])
--  VALUES ('John' + CAST(@counter AS VARCHAR), 'Doe' + CAST(@counter AS VARCHAR), 'email' + CAST(@counter AS VARCHAR) + '@example.com');

--  SET @counter = @counter + 1;
--END;

-----------------------------------------------------------------------------------------

TRUNCATE TABLE [dbo].[Customer]

DECLARE @counter INT = 1;
DECLARE @firstNames TABLE (FirstName VARCHAR(50));
DECLARE @lastNames TABLE (LastName VARCHAR(50));

INSERT INTO @firstNames (FirstName)
VALUES ('Emma'), ('Olivia'), ('Ava'), ('Isabella'), ('Sophia'), ('Mia'), ('Charlotte'), ('Amelia'), ('Harper'), ('Evelyn'),
       ('Abigail'), ('Emily'), ('Elizabeth'), ('Avery'), ('Sofia'), ('Ella'), ('Madison'), ('Scarlett'), ('Victoria'), ('Aria'),
       ('Grace'), ('Chloe'), ('Camila'), ('Penelope'), ('Riley'), ('Luna'), ('Natalie'), ('Hazel'), ('Violet'), ('Aurora'),
       ('Savannah'), ('Audrey'), ('Brooklyn'), ('Bella'), ('Claire'), ('Skylar'), ('Lucy'), ('Paisley'), ('Everly'), ('Annabelle'),
       ('Nora'), ('Ellie'), ('Aaliyah'), ('Hannah'), ('Lillian'), ('Addison'), ('Aubrey'), ('Eleanor');

INSERT INTO @lastNames (LastName)
VALUES ('Smith'), ('Johnson'), ('Williams'), ('Jones'), ('Brown'), ('Davis'), ('Miller'), ('Wilson'), ('Moore'), ('Taylor'),
       ('Anderson'), ('Thomas'), ('Jackson'), ('White'), ('Harris'), ('Martin'), ('Thompson'), ('Young'), ('Allen'), ('King'),
       ('Wright'), ('Scott'), ('Green'), ('Baker'), ('Adams'), ('Nelson'), ('Carter'), ('Mitchell'), ('Perez'), ('Roberts'),
       ('Turner'), ('Phillips'), ('Campbell'), ('Parker'), ('Evans'), ('Edwards'), ('Stewart'), ('Flores'), ('Morris'), ('Nguyen'),
       ('Murphy'), ('Rivera'), ('Cook'), ('Rogers'), ('Morgan'), ('Peterson'), ('Cooper'), ('Reed');

WHILE (@counter <= 100)
BEGIN
  DECLARE @firstName VARCHAR(50) = (SELECT FirstName FROM @firstNames ORDER BY NEWID() OFFSET 0 ROWS FETCH NEXT 1 ROW ONLY);
  DECLARE @lastName VARCHAR(50) = (SELECT LastName FROM @lastNames ORDER BY NEWID() OFFSET 0 ROWS FETCH NEXT 1 ROW ONLY);

  INSERT INTO [dbo].[Customer] ([FirstName], [LastName], [Email])
  VALUES (@firstName, @lastName, LOWER(LEFT(@firstName, 1) + @lastName + CAST(@counter AS VARCHAR) + '@example.com'));

  SET @counter = @counter + 1;
END;

SELECT * FROM [dbo].[Customer]