using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace API.Entities
{
    public class Basket
    {
        public int Id{get;set;}
        public int MyProperty { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; }=new();
        public void Additem(Product product,int quantity){
            if(Items.All(item=>item.ProductId!=product.Id))
            {
                Items.Add(new BasketItem{Product=product,Quantity=quantity});
            }

            var existingItem=Items.FirstOrDefault(item=>item.ProductId==product.Id);
            if(existingItem!=null) existingItem.Quantity=existingItem.Quantity+quantity;
        }

        public void RemoveItem (int productid, int quantity ){
            var item=Items.FirstOrDefault(item=>item.ProductId==productid);
            if(item==null){
                return;
            }
            item.Quantity-=quantity;
            if(item.Quantity==0) Items.Remove(item);
        }

    }

   
}