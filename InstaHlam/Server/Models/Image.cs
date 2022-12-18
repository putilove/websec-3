namespace Server.Models
{
    public class Image
    {
        public long Id { get; set; }
        public long PostId { get; set; }
        public int SequenceNumber { get; set; }
        public string ImageUrl { get; set; }
        public Image(long id, long postId, int sequenceNumber, string imageUrl)
        {
            Id = id;
            PostId = postId;
            SequenceNumber = sequenceNumber;
            ImageUrl = imageUrl;
        }
    }
}
