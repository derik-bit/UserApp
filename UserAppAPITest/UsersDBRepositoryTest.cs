using UserApp.API.Data;
using UserApp.API.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserApp.API.Helpers;

namespace UserAppAPITest
{
    [TestClass]
    public class UsersDBRepositoryTest
    {
        private readonly DataContext _dbContext;
        private readonly IUserRepository _userRepository;
        public UsersDBRepositoryTest()
        {
            _dbContext = new InMemoryDbContextFactory().GetUserAppDbContext();
            _userRepository = new UserRepository(_dbContext);
        }

        [TestMethod]
        public async Task GetUsers_Should_Return_Correct_Count()
        {
            // Arrange
            var users = new List<User>
            {
                new User { Id = 1, FirstName="Lola" },
                new User { Id = 2, FirstName="Dorothy" },
                new User { Id = 3, FirstName="Reba"  },
                new User { Id = 4, FirstName="John"  }
            };
            _dbContext.Users.AddRange(users);
            _dbContext.SaveChanges();

            var userParams = new UserParams {};

            // Act
            var actual = await _userRepository.GetUsers(userParams);

            // Assert
            Assert.AreEqual(actual.Count, 4);
        }
    }
}