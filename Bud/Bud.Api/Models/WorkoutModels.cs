public class CreateWorkoutRequest
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int CategoryId { get; set; }
}

public class CreateExerciseRequest
{
    public string Name { get; set; } = string.Empty;
    public int MuscleGroupId { get; set; }
    public long WorkoutId { get; set; }
}

public class WorkoutResponse
{
    public long WorkoutId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int CategoryId { get; set; }
}

public class ExerciseResponse
{
    public long ExerciseId { get; set; }
    public string ExerciseName { get; set; } = string.Empty;
    public long ExerciseWorkoutId { get; set; }
    public int MuscleGroupId { get; set; }
    public string MuscleGroupName { get; set; } = string.Empty;
}

public class WorkoutWithExercisesResponse
{
    public long WorkoutId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public List<ExerciseResponse> Exercises { get; set; } = [];
}

public class StartWorkoutRequest
{
    public long TemplateId { get; set; }
}

public class StartWorkoutResponse
{
    public long WorkoutId { get; set; }
}

public class LogSetRequest
{
    public long WorkoutId { get; set; }
    public long ExerciseId { get; set; }
    public short Weight { get; set; }
    public short Reps { get; set; }
}

public class SetResponse
{
    public long SetId { get; set; }
    public short Weight { get; set; }
    public short Reps { get; set; }
    public long ExerciseId { get; set; }
}

public class LastWorkoutSetsResponse
{
    public long ExerciseId { get; set; }
    public List<SetResponse> Sets { get; set; } = [];
}

public class CategoryResponse
{
    public int Id { get; set; }
    public string Category { get; set; } = string.Empty;
}

public class MuscleGroupResponse
{
    public int Id { get; set; }
    public string MuscleGroup { get; set; } = string.Empty;
}
