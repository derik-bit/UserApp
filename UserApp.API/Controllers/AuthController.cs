using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UserApp.API.Dtos;
using UserApp.API.Models;

namespace UserApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly SignInManager<User> _signinManager;
        private readonly UserManager<User> _userManager;

        public AuthController(IMapper mapper, UserManager<User> userManager, SignInManager<User> signinManager)
        {
            _signinManager = signinManager;
            this._mapper = mapper;
            this._userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            try 
            {
                var user = await _userManager.FindByNameAsync(userForLoginDto.Username);

                var result = await _signinManager.CheckPasswordSignInAsync(user, 
                userForLoginDto.Password, false);

                if (result.Succeeded)
                {
                    var appUser = _mapper.Map<UserForListDto>(user);

                    return Ok(new
                    {
                        user = appUser
                    });
                }    
                
                return Unauthorized();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}