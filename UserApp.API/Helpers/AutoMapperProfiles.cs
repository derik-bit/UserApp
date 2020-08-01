using AutoMapper;
using UserApp.API.Dtos;
using UserApp.API.Models;

namespace UserApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>();
            CreateMap<UserForLoginDto, User>();
            CreateMap<UserForCreationDto, User>();
        }
    }
}