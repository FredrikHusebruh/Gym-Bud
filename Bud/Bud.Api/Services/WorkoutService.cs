using Dapper;
using System.Data;

public class WorkoutService
{
    private readonly DbConnectionFactory _db;

    public WorkoutService(DbConnectionFactory db)
    {
        _db = db;
    }

    public async Task<WorkoutResponse> CreateWorkoutAsync(CreateWorkoutRequest req, Guid userId)
    {
        const string sql = """
            INSERT INTO workout_template (name, description, category_id, user_id, is_public)
            VALUES (@Name, @Description, @CategoryId, @UserId, false)
            RETURNING workout_id AS "WorkoutId", name AS "Name", description AS "Description", category_id AS "CategoryId"
            """;

        using var conn = _db.Create();
        conn.Open();
        return await conn.QuerySingleAsync<WorkoutResponse>(sql, new
        {
            req.Name,
            req.Description,
            req.CategoryId,
            UserId = userId
        });
    }

    public async Task<IEnumerable<CategoryResponse>> GetCategoriesAsync()
    {
        const string sql = "SELECT id, category FROM category ORDER BY category";
        using var conn = _db.Create();
        conn.Open();
        var result = await conn.QueryAsync<CategoryResponse>(sql);
        return result.ToList();
    }
}
