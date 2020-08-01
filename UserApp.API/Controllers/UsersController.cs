using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using UserApp.API.Data;
using UserApp.API.Dtos;
using UserApp.API.Helpers;
using UserApp.API.Models;

namespace UserApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        private readonly ILogger<UsersController> _logger;
        public UsersController(IUserRepository repo, IMapper mapper, ILogger<UsersController> logger)
        {
            this._logger = logger;
            this._mapper = mapper;
            this._repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            try
            {
                var users = await _repo.GetUsers(userParams);

                var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

                Response.AddPagination(users.CurrentPage, users.PageSize,
                    users.TotalCount, users.TotalPages);

                return Ok(usersToReturn);
            }
            catch (Exception ex)
            {
                LogError();
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UserForCreationDto userForUpdateDto)
        {
            try
            {
                var userFromRepo = await _repo.GetUser(id);

                _mapper.Map(userForUpdateDto, userFromRepo);

                if (await _repo.SaveAll())
                    return NoContent();

                throw new Exception($"Updating user {id} failed on save");
            }
            catch (Exception ex)
            {
                LogError();
                return BadRequest(ex.Message);
            }

        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post(UserForCreationDto userForCreationDto)
        {
            try
            {
                var user = _mapper.Map<User>(userForCreationDto);

                _repo.Add(user);

                if (await _repo.SaveAll())
                    return Ok();

                throw new Exception("Creating the user failed on save");
            }
            catch (Exception ex)
            {
                LogError();
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var user = await _repo.GetUser(id);

                var userToReturn = _mapper.Map<UserForListDto>(user);

                return Ok(userToReturn);
            }
            catch (Exception ex)
            {
                LogError();
                return BadRequest(ex.Message);
            }
        }

        private void LogError()
        {
            var exceptionDetails = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
            _logger.LogError($"The path {exceptionDetails.Path} threw an exception " + 
                            $"{exceptionDetails.Error}");
        }
    }
}