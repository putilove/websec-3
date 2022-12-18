namespace Server.Models
{
    public class Like
    {
        public long PostId { get; set; }
        public long UserId { get; set; }
        public Like(long postId, long userId)
        {
            PostId = postId;
            UserId = userId;
        }
    }
}
