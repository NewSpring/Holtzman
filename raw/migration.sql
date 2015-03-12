DECLARE @categoryGuid uniqueidentifier = '65CCE790-BE3D-4C52-AB4C-0BA8FFEE630E';

/* Create the workflow category */
INSERT INTO [dbo].[Category] (
   [IsSystem]
  ,[ParentCategoryId]
  ,[EntityTypeId]
  ,[EntityTypeQualifierColumn]
  ,[EntityTypeQualifierValue]
  ,[Name]
  ,[IconCssClass]
  ,[Guid]
  ,[Order]
  ,[Description]
  ,[HighlightColor]
) VALUES (
   0
  ,NULL
  ,32
  ,''
  ,''
  ,'Apollos API Sync Category'
  ,'fa fa-connectdevelop'
  ,@categoryGuid
  ,0
  ,NULL
  ,''
);
