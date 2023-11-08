USE tempdb;

CREATE TABLE YourTable (
	Id NVARCHAR(255),
    Column1 NVARCHAR(255),
    Column2 NVARCHAR(255)
);

INSERT INTO YourTable (Id, Column1, Column2) VALUES ('1', 'Value1', 'Value2');
INSERT INTO YourTable (Id, Column1, Column2) VALUES ('2', 'Value3', 'Value4');

