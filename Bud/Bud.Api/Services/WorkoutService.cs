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
        await conn.OpenAsync();
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
                e.exercise_id AS "ExerciseId", e.name AS "ExerciseName", e.workout_template_id AS "ExerciseWorkoutId", e.muscle_group_id AS "MuscleGroupId", mg.muscle_group AS "MuscleGroupName"
            FROM workout_template wt
            LEFT JOIN category c ON c.id = wt.category_id
            LEFT JOIN exercise e ON e.workout_template_id = wt.workout_id
            LEFT JOIN muscle_group mg ON mg.id = e.muscle_group_id
            WHERE wt.user_id = @UserId
            ORDER BY wt.workout_id
            """;

        using var conn = _db.Create();
        await conn.OpenAsync();

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

    public async Task<StartWorkoutResponse> StartWorkoutAsync(long templateId, Guid userId)
    {
        const string sql = """
            INSERT INTO workout ("Scheduled_at", template_id, user_id)
            VALUES (NOW(), @TemplateId, @UserId)
            RETURNING workout_id AS "WorkoutId"
            """;

        using var conn = _db.Create();
        await conn.OpenAsync();
        return await conn.QuerySingleAsync<StartWorkoutResponse>(sql, new { TemplateId = templateId, UserId = userId });
    }

    public async Task<SetResponse> LogSetAsync(LogSetRequest req, Guid userId)
    {
        const string sql = """
            INSERT INTO set (weight, reps, exercise_id, workout_id)
            SELECT @Weight, @Reps, @ExerciseId, @WorkoutId
            FROM exercise e
            JOIN workout_template wt ON wt.workout_id = e.workout_template_id
            WHERE e.exercise_id = @ExerciseId AND wt.user_id = @UserId
            RETURNING set_id AS "SetId", weight AS "Weight", reps AS "Reps", exercise_id AS "ExerciseId"
            """;

        using var conn = _db.Create();
        await conn.OpenAsync();
        return await conn.QuerySingleAsync<SetResponse>(sql, new
        {
            req.Weight,
            req.Reps,
            req.ExerciseId,
            req.WorkoutId,
            UserId = userId
        });
    }

    public async Task<IEnumerable<LastWorkoutSetsResponse>> GetLastWorkoutSetsAsync(long templateId, Guid userId, long excludeWorkoutId)
    {
        const string sql = """
            SELECT e.exercise_id AS "ExerciseId", s.set_id AS "SetId", s.weight AS "Weight", s.reps AS "Reps"
            FROM workout w
            JOIN exercise e ON e.workout_template_id = w.template_id
            LEFT JOIN set s ON s.exercise_id = e.exercise_id AND s.workout_id = w.workout_id
            WHERE w.template_id = @TemplateId
              AND w.user_id = @UserId
              AND w.workout_id = (
                SELECT workout_id FROM workout
                WHERE template_id = @TemplateId AND user_id = @UserId AND workout_id != @ExcludeWorkoutId
                ORDER BY "Scheduled_at" DESC LIMIT 1
              )
            ORDER BY e.exercise_id, s.set_id
            """;

        using var conn = _db.Create();
        await conn.OpenAsync();

        var exerciseDict = new Dictionary<long, LastWorkoutSetsResponse>();
        await conn.QueryAsync<LastWorkoutSetsResponse, SetResponse, LastWorkoutSetsResponse>(
            sql,
            (exercise, set) =>
            {
                if (!exerciseDict.TryGetValue(exercise.ExerciseId, out var existing))
                {
                    existing = exercise;
                    exerciseDict[exercise.ExerciseId] = existing;
                }
                if (set != null)
                    existing.Sets.Add(set);
                return existing;
            },
            new { TemplateId = templateId, UserId = userId, ExcludeWorkoutId = excludeWorkoutId },
            splitOn: "SetId"
        );

        return exerciseDict.Values;
    }

    public async Task<IEnumerable<CategoryResponse>> GetCategoriesAsync()
    {
        const string sql = "SELECT id, category FROM category ORDER BY category";
        using var conn = _db.Create();
        await conn.OpenAsync();
        var result = await conn.QueryAsync<CategoryResponse>(sql);
        return result.ToList();
    }
}
