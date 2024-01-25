using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController:BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context){
            _context=context;
        }
        [HttpGet]
        public async Task<ActionResult<Basket>>GetBasket()
        {
            var basket=await _context.Baskets
                      .Include(i=>i.Items)
                      .ThenInclude(p=>p.Product)
                      .FirstOrDefaultAsync(x=>x.BuyerId==Request.Cookies["buyerId"]);

            if(basket==null){
                return NotFound();
            }
            return basket;
        }

        [HttpPost]
        public async Task<ActionResult> AddItemtoBasket(int productId,int quantity){
            
            var basket=await RetrieveBasket();
            if(basket==null) basket= CreateBasket();
            var product=await _context.Products.FindAsync(productId);
            if(product==null) return NotFound();

            basket.Additem(product,quantity);

            var result=await _context.SaveChangesAsync()>0;
            if(result) return StatusCode(201);
            return BadRequest(new ProblemDetails{Title="problem saving item to basket"});
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieoptions=new CookieOptions{IsEssential =true,Expires=DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId",buyerId,cookieoptions);
            var basket=new Basket{BuyerId=buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId,int Quantity){
            return Ok();
        }

         private async Task<Basket>RetrieveBasket(){
           return await _context.Baskets
                      .Include(i=>i.Items)
                      .ThenInclude(p=>p.Product)
                      .FirstOrDefaultAsync(x=>x.BuyerId==Request.Cookies["buyerId"]);
        }

        
    }
}