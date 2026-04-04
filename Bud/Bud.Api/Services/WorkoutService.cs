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

    public async Task<IEnumerable<WorkoutWithExercisesResponse>> GetWorkoutsAsync(Guid userId)
    {
        const string sql = """
            SELECT
                wt.workout_id AS "WorkoutId", wt.name AS "Name", wt.description AS "Description", wt.category_id AS "CategoryId", c.category AS "CategoryName",
                e.exercise_id AS "ExerciseId", e.name AS "ExerciseName", e.workout_template_id AS "ExerciseWorkoutId", e.muscle_group_id AS "MuscleGroupId"
            FROM workout_template wt
            LEFT JOIN category c ON c.id = wt.category_id
            LEFT JOIN exercise e ON e.workout_template_id = wt.workout_id
            WHERE wt.user_id = @UserId
            ORDER BY wt.workout_id
            """;

        using var conn = _db.Create();
        conn.Open();

        var workoutDict = new Dictionary<long, WorkoutWithExercisesResponse>();
        await conn.QueryAsync<WorkoutWithExercisesResponse, ExerciseResponse, WorkoutWithExercisesResponse>(
            sql,
            (workout, exercise) =>
            {
                if (!workoutDict.TryGetValue(workout.WorkoutId, out var existing))
                {
                    existing = workout;
                    workoutDict[workout.WorkoutId] = existing;
                }
                if (exercise != null)
                    existing.Exercises.Add(exercise);
                return existing;
            },
            new { UserId = userId },
            splitOn: "ExerciseId"
        );

        return workoutDict.Values;
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
