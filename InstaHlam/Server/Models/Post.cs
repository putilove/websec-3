namespace Server.Models
{
    public class Post
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public long UserId { get; set; }
        public int LikesCount { get; set; }
        public Post(long id, string description, DateTime createdDate, long userId, int likesCount)
        {
            Id = id;
            Description = description;
            CreatedDate = createdDate;
            UserId = userId;
            LikesCount = likesCount;
        }
    }
}
