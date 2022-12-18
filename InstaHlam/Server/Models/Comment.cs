namespace Server.Models
{
    public class Comment
    {
        public long Id { get; set; }
        public long PostId { get; set; }
        public string Text { get; set; }
        public long UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public Comment(long id, long postId, string text, long userId, DateTime createdDate)
        {
            Id = id;
            PostId = postId;
            Text = text;
            UserId = userId;
            CreatedDate = createdDate;
        }
    }
}
