using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dynatron.Interfaces
{
    public interface ICustomerService
    {
        Task<List<Customer>> GetCustomers();
        Task<Customer> GetCustomerById(int id);
        Task<Customer> GetCustomerByName(string name);
        Task<Customer> AddCustomer(Customer customer);
        Task<Customer> UpdateCustomer(Customer customer);
        Task DeleteCustomerById(int id);
    }
}
