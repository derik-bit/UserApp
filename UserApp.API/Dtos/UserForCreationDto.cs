using System;

namespace UserApp.API.Dtos
{
    public class UserForCreationDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; }
        public string SurName { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
        public DateTime DateOfBirth {get; set;}
    }
}