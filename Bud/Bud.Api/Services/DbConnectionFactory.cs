using Npgsql;
using System.Data;

public class DbConnectionFactory
{
    private readonly string _connectionString;

    public DbConnectionFactory(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection")!;
    }

    public IDbConnection Create() => new NpgsqlConnection(_connectionString);
}
