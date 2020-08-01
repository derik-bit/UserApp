using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace UserApp.API.Models
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string SurName { get; set; }
        public string Gender { get; set; }

        public DateTime DateOfBirth { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }
    }
}