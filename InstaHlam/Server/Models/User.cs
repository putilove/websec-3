namespace Server.Models
{
    public class User
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public int RegistrationType { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public User(long id, string userName, int registrationType, string email, string passwordHash)
        {
            Id = id;
            UserName = userName;
            RegistrationType = registrationType;
            Email = email;
            PasswordHash = passwordHash;
        }
    }
}
