using Dynatron.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dynatron.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly CustomerContext Context;

        public CustomerService(CustomerContext customerContext)
        {
            Context = customerContext;
        }

        public async Task<List<Customer>> GetCustomers()
        {
            var customers = await Context.Customers.ToListAsync();
            return customers;
        }

        public async Task<Customer> GetCustomerById(int id)
        {
            var customer = await Context.Customers.FirstOrDefaultAsync(x => x.Id == id);
            return customer;
        }

        public async Task<Customer> GetCustomerByName(string name)
        {
            name = name.Trim().ToLower();
            var customer = await Context.Customers.FirstOrDefaultAsync(x => x.FirstName.ToLower().Contains(name) || x.LastName.ToLower().Contains(name) || x.MiddleName.ToLower().Contains(name));
            return customer;
        }

        public async Task<Customer> AddCustomer(Customer customer)
        {
            await Context.Customers.AddAsync(customer);
            await Context.SaveChangesAsync();
            return customer;
        }

        public async Task<Customer> UpdateCustomer(Customer customer)
        {
            var cust = await Context.Customers.FirstOrDefaultAsync(x => x.Id == customer.Id);

            if (cust != null)
            {
                cust.FirstName = customer.FirstName;
                cust.LastName = customer.LastName;
                cust.MiddleName = customer.MiddleName;
                cust.Email = customer.Email;
                cust.LastUpdatedDate = DateTime.UtcNow;

                Context.Customers.Update(cust);
                await Context.SaveChangesAsync();
            }
            
            return cust;
        }

        public async Task DeleteCustomerById(int id)
        {
            var customer = await Context.Customers.FirstOrDefaultAsync(x => x.Id == id);
            Context.Customers.Remove(customer);
            await Context.SaveChangesAsync();
        }
    }
}
