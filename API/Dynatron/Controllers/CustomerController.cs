using Dynatron.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Dynatron.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService CustomerService;

        public CustomerController(ICustomerService customerService)
        {
            CustomerService = customerService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> Get()
        {
            var result = await CustomerService.GetCustomers();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> Get(int id)
        {
            var result = await CustomerService.GetCustomerById(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Customer>> Post([FromBody] Customer value)
        {
            var result = await CustomerService.AddCustomer(value);
            return Ok(result);
        }

        [HttpPatch]
        public async Task<ActionResult<Customer>> Patch([FromBody] Customer value)
        {
            var result =  await CustomerService.UpdateCustomer(value);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await CustomerService.DeleteCustomerById(id);
            return Ok();
        }
    }
}
