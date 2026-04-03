using Dapper;
using System.Data;

public class ExerciseService
{
    private readonly DbConnectionFactory _db;

    public ExerciseService(DbConnectionFactory db)
    {
        _db = db;
    }

    public async Task<ExerciseResponse?> CreateExerciseAsync(CreateExerciseRequest req, Guid userId)
    {
        const string sql = """
            INSERT INTO exercise (name, muscle_group_id, workout_template_id, user_id)
            SELECT @Name, @MuscleGroupId, @WorkoutId, @UserId
            FROM workout_template
            WHERE workout_id = @WorkoutId AND user_id = @UserId
            RETURNING exercise_id AS "ExerciseId", name AS "Name", workout_template_id AS "WorkoutId", muscle_group_id AS "MuscleGroupId"
            """;

        using var conn = _db.Create();
        conn.Open();
        return await conn.QuerySingleOrDefaultAsync<ExerciseResponse>(sql, new
        {
            req.Name,
            req.MuscleGroupId,
            req.WorkoutId,
            UserId = userId
        });
    }

    public async Task<IEnumerable<MuscleGroupResponse>> GetMuscleGroupsAsync()
    {
        const string sql = "SELECT id, muscle_group AS \"MuscleGroup\" FROM muscle_group ORDER BY muscle_group";
        using var conn = _db.Create();
        conn.Open();
        var result = await conn.QueryAsync<MuscleGroupResponse>(sql);
        return result.ToList();
    }
}
