using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace Server.DAL
{
    public class DbSettings
    {
        public static string ConnectionString 
        { 
            get
            {
                return new SqlConnectionStringBuilder
                {
                    DataSource = "",
                    IntegratedSecurity = false,
                    UserID = "sa",
                    Password = "111",
                    InitialCatalog = "InstaHlam",
                    TrustServerCertificate = true,
                    Encrypt = true
                }.ConnectionString;
            }
        }
    }
}
