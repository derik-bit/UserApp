using System.Threading.Tasks;
using UserApp.API.Helpers;
using UserApp.API.Models;

namespace UserApp.API.Data
{
    public interface IUserRepository
    {
         void Add<T>(T entity) where T: class;

         Task<bool> SaveAll();

         Task<PagedList<User>> GetUsers(UserParams userParams);
         Task<User> GetUser(int id);
    }
}