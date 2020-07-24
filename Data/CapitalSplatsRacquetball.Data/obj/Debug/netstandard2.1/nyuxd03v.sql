IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [Players] (
    [Id] int NOT NULL IDENTITY,
    [FirstName] nvarchar(max) NULL,
    [LastName] nvarchar(max) NULL,
    [Level] int NOT NULL,
    [Address] nvarchar(max) NULL,
    CONSTRAINT [PK_Players] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [Games] (
    [Id] int NOT NULL IDENTITY,
    [Date] datetime2 NOT NULL,
    [Player1Id] int NULL,
    [Player2Id] int NULL,
    [MatchesPlayed] int NOT NULL,
    [Location] nvarchar(max) NULL,
    CONSTRAINT [PK_Games] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Games_Players_Player1Id] FOREIGN KEY ([Player1Id]) REFERENCES [Players] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Games_Players_Player2Id] FOREIGN KEY ([Player2Id]) REFERENCES [Players] ([Id]) ON DELETE NO ACTION
);

GO

CREATE TABLE [Score] (
    [Id] int NOT NULL IDENTITY,
    [Score1] int NOT NULL,
    [Score2] int NOT NULL,
    [GameId] int NULL,
    CONSTRAINT [PK_Score] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Score_Games_GameId] FOREIGN KEY ([GameId]) REFERENCES [Games] ([Id]) ON DELETE NO ACTION
);

GO

CREATE INDEX [IX_Games_Player1Id] ON [Games] ([Player1Id]);

GO

CREATE INDEX [IX_Games_Player2Id] ON [Games] ([Player2Id]);

GO

CREATE INDEX [IX_Score_GameId] ON [Score] ([GameId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200617124013_init', N'3.1.5');

GO

