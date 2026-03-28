
public class NewUserService
{
    public List<NewUser> GetAll()
    {
        // later this talks to a database
        return new List<NewUser>
        {
            new NewUser { Id = 1, Email = "fredericohusebo@gmail.com", IsActive = true }
        };
    }
}