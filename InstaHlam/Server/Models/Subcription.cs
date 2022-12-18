namespace Server.Models
{
    public class Subcription
    {
        public long UserId { get; set; }
        public long OtherUsersId { get; set; }
        public Subcription(long userId, long otherUsersId)
        {
            UserId = userId;
            OtherUsersId = otherUsersId;
        }
    }
}
