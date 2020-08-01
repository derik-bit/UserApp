using UserApp.API.Data;
using Microsoft.EntityFrameworkCore;

namespace UserAppAPITest
{
    public class InMemoryDbContextFactory
    {
        public DataContext GetUserAppDbContext()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                            .UseInMemoryDatabase(databaseName: "InMemoryUserAppDatabase")
                            .Options;
            var dbContext = new DataContext(options);

            return dbContext;
        }
    }
}